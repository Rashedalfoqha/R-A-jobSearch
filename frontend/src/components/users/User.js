import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { userContext } from "../../App";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const User = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [UserDetails, setUserDetails] = useState([]);

  const { id } = useParams();
  const { UserDetail, setUserDetail, token } = useContext(userContext);

  useEffect(() => {
    axios
      .get(`https://ra-job.onrender.com//job/user/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result);
        setUserPosts(result.data.job);
        setUserDetails(result.data.job[0].userId);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
           {UserDetails.photo ?  <img
              src={UserDetails.photo}
              alt="User Photo"
              className="card-img-top img-fluid"
            />:<img
            src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Picture.png"
            alt="User Photo"
            className="card-img-top img-fluid"
          />}
            <div className="card-body">
              <h5 className="card-title">
                {UserDetails.FirstName} {UserDetails.lastName}
              </h5>
              <p className="card-text">{UserDetails.Email}</p>
              <p className="card-text">{UserDetails.phoneNumber}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          {userPosts.map((post) => (
            <div key={post._id} className="card mb-4">
              {post.photo ? (
                <img
                  src={post.photo}
                  alt="Post Photo"
                  className="card-img-top img-fluid"
                />
              ) : (
                <></>
              )}
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">Job Address: {post.jobAddress}</p>
                <p className="card-text">Description: {post.description}</p>
                <p className="card-text">Salary: {post.salary}</p>
                {post.comments && post.comments.length > 0 && (
                  <div>
                    <h6>Comments:</h6>
                    <ul className="list-unstyled">
                      {post.comments.map((comment) => (
                        <li key={comment._id}>{comment.text}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default User;
