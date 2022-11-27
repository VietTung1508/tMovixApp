import apiConfig from "../../api/apiConfig";
import "./detail.scss";
import tmdbApi from "../../api/tmdbApi";

import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import noPoster from "../../assets/noposter.png";
import noPosterHeader from "../../assets/footer-bg.jpg";
import CastList from "./CastList";
import VideoList from "./VideoList";
import MovieList from "../../components/movie-list/MovieList";
import { OutlineButton } from "../../components/button/Button";

function Detail() {
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
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${
                movie.backdrop_path
                  ? apiConfig.originalImage(movie.backdrop_path)
                  : movie.poster_path
                  ? apiConfig.originalImage(movie.poster_path)
                  : noPosterHeader
              })`,
            }}
          ></div>
          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${
                    movie.poster_path
                      ? apiConfig.originalImage(movie.poster_path)
                      : movie.backdrop_path
                      ? apiConfig.originalImage(movie.backdrop_path)
                      : noPoster
                  })`,
                }}
              ></div>
            </div>
            <div className="movie-content__info">
              <div className="title">
                <h1>{movie.title || movie.name}</h1>
              </div>
              <div className="genres">
                {movie.genres.slice(0, 3).map((ge, i) => (
                  <span className="genres__item" key={i}>
                    {ge.name || ge.title}
                  </span>
                ))}
              </div>
              <div className="overview">
                <p>{movie.overview}</p>
              </div>
              <div className="cast-list">
                <h3>Casts</h3>
                <CastList />
              </div>
            </div>
          </div>
          <div className="movie-videos">
            <VideoList />
          </div>
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
        </>
      )}
    </>
  );
}

export default Detail;
