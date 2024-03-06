import axios from "axios";
import React, { useContext } from "react";
import "./jobPost.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { userContext } from "../../App";
import { useNavigate } from "react-router-dom";

const JobPost = () => {
  const navigate = useNavigate();
  const {
    setToken,
    token,
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
  } = useContext(userContext);

  const uploadImage = () => {
    console.log(image);

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "wq8dmxe2");
    data.append("cloud_name", "duanrnkmq");

    axios
      .post(`https://api.cloudinary.com/v1_1/duanrnkmq/image/upload`, data)
      .then((data) => {
        setUrl(data.data.url);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="job container mt-4">
      <label htmlFor="position" className="form-label">
        Position
      </label>
      <select
        id="position"
        className="form-select"
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      >
        <option value="1">trainee</option>
        <option value="2">junior</option>
        <option value="3">middle</option>
        <option value="4">senior</option>
        <option value="5">team leader</option>
      </select>

      <label htmlFor="jobName" className="form-label">
        Job Name
      </label>
      <input
        id="jobName"
        placeholder="Job Name"
        type="text"
        className="form-control"
        onChange={(e) => {
          setJob(e.target.value);
        }}
      />

      <label htmlFor="jobAddress" className="form-label">
        Job Address
      </label>
      <input
        id="jobAddress"
        placeholder="Job Address"
        type="text"
        className="form-control"
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      />

      <label htmlFor="salary" className="form-label">
        Salary
      </label>
      <input
        id="salary"
        placeholder="Salary"
        type="number"
        className="form-control"
        onChange={(e) => {
          setSalary(e.target.value);
        }}
      />

      <label htmlFor="description" className="form-label">
        Description
      </label>
      <input
        id="description"
        placeholder="Description"
        type="text"
        className="form-control"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />

      <input
        type="file"
        id="fileInput"
        className="form-control"
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
      />

      {image && (
        <button className="btn btn-primary mt-2" onClick={uploadImage}>
          Upload
        </button>
      )}

      {url && (
        <button
          className="btn btn-success mt-3"
          onClick={() => {
            axios
              .post(
                "https://ra-job.onrender.com//job",
                {
                  filterTitle: filter,
                  title: job,
                  jobAddress: address,
                  description: description, 
                  salary: salary,
                  photo: url,
                },
                {
                  headers: {
                    authorization: `Bearer ${token}`,
                  },
                }
              )
              .then((result) => {
                console.log(result);
                navigate("/job");
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          Create New Job
        </button>
      )}

      <br />
      <img src={url} alt="Uploaded Job" className="img-fluid mt-3" />
    </div>
  );
};

export default JobPost;
