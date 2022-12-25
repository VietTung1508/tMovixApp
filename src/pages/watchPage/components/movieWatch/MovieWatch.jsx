import { useParams, Link } from "react-router-dom";
import "./movieWatch.scss";
import { useEffect, useState } from "react";
import tmdbApi from "../../../../api/tmdbApi";
import WatchSidebar from "../../../../components/watchSidebar/WatchSidebar";
import apiConfig from "../../../../api/apiConfig";
import StarIcon from "@mui/icons-material/Star";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

function MovieWatch() {
  const { category, id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getDetailMovie = async () => {
      const res = await tmdbApi.detail(category, id, { params: {} });
      setMovie(res);
    };

    getDetailMovie();
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
            <iframe
              id="iframe"
              title="iframe"
              src={`https://www.2embed.to/embed/tmdb/${category}?id=${id}`}
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
                      {movie.release_date.slice(0, 4)}
                      <CalendarTodayIcon fontSize="small" />
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="sideBar">
            <WatchSidebar />
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieWatch;
