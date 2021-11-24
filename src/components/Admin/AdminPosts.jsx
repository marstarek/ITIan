import { Tracks } from "../../dummyData";
import React, { useEffect, useState } from "react";
import {
  BsFillFunnelFill,
  BsLockFill,
  BsGearFill,
  BsFillPersonFill,
  BsFillCameraFill,
  BsFillBadgeArFill,
  BsFillUnlockFill,
  BsTrashFill,
  BsTools,
  BsCardHeading,
  BsClipboardCheck,
} from "react-icons/bs";
import { db, auth } from "../../firebase-config";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import Img from "../../image1.jpg";
const AdminPosts = () => {
  const [posts, setposts] = useState([]);
  const postsCollectionRefrance = collection(db, "posts");

  const getposts = async () => {
    const postsData = await getDocs(postsCollectionRefrance);
    setposts(postsData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    getposts();
  }, []);
  const deleteposrs = async (i) => {
    const postsdoc = doc(db, "posts", posts[i].id);
    await deleteDoc(postsdoc);
    getposts();
  };
  const [query, setQuery] = useState("");

  return (
    <>
      <div className="container-fluid bg-dark text-light ">
        <h2 className="py-3 ">Posts</h2>

        <div className="row text-light ">
          <div className="col-8  text-light ">
            <div className="input-group mx-auto w-75 text-light ">
              <input
                className="form-control bg-dark text-light"
                type="text"
                name="Search"
                placeholder="Search"
                autocomplete="off"
                onChange={(event) => setQuery(event.target.value)}
              />{" "}
              <span className="input-group-prepend input-group-text btn-danger active btn ">
                search <BsFillFunnelFill />
              </span>
            </div>
            <div className="row flex-nowrap g-0 text-light">
              <div className=" admincard  text-light ">
                <table className="table table-bordered text-light">
                  <thead>
                    <tr>
                      <th>post photo</th>
                      <th className="max-width">post ownar</th>
                      <th className="sortable">post contant</th>
                      <th> post ID</th>
                      <th>created at</th>
                      <th>option</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts
                      .filter((post) => {
                        if (query === "") {
                          return post;
                        } else if (
                          post.PostText.toLowerCase().includes(
                            query.toLowerCase()
                          )
                        ) {
                          return post;
                        }
                      })
                      .map((post, i) => (
                        <tr key={post.id}>
                          <td className="align-middle text-center">
                            <div
                              className="bg-light d-inline-flex justify-content-center align-items-center align-top"
                              style={{
                                width: " 35px",
                                height: "35px",
                                "border-radius": " 3px",
                              }}
                            >
                              <img
                                style={{
                                  width: " 35px",
                                  height: "35px",
                                  "border-radius": " 3px",
                                }}
                                src={post.media}
                                alt=""
                              />
                            </div>
                          </td>
                          <td className="text-nowrap align-middle">
                            {post.postOwnername}
                          </td>
                          <td className=" align-middle  text-nowrap">
                            <div
                              style={{
                                width: "250px",
                                overflow: "auto",
                              }}
                            >
                              <p className="  text-light ">{post.PostText} </p>
                            </div>
                          </td>

                          <td className="text-center align-middle">
                            <sapn>{post.id}</sapn>
                          </td>
                          <td className="text-center align-middle">
                            <sapn>
                              {post.createdAt.toDate().toDateString()}
                            </sapn>
                          </td>

                          <td className="text-center align-middle">
                            <div className="btn-group align-top">
                              <button
                                className="btn btn-sm btn-outline-danger "
                                type="button"
                                data-toggle="modal"
                                data-target="#user-form-modal"
                              >
                                <BsTools />
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger "
                                type="button"
                              >
                                <BsTrashFill
                                  onClick={async () => {
                                    await deleteposrs(i);
                                  }}
                                />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                    {/* {posts.map((post, i) => (
                    
                    ))}  */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className=" add-user  col-3 ">
            {" "}
            <div className=" mx-auto ">
              <form className="login text-center mx-auto ">
                {/*  */}
                <div className="img_container mx-auto">
                  <img
                    className=" w-100 TrackAdminImg mx-auto  "
                    src={Img}
                    alt="avatar"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    id="photo"
                    id="actual-btn"
                  />
                  <button className="btn btn-danger mx-2 " for="actual-btn">
                    <BsFillCameraFill />
                    Add Photo
                  </button>
                </div>

                {/*  */}
                <hr className="login-hr" />
                <div className="input-group">
                  <span className="input-group-prepend input-group-text btn-danger active ">
                    <BsFillBadgeArFill />
                  </span>
                  <input
                    className="form-control bg-dark text-light"
                    type="text"
                    name="name"
                    placeholder="Track Name"
                  />
                </div>
                <div className="input-group">
                  <span className="input-group-prepend input-group-text btn-danger active ">
                    <BsClipboardCheck />
                  </span>
                  <input
                    className="form-control bg-dark text-light"
                    type="text"
                    name="id"
                    placeholder="track id"
                  />
                </div>
                <div className="input-group">
                  <span className="input-group-prepend input-group-text btn-danger active">
                    <BsCardHeading />
                  </span>
                  <textarea
                    className="form-control bg-dark text-light py-5"
                    type="text "
                    name="des"
                    placeholder="track description"
                    autocomplete="off"
                  ></textarea>
                </div>

                <button className=" btn btn-danger ">Add</button>
              </form>
            </div>
          </div>
        </div>
        <div className="row ">
          <ul class="pagination pagination-sm mx-auto justify-content-center bg-dark">
            <li class="page-item  ">
              <Link class="page-link bg-danger text-light" to="/AdminUsers">
                Users{" "}
              </Link>
            </li>
            <li class="page-item ">
              <Link
                class="page-link bg-danger text-light"
                to="/AdminTracks"
                tabindex="-1"
              >
                Track{" "}
              </Link>
            </li>
            <li class="page-item">
              <Link
                class="page-link bg-danger text-light disabled "
                to="/AdminPosts"
                tabindex="-1"
              >
                Posts{" "}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default AdminPosts;
