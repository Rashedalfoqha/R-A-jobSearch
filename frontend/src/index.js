import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="308002675488-atob5tp4gc8ialafed71dh26sdqmh2ur.apps.googleusercontent.com">
      {" "}
      <BrowserRouter>
        {" "}
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
