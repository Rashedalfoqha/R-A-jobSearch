import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { userContext } from "../../App";
import { IoSendSharp } from "react-icons/io5";
import emailjs from "emailjs-com";
import "./Job.css";

const JobDetails = () => {
  const navigate = useNavigate();
  const { JobDetail, token, userPersonal, setUserPersonal } =
    useContext(userContext);
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState("");
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [Apply, setApply] = useState(false);

  const apply = () => {
    const serviceId = "service_mtmz6jf";
    const templateId = "template_05hqb17";
    const userId = "znH3jKlhlPReHMYZa";
    const templateParams = {
      to_email: "rashedmohammadalfoqha@gmail.com",
      from_name: `${userPersonal.Email}`,
      message: ` "I am applying for the job.",
      Name:${userPersonal.FirstName},
      skills:${userPersonal.Skills}
      ,Experience:${userPersonal.Experience}
      phoneNumber:${userPersonal.phoneNumber}`
    };

    emailjs
      .send(serviceId, templateId, templateParams, userId)
      .then((response) => {
        console.log("Email sent successfully:", response);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };
  useEffect(() => {
    axios
      .get(`https://ra-job.onrender.com//job/${id}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then((result) => {
        console.log(result);
        setJobDetails(result.data.message);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container my-4">
      {loading && <p>Loading...</p>}
      {!loading && jobDetails && (
        <>
          <div className="row">
            <div className="col-md-6">
              {jobDetails.photo ? (
                <img src={jobDetails.photo} className="img-fluid" alt="Job" />
              ) : (
                <img
                  src="https://images.pexels.com/photos/4439454/pexels-photo-4439454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  className="img-fluid"
                  alt="Job"
                />
              )}
            </div>
            <div className="col-md-6">
              <div className="info">
                <h2>{jobDetails.title}</h2>
                <div className="details">
                  <div>
                    <label>Address:</label>
                    <p>{jobDetails.jobAddress}</p>
                  </div>
                  <div>
                    <label>Salary:</label>
                    <p>{jobDetails.salary}</p>
                  </div>
                </div>
                <div className="description">
                  <label>Description:</label>
                  <p>{jobDetails.description}</p>
                </div>
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => {
                    apply();
                    setApply(true);
                  }}
                >
                  Apply
                </button>
                {Apply && (
                  <p className="mess">
                    The request has been sent. Waiting for a response to your
                    email
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default JobDetails;
