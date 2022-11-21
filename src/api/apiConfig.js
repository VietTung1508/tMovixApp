const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "0488136d216dae2b381bf9e3bb6d2966",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
