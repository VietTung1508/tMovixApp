import { Route, Routes } from "react-router-dom";
import Catalog from "../pages/Catalog";
import Detail from "../pages/details/Detail";
import Home from "../pages/Home";
import WatctPage from "../pages/watchPage/WatchPage";

function Routess() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/:category" element={<Catalog />} />

      <Route path="/:category/:id" element={<Detail />} />

      <Route path="/:category/search/:keyword" element={<Catalog />} />

      <Route
        path="/:category/:id/watch&season=:season&ep=:ep"
        element={<WatctPage />}
      />

      <Route path="/:category/:id/watch" element={<WatctPage />} />
    </Routes>
  );
}

export default Routess;
