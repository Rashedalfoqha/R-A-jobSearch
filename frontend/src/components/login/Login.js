import axios from "axios";
import React, { useState, useContext } from "react";
import { userContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import "../login/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setToken, setIsLoggedIn, setUserId, setUserPersonal } =
    useContext(userContext);
  const navigate = useNavigate();

  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log(credentialResponse);
    const token = credentialResponse.credential;
    setToken(token);
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    navigate("/");
  };

  const handleGoogleLoginError = () => {
    setError("Google login failed");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://ra-job.onrender.com/register/login", {
        Email: email,
        password: password
      })
      .then((result) => {
        const token = result.data.token;
        localStorage.setItem("token", token);
        setToken(token);
        const userId = result.data.userId;
        localStorage.setItem("userId", userId);
        setUserId(userId);
        const user = result.data.user;
        localStorage.setItem("user", JSON.stringify(user));
        setUserPersonal(user);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch(() => {
        setError("Login failed. Please check your email or password.");
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <form
        className="login p-5 bg-light rounded"
        id="login"
        onSubmit={handleFormSubmit}
      >
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
            value={email}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <GoogleOAuthProvider
          clientId="308002675488-atob5tp4gc8ialafed71dh26sdqmh2ur.apps.googleusercontent.com"
        >
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginError}
          />
        </GoogleOAuthProvider>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => {
            setEmail("guest@gmail.com");
            setPassword("123");
          }}
        >
          Try Website
        </button>
        <div className="mb-3">
          <Link to="/register">Register</Link>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
