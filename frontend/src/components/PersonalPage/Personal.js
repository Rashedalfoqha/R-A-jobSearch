import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../App";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./personal.css";
import { Link } from "react-router-dom";

const Personal = () => {
  const [update, setUpdate] = useState(false);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  const {
    userPersonal,
    setUserPersonal,
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
    token,
  } = useContext(userContext);

  const uploadImage = async () => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "wq8dmxe2");
      data.append("cloud_name", "duanrnkmq");

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/duanrnkmq/image/upload`,
          data
        );
        setUrl(response.data.url);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `https://ra-job.onrender.com//job/user/${userPersonal._id}`
        );
        console.log(result);
        setUserPosts(result.data.job);
        uploadImage();
      } catch (err) {
        console.log(err);
      }
      uploadImage();
    };

    fetchData();
  }, [userPersonal._id, image]);

  const updateData = async () => {
    const isDataModified =
      first !== userPersonal.FirstName ||
      last !== userPersonal.lastName ||
      email !== userPersonal.Email ||
      phoneNumber !== userPersonal.phoneNumber ||
      experience !== userPersonal.Experience ||
      skill !== userPersonal.Skills ||
      url !== userPersonal.photo;

    try {
      const result = await axios.put(
        `https://ra-job.onrender.com//register/update/${userPersonal._id}`,
        {
          FirstName: first,
          lastName: last,
          Email: email,
          password: password,
          phoneNumber: phoneNumber,
          Experience: experience,
          Skills: skill,
          photo: url,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setUserPersonal({ ...userPersonal, ...result.data.result });
      console.log(result);
      uploadImage();
    } catch (err) {
      console.log(err.message);
    }
    {
      setUpdate(!update);
    }
  };

  return (
    <div className="container mt-4">
      <Row className="justify-content-center">
        <Col md={4}>
          <div className="card">
            {userPersonal.photo && (
              <img
                src={userPersonal.photo}
                alt="User Photo"
                className="card-img-top img-fluid"
              />
            )}
            <div className="card-body">
              <label for="floatingInput">Name:</label>
              <h5 className="card-title">
                {userPersonal.FirstName}
                {userPersonal.lastName}
              </h5>{" "}
              <label for="floatingInput">Email:</label>
              <p className="card-text">{userPersonal.Email}</p>
              <label for="floatingInput">phoneNumber:</label>
              <p className="card-text">{userPersonal.phoneNumber}</p>
              <div className="form-group mt-2">
                {update ? (
                  <>
                    <label htmlFor="inp-img">
                      <Avatar
                        alt="User"
                        src={userPersonal.photo}
                        className="avatar"
                      />
                      <input
                        type="file"
                        id="inp-img"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          setImage(e.target.files[0]);
                        }}
                      />
                    </label>
                  </>
                ) : (
                  <Avatar
                    alt="User"
                    src={userPersonal.photo}
                    className="avatar"
                  />
                )}
              </div>
              <div className="form-group mt-2">
                {update ? (
                  <TextField
                    className="form-control"
                    label="First Name"
                    value={first}
                    onChange={(e) => setFirst(e.target.value)}
                    placeholder="Enter your first name"
                  />
                ) : (
                  <p className="per"></p>
                )}
              </div>
              <div className="form-group mt-2">
                {update ? (
                  <TextField
                    className="form-control"
                    label="Last Name"
                    value={last}
                    onChange={(e) => setLast(e.target.value)}
                    placeholder="Enter your last name"
                  />
                ) : (
                  <>
                    <label for="floatingInput">Name:</label>
                    <p className="per">
                      {userPersonal.FirstName} {userPersonal.lastName}
                    </p>
                  </>
                )}
              </div>
              <div className="form-group mt-2">
                {update ? (
                  <TextField
                    className="form-control"
                    label="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                ) : (
                  <>
                    <label for="floatingInput">Email:</label>

                    <p className="per">{userPersonal.Email}</p>
                  </>
                )}
              </div>
              <div className="form-group mt-2">
                {update ? (
                  <TextField
                    className="form-control"
                    label="Phone Number"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <>
                    <label for="floatingInput">phoneNumber:</label>
                    <p className="per">{userPersonal.phoneNumber}</p>
                  </>
                )}
              </div>
              <div className="form-group mt-2">
                {update ? (
                  <TextField
                    className="form-control"
                    label="Experience"
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="Enter your experience"
                  />
                ) : (
                  <>
                    <label>Experience:</label>
                    <p className="per">{userPersonal.Experience}</p>
                  </>
                )}
              </div>
              <div className="form-group mt-2">
                {update ? (
                  <TextField
                    className="form-control"
                    label="Skills"
                    onChange={(e) => setSkill(e.target.value)}
                    placeholder="Enter your skills"
                  />
                ) : (
                  <>
                    <label>Skills:</label>
                    <p className="per">{userPersonal.Skills}</p>
                  </>
                )}
              </div>
              <div className="form-group mt-2">
                {update ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      updateData();
                      setUpdate(!update);
                    }}
                    className="mt-3"
                  >
                    Update user information
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setUpdate(!update)}
                    className="mt-3"
                  >
                    Edit information
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Col>

        <Col md={6}>
          {userPosts.map((post) => (
            <div key={post._id} className="card mb-4">
              {post.photo ? (
                <Link
                  to={`/job/${post._id}`}
                  onClick={() => {
                    setJobDetail(post._id);
                  }}
                  className="text-decoration-none text-dark"
                >
                  <img
                    src={post.photo}
                    alt="Post Photo"
                    className="card-img-top img-fluid"
                  />
                </Link>
              ) : (
                <></>
              )}

              <div className="card-body">
                <Link
                  to={`/job/${post._id}`}
                  onClick={() => {
                    setJobDetail(post._id);
                  }}
                  className="text-decoration-none text-dark"
                >
                  <h5 className="card-title">{post.title}</h5>
                </Link>
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
        </Col>
      </Row>
    </div>
  );
};

export default Personal;
