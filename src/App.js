import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import Routess from "./config/Routes";
import "swiper/swiper.min.css";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routess />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
