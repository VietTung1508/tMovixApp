import { useParams, Link, useNavigate } from "react-router-dom";
import "./tvWatch.scss";
import { useEffect, useState } from "react";
import tmdbApi from "../../../../api/tmdbApi";
import WatchSidebar from "../../../../components/watchSidebar/WatchSidebar";
import apiConfig from "../../../../api/apiConfig";
import { Swiper, SwiperSlide } from "swiper/react";

function TvWatch() {
  const { category, id, season, ep } = useParams();
  const [movie, setMovie] = useState(null);
  const [eps, setEps] = useState(null);
  const navigate = useNavigate();

  console.log(movie);

  useEffect(() => {
    const getDetailMovie = async () => {
      const res = await tmdbApi.detail(category, id, { params: {} });
      setMovie(res);
    };

    const getEpisodes = async () => {
      const res = await tmdbApi.getEpisodes(id, season, ep);
      setEps(res.episodes);
    };

    getEpisodes();
    getDetailMovie();
  }, [category, id]);

  useEffect(() => {
    const getEpisodes = async () => {
      const res = await tmdbApi.getEpisodes(id, season, ep);
      setEps(res.episodes);
    };

    getEpisodes();
  }, [category, id, season]);

  return (
    <>
      <div className="tvWatch section">
        <h2 className="head-title">
          <Link to="/">The Movix</Link> / <Link to="/tv">Tv Series</Link> /
          {movie ? <Link to={`/tv/${movie.id}`}> {movie.name}</Link> : ""}
        </h2>
        <div className="tvWatch__mainContent ">
          <div className="screen">
            <iframe
              id="iframe"
              title="iframe"
              src={`https://www.2embed.to/embed/tmdb/tv?id=${
                movie && movie.id
              }&s=${season}&e=${ep}`}
              allowFullScreen
            ></iframe>
            <select
              className="season"
              onChange={(e) => {
                navigate(`/tv/${movie.id}/watch&season=${e.target.value}&ep=1`);
              }}
            >
              {movie &&
                movie.seasons.map((el, i) => (
                  <option key={i} value={`${el.season_number}`}>
                    Season {el.season_number}
                  </option>
                ))}
            </select>
            <Swiper grabCursor={true} spaceBetween={15} slidesPerView={5}>
              {eps &&
                eps.map((el, i) => (
                  <SwiperSlide key={i}>
                    <div
                      className="episode-box"
                      key={i}
                      onClick={() => {
                        navigate(
                          `/tv/${movie.id}/watch&season=${season}&ep=${el.episode_number}`
                        );
                      }}
                    >
                      <img
                        alt=""
                        className="episode-img"
                        src={`${apiConfig.originalImage(el.still_path)}`}
                      ></img>
                      <div className="episode-detail">
                        <span className="ep-number">Episode</span>{" "}
                        {el.episode_number} :{" "}
                        <span className="ep-name">{el.name}</span>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
            <div className="episodes"></div>
          </div>
          <div className="sideBar">
            <WatchSidebar />
          </div>
        </div>
      </div>
    </>
  );
}

export default TvWatch;
