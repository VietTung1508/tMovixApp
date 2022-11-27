import { useEffect, useState } from "react";

import tmdbApi from "../../api/tmdbApi";

import { useParams } from "react-router-dom";

function VideoList() {
  const { category, id } = useParams();

  const [video, setVideo] = useState(null);

  useEffect(() => {
    const getVideos = async () => {
      const response = await tmdbApi.getVideos(category, id);
      setVideo(response.results.slice(0, 3));
    };
    getVideos();
  }, [category, id]);

  return <>{video && video.map((el, i) => <Video key={i} item={el} />)}</>;
}

const Video = (props) => {
  const item = props.item;

  return (
    <div className="video">
      <div className="video__title">
        <h2>{item.name}</h2>
      </div>
      <div className="video__content">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/` + item.key}
          width="100%"
          height="100%"
          allowFullScreen={true}
        ></iframe>
      </div>
    </div>
  );
};

export default VideoList;
