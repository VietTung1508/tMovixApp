import { useEffect, useState } from "react";

import tmdbApi, { category, movieType, tvType } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import noImage from "../../assets/noImage.png";

import { useParams } from "react-router-dom";

function CastList() {
  const [casts, setCasts] = useState(null);


  const { category, id } = useParams();

  useEffect(() => {
    const getCasts = async () => {
      const response = await tmdbApi.credits(category, id);
      setCasts(response.cast);
    };
    getCasts();
  }, [category, id]);

  return (
    <>
      {casts && (
        <div className="casts">
          {casts.slice(0, 5).map((cast, i) => (
            <div key={i} className="casts__item">
              <div
                className="casts__item__img"
                style={{
                  backgroundImage: `url(${
                    cast.profile_path
                      ? apiConfig.w500Image(cast.profile_path)
                      : noImage
                  })`,
                }}
              ></div>
              <div className="casts__item__name">
                <h4>{cast.name}</h4>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default CastList;
