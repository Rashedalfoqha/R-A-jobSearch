import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../App";
import axios from "axios";
import { IoSend } from "react-icons/io5";
import { FaComment } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import "./post.css";
import { Link } from "react-router-dom";
import { TiDelete } from "react-icons/ti";

const Post = () => {
  const { token, post, setPost, userId, userPersonal } =
    useContext(userContext);
  const [comment, setComment] = useState("");
  const [update, setUpdate] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [filter, setFilter] = useState("");
  const [newPostDescription, setNewPostDescription] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [Like, setLike] = useState(false);

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "wq8dmxe2");
    data.append("cloud_name", "duanrnkmq");

    axios
      .post(`https://api.cloudinary.com/v1_1/duanrnkmq/image/upload`, data)
      .then((data) => {
        setUrl(data.data.url);
        console.log("uploaded");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("https://ra-job.onrender.com//post/get", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setPost(result.data.posts);
        setFilter(result.data.posts._id);
      })
      .catch((err) => {
        console.log(err.message);
      });
    uploadImage();
  }, []);

  return (
    <>
      {post ? (
        <>
          <div className="post-form">
            <div className="container mt-5">
              <div className="row">
                <div className="col-md-8 mx-auto mb-3">
                  <div className="card">
                    <div className="card-header">
                      <div className="input-container">
                        <div className="textarea-container">
                          <textarea
                            id="newPostDescription"
                            className="inp-des"
                            placeholder="What's on your mind?"
                            required
                            onChange={(e) => {
                              setNewPostDescription(e.target.value);
                            }}
                            value={newPostDescription}
                          />
                        </div>
                      </div>
                      {image && (
                        <img
                          src={url}
                          width="200"
                          height="270"
                          className="img"
                          alt="Uploaded"
                        />
                      )}
                      <br />
                      <button
                        className="create"
                        onClick={() => {
                          axios
                            .post(
                              "https://ra-job.onrender.com//post",
                              {
                                description: newPostDescription,
                                photo: url,
                              },
                              {
                                headers: {
                                  authorization: `Bearer ${token}`,
                                },
                              }
                            )
                            .then((result) => {
                              setPost([...post, result.data.post]);
                              console.log(result);
                              setNewPostDescription("");
                              setImage(null);
                              setUrl("");
                              location.reload(post);
                            });
                        }}
                      >
                        Create New Post
                      </button>
                    </div>
                    {image ? (
                      <button className="upload" onClick={uploadImage}>
                        upload
                      </button>
                    ) : (
                      <input
                        type="file"
                        className="custom-file-label"
                        onChange={(e) => {
                          setImage(e.target.files[0]);
                          uploadImage();
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="container mt-5">
              <div className="row">
                {post &&
                  post.map((elem, i) => (
                    <div className="col-md-8 mx-auto mb-3" key={elem._id}>
                      <div className="card">
                        <div className="card-header">
                          {elem.userId.photo ? (
                            <>
                              <Link
                                to={`/user/${elem.userId._id}`}
                                onClick={() => {
                                  setUserDetail(elem.userId._id);
                                }}
                                className="text-decoration-none"
                              >
                                <img
                                  src={elem?.userId?.photo}
                                  alt={elem?.userId?.FirstName}
                                  className="rounded-circle mr-2"
                                  width="40"
                                  height="40"
                                />{" "}
                                <p className="p-name">
                                  {elem?.userId?.FirstName}{" "}
                                  {elem?.userId?.lastName}
                                </p>
                              </Link>
                            </>
                          ) : (
                            <>
                              <Link
                                to={`/user/${elem.userId._id}`}
                                onClick={() => {
                                  setUserDetail(elem.userId._id);
                                }}
                                className="text-decoration-none"
                              >
                                <img
                                  className="rounded-circle mr-2"
                                  id="def-img"
                                  width="40"
                                  height="40"
                                  src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Picture.png"
                                />
                                <p className="p-name">
                                  {elem?.userId?.FirstName}
                                  {elem?.userId?.lastName}
                                </p>
                              </Link>
                            </>
                          )}
                        </div>{" "}
                        <div className="card-body">
                          <p className="card-text">{elem?.description}</p>
                        </div>
                        {elem.photo ? (
                          <img
                            src={elem?.photo}
                            className="card-img-top"
                            alt="Post"
                            width="100"
                            height="450"
                          />
                        ) : (
                          <></>
                        )}
                        <button
                          className="like-btn"
                          onClick={(e) => {
                            setLike(!Like);
                          }}
                        >
                          {" "}
                          {Like ? (
                            <AiFillLike className="like" />
                          ) : (
                            <BiLike className="like" />
                          )}
                        </button>
                        <button
                          className="show"
                          onClick={() => setShowComments(!showComments)}
                        >
                          <FaComment /> {showComments ? "hide" : "comment"}
                        </button>
                        {showComments && (
                          <div className="comments-container">
                            {elem.comment.map((comment, i) => (
                              <div className="comment" key={i}>
                                <div className="comment-child">
                                  <p className="comment-p">{comment.comment}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="card-footer">
                          <input
                            placeholder="Comment"
                            type="text"
                            required
                            className="inp-comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                          <button
                            className="icon-comment"
                            onClick={() => {
                              axios
                                .post(
                                  `https://ra-job.onrender.com//post/${elem._id}/comments/`,
                                  {
                                    comment: comment,
                                  },
                                  {
                                    headers: {
                                      authorization: `Bearer ${token}`,
                                    },
                                  }
                                )
                                .then((result) => {
                                  console.log(result);
                                  const updatedPosts = post.map((element) =>
                                    element._id === elem._id
                                      ? {
                                          ...element,
                                          comment: [
                                            ...element.comment,
                                            {
                                              comment: comment,
                                            },
                                          ],
                                        }
                                      : element
                                  );
                                  setPost(updatedPosts);
                                  setComment("");
                                })
                                .catch((err) => {
                                  console.log(err);
                                });
                            }}
                          >
                            <IoSend className="send-comment" />
                          </button>
                        </div>
                        {elem.userId._id === userId && (
                          <>
                            <TiDelete
                              className="x-icon"
                              onClick={() => {
                                axios
                                  .delete(
                                    `https://ra-job.onrender.com//post/delete/${elem._id}`,
                                    {
                                      headers: {
                                        authorization: `Bearer ${token}`,
                                      },
                                    }
                                  )
                                  .then((result) => {
                                    const filteredPost = post.filter(
                                      (element, i) => {
                                        return elem._id != element._id;
                                      }
                                    );
                                    setPost(filteredPost);
                                    console.log(filteredPost);
                                  })
                                  .catch((err) => {
                                    console.log(err.message);
                                  });
                              }}
                            />

                            {update ? (
                              <>
                                <button
                                  variant="contained"
                                  className="update"
                                  onClick={() => {
                                    axios
                                      .put(
                                        `https://ra-job.onrender.com//post/update/${elem._id}`,
                                        {
                                          description: description,
                                        },
                                        {
                                          headers: {
                                            authorization: `Bearer ${token}`,
                                          },
                                        }
                                      )
                                      .then((result) => {
                                        setUpdate(!update);

                                        const updatedPosts = post.map(
                                          (element) =>
                                            element._id === elem._id
                                              ? {
                                                  ...element,
                                                  description: description,
                                                }
                                              : element
                                        );
                                        setPost(updatedPosts);
                                        setDescription("");
                                      })
                                      .catch((err) => {
                                        console.log(err.message);
                                      });
                                  }}
                                >
                                  Update
                                </button>
                                <input
                                  className="inp-comment"
                                  type="text"
                                  placeholder="Edit Job Description"
                                  required
                                  onChange={(e) =>
                                    setDescription(e.target.value)
                                  }
                                />
                              </>
                            ) : (
                              <>
                                {" "}
                                <button
                                  className="update"
                                  onClick={() => {
                                    setUpdate(!update);
                                  }}
                                >
                                  update description
                                </button>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="loader">
            <span className="loader-text">loading</span>
            <span className="load"></span>
          </div>
        </>
      )}
    </>
  );
};

export default Post;
