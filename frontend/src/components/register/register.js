import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "../../App";
import "../register/register.css";

const Register = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    first,
    setFirst,
    last,
    setLast,
    email,
    setEmail,
    password,
    setPassword,
    phoneNumber,
    setPhoneNumber,
    experience,
    setExperience,
    skill,
    setSkill,
  } = useContext(userContext);
  const [error, setError] = useState(null);

  const handleRegister = () => {
    setIsLoading(true);
    setError(null);

    axios
      .post("https://ra-job.onrender.com//register", {
        FirstName: first,
        lastName: last,
        Email: email,
        password: password,
        phoneNumber: phoneNumber,
        Experience: experience,
        Skills: skill,
      })
      .then((result) => {
        console.log(result.data);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        setError("Registration failed. Please try again.");
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form>
            <h2 className="mb-4">Register</h2>

            <div className="form-group">
              <label htmlFor="formFirstName">First Name</label>
              <input
                type="text"
                className="form-control"
                id="formFirstName"
                placeholder="Enter your first name"
                minLength="3"
                maxLength="10"
                onChange={(e) => setFirst(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="formLastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="formLastName"
                placeholder="Enter your last name"
                minLength="3"
                maxLength="10"
                onChange={(e) => setLast(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="formEmail">Email</label>
              <input
                type="email"
                className="form-control"
                id="formEmail"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="formPassword">Password</label>
              <div className="input-group">
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="form-control"
                  id="formPassword"
                  placeholder="Enter your password"
                  minLength="8"
                  maxLength="50"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="formPhoneNumber">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                id="formPhoneNumber"
                placeholder="Enter your phone number"
                minLength="10"
                maxLength="10"
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="formExperience">Experience</label>
              <input
                type="text"
                className="form-control"
                id="formExperience"
                placeholder="Enter your experience "
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="formSkills">Skills & Qualifications</label>
              <input
                type="text"
                className="form-control"
                id="formSkills"
                placeholder="Enter your skills & qualifications "
                onChange={(e) => setSkill(e.target.value)}
              />
            </div>

            {error && <p className="text-danger">{error}</p>}

            <button
              type="button"
              className={`btn btn-primary ${isLoading ? "disabled" : ""}`}
              onClick={handleRegister}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>

            <p className="mt-3">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
