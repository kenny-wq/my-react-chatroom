import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./global.scss";
import { BrowserRouter } from "react-router-dom";
import CurrentUserContextProvider from "./contexts/CurrentUserContext.jsx";
import CurrentFriendContextProvider from "./contexts/CurrentFriendContext.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <CurrentUserContextProvider>
    <CurrentFriendContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CurrentFriendContextProvider>
  </CurrentUserContextProvider>
);
