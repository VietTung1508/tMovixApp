import { useParams, Link } from "react-router-dom";
import MovieWatch from "./components/movieWatch/MovieWatch";
import TvWatch from "./components/tvWatch/TvWatch";
import { useState, useEffect } from "react";
import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import noPosterHeader from "../../assets/footer-bg.jpg";
import MovieList from "../../components/movie-list/MovieList";
import { OutlineButton } from "../../components/button/Button";

function WatctPage() {
  const { category, id } = useParams();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getDetailMovie = async () => {
      const response = await tmdbApi.detail(category, id, { params: {} });
      setMovie(response);
    };

    getDetailMovie();
  }, [category, id]);

  return (
    <>
      {movie && (
        <div
          className="watch"
          style={{
            overflowX: "hidden",
          }}
        >
          <div
            className="banner"
            style={{
              height: "250px",
              backgroundImage: `url(${
                movie.backdrop_path
                  ? apiConfig.originalImage(movie.backdrop_path)
                  : movie.poster_path
                  ? apiConfig.originalImage(movie.poster_path)
                  : noPosterHeader
              })`,
            }}
          ></div>
          <div className="watch-content container">
            {category === "movie" ? <MovieWatch /> : <TvWatch />}
            <div className="container">
              <div className="section mb-3">
                <div className="section__header mb-2">
                  <h2>Similar</h2>
                  <Link to={`/${category}`}>
                    <OutlineButton className="small">View more</OutlineButton>
                  </Link>
                </div>
                <MovieList type="similar" category={category} id={id} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WatctPage;
