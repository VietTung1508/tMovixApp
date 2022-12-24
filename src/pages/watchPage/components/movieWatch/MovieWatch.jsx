import { useParams, Link } from "react-router-dom";
import "./movieWatch.scss";
import { useEffect, useState } from "react";
import tmdbApi from "../../../../api/tmdbApi";
import WatchSidebar from "../../../../components/watchSidebar/WatchSidebar";

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
