import { useParams, Link, useNavigate } from "react-router-dom";
import "./tvWatch.scss";
import { useEffect, useState } from "react";
import tmdbApi from "../../../../api/tmdbApi";
import WatchSidebar from "../../../../components/watchSidebar/WatchSidebar";
import apiConfig from "../../../../api/apiConfig";
import { Swiper, SwiperSlide } from "swiper/react";
import StarIcon from "@mui/icons-material/Star";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

function TvWatch() {
  const { category, id, season, ep } = useParams();
  const [movie, setMovie] = useState(null);
  const [eps, setEps] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getDetailMovie = async () => {
      const res = await tmdbApi.detail(category, id, { params: {} });
      setMovie(res);
    };

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
          <div className="main">
            <iframe
              id="iframe"
              title="iframe"
              src={`https://www.2embed.to/embed/tmdb/tv?id=${
                movie && movie.id
              }&s=${season}&e=${ep}`}
              allowFullScreen
            ></iframe>
            {movie && (
              <div className="detail-movie">
                <div
                  className="detail-movie__img"
                  style={{
                    backgroundImage: `url(${apiConfig.w500Image(
                      movie.poster_path
                    )})`,
                  }}
                />
                <div className="detail-movie__info">
                  <h2 className="detail-title">{movie.name || movie.title}</h2>
                  <div className="detail-genres">
                    {movie.genres.slice(0, 3).map((el, i) => (
                      <p key={i}>{el.name}</p>
                    ))}
                  </div>
                  <p className="detail-overview">{movie.overview}</p>
                  <p className="detail-voteadate">
                    <span style={{ color: "#b5e745" }}>
                      {movie.vote_average.toFixed(1)}
                      <StarIcon fontSize="medium" />
                    </span>
                    <span>
                      {movie.first_air_date.slice(0, 4)}
                      <CalendarTodayIcon fontSize="small" />
                    </span>
                  </p>
                  <p className="detail-eps">
                    {`Season ${season} : ${eps && eps.length} / ${
                      movie.seasons[season - 1].episode_count || ""
                    }`}
                  </p>
                </div>
              </div>
            )}
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
                      <div className="img-wrapper">
                        <img
                          alt=""
                          className="episode-img"
                          src={`${apiConfig.originalImage(el.still_path)}`}
                        ></img>
                      </div>
                      <div className="episode-detail">
                        <span className="ep-number">Episode</span>{" "}
                        {el.episode_number} :{" "}
                        <span className="ep-name">{el.name}</span>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
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
