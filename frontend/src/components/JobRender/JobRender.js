import axios from "axios";
import React, { useEffect, useState } from "react";
import { userContext } from "../../App";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { BsFillSendPlusFill } from "react-icons/bs";
import "./job.css";
const JobRender = () => {
  const {
    setToken,
    token,
    userId,
    filter,
    setFilter,
    job,
    setJob,
    address,
    setAddress,
    description,
    setDescription,
    salary,
    setSalary,
    image,
    setImage,
    url,
    setUrl,
    setJobDetail,
    UserDetail,
    setUserDetail,
    dashBoard,
    setDashBoard,
    filteredJobs,
    searchTerm,
    setSearchTerm,
  } = useContext(userContext);
  const [comment, setComment] = useState("");

  useEffect(() => {
    axios
      .get("https://ra-job.onrender.com//job")
      .then((result) => {
        console.log(result);
        setDashBoard(result.data.posts);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="container mt-5">
      {filteredJobs.length ? (
        <>{filteredJobs.map((elem) => {})}</>
      ) : (
        <div className="col-md-12 loader"></div>
      )}
      <div className="row">
        {dashBoard.length ? (
          <>
            {dashBoard.map((elem) => (
              <div key={elem?._id} className="col-md-6 mb-4">
                <div className="card">
                  <Link
                    to={`/user/${elem.userId._id}`}
                    onClick={() => {
                      setUserDetail(elem.userId._id);
                    }}
                    className="text-decoration-none"
                  >
                    <img
                      src={
                        elem?.userId?.photo ||
                        "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Picture.png"
                      }
                      className="rounded-circle mr-2"
                      id="image"
                      width="40"
                      height="40"
                      alt="User Profile"
                    />
                    {elem?.userId.FirstName} {elem?.userId.lastName}
                  </Link>
                  {elem.photo ? (
                    <Link
                      to={`/job/${elem._id}`}
                      onClick={() => {
                        setJobDetail(elem._id);
                      }}
                    >
                      <img
                        src={elem.photo}
                        alt={elem.photo}
                        className="card-img-top"
                        width="400"
                        height="400"
                      />
                    </Link>
                  ) : (
                    <img
                      src="https://images.pexels.com/photos/14983436/pexels-photo-14983436/free-photo-of-church-roof-with-a-cross-on-top.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt={elem.photo}
                      className="card-img-top"
                      width="400"
                      height="400"
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title mt-2">
                      <Link
                        to={`/job/${elem._id}`}
                        onClick={() => {
                          setJobDetail(elem._id);
                        }}
                        className="text-decoration-none text-dark"
                      >
                        {elem.title}
                      </Link>
                    </h5>
                    <label>Job Address:</label>
                    <p className="card-text" id="p">{elem.jobAddress}</p>
                    <label>Description:</label>
                    <p className="card-text" id="p" >{elem.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="col-md-12 loader"></div>
        )}
      </div>
      <div className="col-md-2" id="add-new-job">
        <Link to="/newJob" className="btn btn-primary">
          Add New Job <BsFillSendPlusFill className="icon" />
        </Link>
      </div>
    </div>
  );
};

export default JobRender;
