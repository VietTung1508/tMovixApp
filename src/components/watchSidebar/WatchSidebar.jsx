import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import StarIcon from "@mui/icons-material/Star";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import "./watchSidebar.scss";

function WatchSidebar() {
  const navigate = useNavigate();
  const [similar, setSimilar] = useState(null);
  const { category, id } = useParams();
  const ran = Math.floor(Math.random() * 20) + 1;

  useEffect(() => {
    const getSimilarMovie = async () => {
      const res = await tmdbApi.similar(category, id);
      setSimilar(res.results);
    };

    getSimilarMovie();
  }, [category.id]);

  return (
    <div className="watchSidebar">
      <div className="randomBox">
        <h3>
          What's the {category === "movie" ? "movie" : "Tv Series"} today ?
        </h3>
        <p>
          If you don't know what to watch today. Let me help you with that !
        </p>
        <button onClick={() => navigate(`/${category}/${similar[ran].id}`)}>
          Generate Random {category === "movie" ? "movie" : "Tv Series"}
        </button>
      </div>
      <div className="watchSidebar__movies">
        {similar &&
          similar.slice(0, `${category === "movie" ? 5 : 6}`).map((el, i) => (
            <div key={i} className="watchSidebar__movies__movieBox">
              <div
                className="img"
                style={{
                  backgroundImage: `url(${apiConfig.w500Image(
                    el.poster_path
                  )})`,
                }}
              >
                <button
                  onClick={() => navigate(`/${category}/${el.id}`)}
                  className="play"
                >
                  <PlayArrowIcon />
                </button>
              </div>
              <div className="info">
                <h5 className="info__title">{el.title || el.name}</h5>
                <p className="info__vote">
                  {el.vote_average.toFixed(1)}
                  <StarIcon fontSize="medium" />
                </p>
                <p className="info__date">
                  {el.release_date
                    ? el.release_date.slice(0, 4)
                    : el.first_air_date.slice(0, 4)}
                  <CalendarTodayIcon fontSize="small" />
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default WatchSidebar;
