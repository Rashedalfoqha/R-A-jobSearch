import axios from "axios";
import React, { useState } from "react";
import { userContext } from "../../App";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import "../login/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {
    setToken,
    token,
    isLoggedIn,
    setIsLoggedIn,
    setUserId,
    userId,
    userPersonal,
    setUserPersonal,
  } = useContext(userContext);
  const navigate = useNavigate();

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <form className="login p-5 bg-light rounded" id="login">
        <h2 className="text-center mb-4">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <GoogleOAuthProvider
          id="google"
          className="mb-3"
          clientId="308002675488-atob5tp4gc8ialafed71dh26sdqmh2ur.apps.googleusercontent.com"
        >
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
              setToken(credentialResponse.credential);
              localStorage.setItem("token", token);
              navigate("/");
            }}
            onError={() => {
              setError("Google login failed");
            }}
          />
        </GoogleOAuthProvider>
        <div className="mb-3">
          <Link to="/register">Register</Link>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            axios
              .post("https://ra-job.onrender.com//register/login", {
                Email: email,
                password: password,
              })
              .then((result) => {
                location.reload();
                const token = result.data.token;
                localStorage.setItem("token", token);
                setToken(token);
                localStorage.setItem("userId", result.data.userId);
                setUserId(result.data.userId);
                localStorage.setItem("user", JSON.stringify(result.data.user));
                setUserPersonal(result.data.user);
                navigate("/");
              })
              .catch((err) => {
                setError("login failed please check Email or password");
              });
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
