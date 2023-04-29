import "./App.css";
import { Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav/Nav";
import LandingPage from "./Components/LandingPage/LandingPage";

function App() {
  return (
    <div className="App">
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
      </Routes>
      <footer>
        Made with ❤️ by <a href="https://www.linkedin.com/in/gino-tapia-barrios/">Gino Tapia Barrios</a>
      </footer>
    </div>
  );
}

export default App;
