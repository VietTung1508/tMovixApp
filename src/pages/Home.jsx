import { OutlineButton } from "../components/button/Button";
import HeroSlide from "../components/hero_slide/HeroSlide";
import { Link } from "react-router-dom";
import MovieList from "../components/movie-list/MovieList";
import { category, movieType, tvType } from "../api/tmdbApi";

function Home() {
  return (
    <>
      <HeroSlide />
      <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList type={movieType.popular} category={category.movie} />
        </div>
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Rated Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList type={movieType.top_rated} category={category.movie} />
        </div>
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending TV Shows</h2>
            <Link to="/tv">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList type={tvType.popular} category={category.tv} />
        </div>
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Rated TV Shows</h2>
            <Link to="/tv">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList type={tvType.top_rated} category={category.tv} />
        </div>
      </div>
    </>
  );
}

export default Home;
