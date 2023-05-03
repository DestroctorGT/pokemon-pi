import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./Components/Nav/Nav";
import LandingPage from "./Components/LandingPage/LandingPage";
import Cards from "./Components/Cards/Cards";
import CreatePokemon from "./Components/CreatePokemon/CreatePokemon";

function App() {
  const location = useLocation();

  return (
    <div className={location.pathname === "/" ? "App" : "Home"}>
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/home" element={<Cards />}></Route>
        <Route path="/create" element={<CreatePokemon />}></Route>
      </Routes>
      <footer>
        Made with ❤️ by{" "}
        <a href="https://www.linkedin.com/in/gino-tapia-barrios/">
          Gino Tapia Barrios
        </a>
      </footer>
    </div>
  );
}

export default App;
