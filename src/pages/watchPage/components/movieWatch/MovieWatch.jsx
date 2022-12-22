import { useParams, useNavigate, Link } from "react-router-dom";
import "./movieWatch.scss";
import { useEffect, useState } from "react";
import tmdbApi from "../../../../api/tmdbApi";
import apiConfig from "../../../../api/apiConfig";
import StarIcon from "@mui/icons-material/Star";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

function MovieWatch() {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const [similar, setSimilar] = useState(null);
  const [movie, setMovie] = useState(null);
  const ran = Math.floor(Math.random() * 20) + 1;

  useEffect(() => {
    const getSimilarMovie = async () => {
      const res = await tmdbApi.similar(category, id);
      setSimilar(res.results);
    };

    const getDetailMovie = async () => {
      const res = await tmdbApi.detail(category, id, { params: {} });
      setMovie(res);
    };

    getDetailMovie();
    getSimilarMovie();
  }, [category, id]);

  return (
    <>
      <div className="movieWatch section">
        <h2 className="head-title">
          <Link to="/">The Movix</Link> / <Link to="/movie">Movie</Link> /
          {movie ? <Link to={`/movie/${movie.id}`}> {movie.title}</Link> : ""}
        </h2>
        <div className="movieWatch__mainContent ">
          <div className="screen">
            {/* <iframe
              id="iframe"
              title="iframe"
              src={`https://www.2embed.to/embed/tmdb/${category}?id=${id}`}
              allowFullScreen
            ></iframe> */}
          </div>
          <div className="recomendation">
            <div className="randomBox">
              <h3>What's the movie today ?</h3>
              <p>
                If you don't know what to watch today. Let me help you with that
                !
              </p>
              <button onClick={() => navigate(`/movie/${similar[ran].id}`)}>
                Generate Random Movie
              </button>
            </div>
            <div className="recomendation__movies">
              {similar &&
                similar.slice(0, 3).map((el, i) => (
                  <div key={i} className="recomendation__movies__movieBox">
                    <div
                      className="img"
                      style={{
                        backgroundImage: `url(${apiConfig.w500Image(
                          el.poster_path
                        )})`,
                      }}
                    >
                      <button
                        onClick={() => navigate(`/movie/${el.id}`)}
                        className="play"
                      >
                        <PlayArrowIcon />
                      </button>
                    </div>
                    <div className="info">
                      <h5 className="info__title">{el.title}</h5>
                      <p className="info__vote">
                        {el.vote_average.toFixed(1)}
                        <StarIcon fontSize="medium" />
                      </p>
                      <p className="info__date">
                        {el.release_date.slice(0, 4)}
                        <CalendarTodayIcon fontSize="small" />
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieWatch;
