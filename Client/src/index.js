import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

//Importamos el Router para poder crear rutas en nuestra app.
import { BrowserRouter as Router } from "react-router-dom";

//Importamos el objeto provider de react-redux para que nuestra app pueda usar el store.
import { Provider } from "react-redux";
import store from "./redux/store"; //Nuestro store
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
