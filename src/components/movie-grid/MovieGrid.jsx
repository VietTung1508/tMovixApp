import "./movie-grid.scss";

import tmdbApi, { tvType, movieType, category } from "../../api/tmdbApi";
import MovieCard from "../movie-card/MovieCard";

import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { OutlineButton } from "../button/Button";

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
      <div className="movie-grid container">
        {items.map((item, i) => (
          <MovieCard key={i} item={item} />
        ))}
      </div>
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

export default MovieGrid;
