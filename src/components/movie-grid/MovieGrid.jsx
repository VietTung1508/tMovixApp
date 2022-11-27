import "./movie-grid.scss";

import tmdbApi, { tvType, movieType, category } from "../../api/tmdbApi";
import MovieCard from "../movie-card/MovieCard";

import { useState, useEffect, useCallback, useRef } from "react";

import { useParams } from "react-router-dom";
import Button, { OutlineButton } from "../button/Button";
import Input from "../input/Input";
import { useNavigate } from "react-router-dom";
import noMovies from "../../assets/empty.svg";

function MovieGrid(props) {
  const [items, setItems] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { keyword } = useParams();

  useEffect(() => {
    const getList = async () => {
      let response = null;

      if (keyword === undefined) {
        const params = {};
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(movieType.upcoming, {
              params,
            });
            break;
          default:
            response = await tmdbApi.getTvList(tvType.popular, { params });
        }
      } else {
        const params = {
          query: keyword,
        };

        response = await tmdbApi.search(props.category, { params });
      }
      setItems(response.results);
      setTotalPage(response.total_pages);
    };
    getList();
  }, [props.category, keyword]);

  const loadMore = async () => {
    let response = null;
    if (keyword === undefined) {
      const params = {
        page: page + 1,
      };
      switch (props.category) {
        case category.movie:
          response = await tmdbApi.getMoviesList(movieType.upcoming, {
            params,
          });
          break;
        default:
          response = await tmdbApi.getTvList(tvType.popular, { params });
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword,
      };

      response = await tmdbApi.search(props.category, { params });
    }
    setItems([...items, ...response.results]);
    setPage(page + 1);
  };

  return (
    <>
      <MovieSearch keyword={keyword} category={props.category} />
      <div className="movie-grid container">
        {items.map((item, i) => (
          <MovieCard key={i} category={props.category} item={item} />
        ))}
      </div>
      {items.length === 0 ? (
        <div className="noMovies">
          <div>
            <h2>
              Sorry we cannot find your{" "}
              {props.category === "movie" ? "movie" : "tv show"}! Please try
              again.
            </h2>
            <img src={noMovies} alt="" />
          </div>
        </div>
      ) : null}
      {page < totalPage ? (
        <div className="movie-grid-loadmore">
          <OutlineButton onClick={loadMore} className="small">
            Load more
          </OutlineButton>
        </div>
      ) : null}
    </>
  );
}

const MovieSearch = (props) => {
  const navigate = useNavigate();

  const [search, setSearch] = useState(props.keyword ? props.keyword : "");

  const goToSearch = useCallback(() => {
    if (search.trim().length > 0) {
      navigate(`/${category[props.category]}/search/${search}`);
    }
  }, [search, props.category, navigate]);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.key === "Enter") {
        goToSearch();
        setSearch("");
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [search, goToSearch]);

  return (
    <div className="movie-search">
      <Input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
      />
      <Button className="small" onClick={goToSearch}>
        Search
      </Button>
    </div>
  );
};

export default MovieGrid;
