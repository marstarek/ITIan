import { Tracks } from "../../dummyData";
import { useState } from "react";

import {
  BsFillFunnelFill,
  BsFillCameraFill,
  BsFillBadgeArFill,
  BsTrashFill,
  BsTools,
  BsCardHeading,
  BsClipboardCheck,
} from "react-icons/bs";
import Img from "../../image1.jpg";
import "./adminHome.css";
import { Link } from "react-router-dom";
import Navbar from "../../shared/layout/navbar/Navbar";

const AdminUsers = () => {
  const [query, setQuery] = useState("");
  return (
    <>
      <Navbar />
      <div className="container-fluid bg-dark text-light ">
        <h2 className="py-3 admintittle ">Tracks</h2>

        <div className="row text-light ">
          <div className="col-8  text-light ">
            <div className="input-group mx-auto w-75 text-light ">
              <input
                className="form-control bg-dark text-light"
                type="text"
                name="Search"
                placeholder="Search"
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
                      <th>Track Cover</th>
                      <th className="max-width">Track Name</th>
                      <th className="sortable">Track description</th>
                      <th> Track ID</th>
                      <th>duration</th>
                      <th>option</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Tracks.filter((track) => {
                      if (query === "") {
                        return track;
                      } else if (
                        track.trackName
                          .toLowerCase()
                          .includes(query.toLowerCase())
                      ) {
                        return track;
                      }
                    }).map((track, index) => (
                      <tr key={track.id}>
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
                              src={track.photo}
                              alt=""
                            />
                          </div>
                        </td>
                        <td className="text-nowrap align-middle">
                          {track.trackName}
                        </td>
                        <td className="text-nowrap align-middle overflow-hidden w-25 text-nowrap">
                          <div
                            style={{
                              width: "250px",
                              overflow: "auto",
                            }}
                          >
                            <p className="  text-light ">{track.desc} </p>
                          </div>
                        </td>

                        <td className="text-center align-middle">
                          <span>{track.id}</span>
                        </td>
                        <td className="text-center align-middle">
                          <span>{track.trackduration}</span>
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
                              <BsTrashFill />
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
                  <button className="btn btn-danger mx-2 " htmlFor="actual-btn">
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
                  ></textarea>
                </div>

                <button className=" btn btn-danger ">Add</button>
              </form>
            </div>
          </div>
        </div>
        <div className="row ">
          <ul className="pagination pagination-sm mx-auto justify-content-center bg-dark">
            <li className="page-item  ">
              <Link className="page-link bg-danger text-light" to="/AdminUsers">
                Users{" "}
              </Link>
            </li>
            <li className="page-item disabled">
              <Link
                className="page-link bg-danger text-light"
                to="/AdminTracks"
                tabIndex="-1"
              >
                Track{" "}
              </Link>
            </li>
            <li className="page-item">
              <Link
                className="page-link bg-danger text-light"
                to="/AdminPosts"
                tabIndex="-1"
              >
                Posts{" "}
              </Link>
            </li>
            <li className="page-item">
              <Link
                className="page-link bg-danger text-light  "
                to="/AdminJobs"
                tabIndex="-1"
              >
                Jobs{" "}
              </Link>
            </li>
            <li className="page-item">
              <Link
                className="page-link bg-danger text-light  "
                to="/AdminNews"
                tabIndex="-1"
              >
                News
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default AdminUsers;
