import React, { useEffect, useState } from "react";
import {
  BsFillFunnelFill,
  BsFillPersonFill,
  BsFillCameraFill,
  BsFillBadgeArFill,
  BsFillUnlockFill,
  BsTrashFill,
  BsTools,
} from "react-icons/bs";
import { db } from "../../firebase-config";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

import Img from "../../image1.jpg";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const usersCollectionRefrance = collection(db, "users");

  const getUsers = async () => {
    const usersData = await getDocs(usersCollectionRefrance);
    setUsers(usersData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    getUsers();
  }, []);
  console.log(users[0]);
  const deleteuser = async (i) => {
    const commentDoc = doc(db, "users", users[i].uid);
    await deleteDoc(commentDoc);
    getUsers();
  };
  return (
    <>
      <div className="container-fluid bg-dark text-light ">
        <h2 className="py-3 ">Users</h2>

        <div className="row text-light ">
          <div className="col-8  text-light ">
            <div className="input-group mx-auto w-75 text-light ">
              <input
                className="form-control bg-dark text-light"
                type="text"
                name="Search"
                placeholder="Search"
                autocomplete="off"
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
                      <th>Photo</th>
                      <th className="max-width">Name</th>
                      <th className="sortable">Date</th>
                      <th> ID</th>
                      <th>option</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, i) => (
                      <tr key={i}>
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
                              src={user.avatar}
                              alt=""
                            />
                          </div>
                        </td>
                        <td className="text-nowrap align-middle">
                          {user.name}
                        </td>
                        <td className="text-nowrap align-middle">
                          <span>{user.email}</span>
                        </td>

                        <td className="text-center align-middle">
                          <sapn>{user.uid}</sapn>
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
                                onClick={() => {
                                  deleteuser(i);
                                }}
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
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
                    className="profile-img mx-auto  "
                    src={Img}
                    alt="avatar"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    id="photo"
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
                    placeholder="username"
                  />
                </div>
                <div className="input-group">
                  <span className="input-group-prepend input-group-text btn-danger active">
                    <BsFillPersonFill />
                  </span>
                  <input
                    className="form-control bg-dark text-light"
                    type="email"
                    name="email"
                    placeholder="Email"
                    autocomplete="off"
                  />
                </div>
                <div className="input-group">
                  <span className="input-group-prepend input-group-text btn-danger active ">
                    <BsFillUnlockFill />
                  </span>
                  <input
                    className="form-control bg-dark text-light"
                    type="text"
                    name="password"
                    placeholder="Password"
                  />
                </div>

                <button className=" btn btn-danger ">Add</button>
              </form>
            </div>
          </div>
        </div>
        <div className="row ">
          <ul class="pagination pagination-sm mx-auto justify-content-center bg-dark">
            <li class="page-item disabled bg-danger">
              <Link
                class="page-link bg-danger text-light"
                to="/AdminUsers"
                tabindex="-1"
              >
                Users{" "}
              </Link>
            </li>
            <li class="page-item">
              <Link class="page-link bg-danger text-light" to="/AdminTracks">
                Track{" "}
              </Link>
            </li>
            <li class="page-item">
              <Link
                class="page-link bg-danger text-light"
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
export default AdminUsers;
