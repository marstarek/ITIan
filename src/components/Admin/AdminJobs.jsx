import React, { useEffect, useState } from "react";
import {
  BsFillFunnelFill,
  BsFillBadgeArFill,
  BsTrashFill,
  BsTools,
  BsCardHeading,
  BsClipboardCheck,
} from "react-icons/bs";
import { db } from "../../firebase-config";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
const AdminJobs = () => {
  const [jobs, setJobs] = useState();
  const [query, setQuery] = useState("");
  const jobsCollectionRefrance = collection(db, "jobs");
  const getJob = async () => {
    const usersData = await getDocs(jobsCollectionRefrance);
    setJobs(usersData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    getJob();
  }, []);
  const deleteJob = async (i) => {
    const jobDoc = doc(db, "jobs", jobs[i].id);
    await deleteDoc(jobDoc);
    getJob();
  };

  return (
    <>
      <div className="container-fluid bg-dark text-light ">
        <h2 className="py-3 ">Jobs</h2>

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
                      <th>job Title</th>
                      <th className="max-width">job ownar</th>
                      <th className="sortable">description</th>
                      <th> Job ID</th>
                      <th>Job location</th>
                      <th>option</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs
                      ?.filter((job, i) => {
                        if (query === "") {
                          return job;
                        } else if (
                          job.jobTitle
                            .toLowerCase()
                            .includes(query.toLowerCase())
                        ) {
                          return job;
                        }
                      })
                      .map((job, i) => (
                        <tr key={job.id}>
                          <td className="align-middle text-center">
                            {job.jobTitle}
                          </td>
                          <td className="text-nowrap align-middle">
                            {job.postOwner}
                          </td>
                          <td className=" align-middle  text-nowrap">
                            <div
                              style={{
                                width: "250px",
                                overflow: "auto",
                              }}
                            >
                              <p className="  text-light ">
                                {job.description}{" "}
                              </p>
                            </div>
                          </td>

                          <td className="text-center align-middle">
                            <span>{job.id}</span>
                          </td>
                          <td className="text-center align-middle">
                            <span>{job?.location}</span>
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
                                    await deleteJob(i);
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
                <div className="input-group">
                  <span className="input-group-prepend input-group-text btn-danger active ">
                    <BsFillBadgeArFill />
                  </span>
                  <input
                    className="form-control bg-dark text-light"
                    type="text"
                    name="name"
                    placeholder="Job tittle"
                  />
                </div>
                <div className="input-group">
                  <span className="input-group-prepend input-group-text btn-danger active ">
                    <BsClipboardCheck />
                  </span>
                  <input
                    className="form-control bg-dark text-light"
                    type="text"
                    name="job ownar"
                    placeholder="job ownar"
                  />
                </div>
                <div className="input-group">
                  <span className="input-group-prepend input-group-text btn-danger active ">
                    <BsClipboardCheck />
                  </span>
                  <input
                    className="form-control bg-dark text-light"
                    type="text"
                    name="Job location"
                    placeholder="Job location"
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
                    placeholder="Job description"
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
            <li className="page-item ">
              <Link
                className="page-link bg-danger text-light"
                to="/AdminTracks"
                tabindex="-1"
              >
                Track{" "}
              </Link>
            </li>
            <li className="page-item">
              <Link
                className="page-link bg-danger text-light  "
                to="/AdminPosts"
                tabindex="-1"
              >
                Posts{" "}
              </Link>
            </li>
            <li className="page-item">
              <Link
                className="page-link bg-danger text-light disabled "
                to="/AdminJobs"
                tabindex="-1"
              >
                Jobs{" "}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default AdminJobs;
