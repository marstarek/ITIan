import {
  FaUsers,
  FaFileCode,
  FaCommentAlt,
  FaNewspaper,
  FaHardHat,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import Chart from "./chart/Chart";
import Navbar from "../../shared/layout/navbar/Navbar";
import { collection, getDocs } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import Loader from "react-loader-spinner";

export const AdminHome = () => {
  const [users, setUsers] = useState();
  const [posts, setposts] = useState();
  const [news, setnews] = useState();
  const [jobs, setJobs] = useState();
  const [tracks, setTracks] = useState();
  useEffect(async () => {
    const usersCollectionRefrance = await collection(db, "users");
    const usersData = await getDocs(usersCollectionRefrance);
    setUsers(usersData.docs.length);
  });
  useEffect(async () => {
    const TracksCollectionRefrance = collection(db, "Tracks");
    const usersData = await getDocs(TracksCollectionRefrance);
    setTracks(usersData.docs.length);
  });
  useEffect(async () => {
    const postsCollectionRefrance = await collection(db, "posts");
    const postsData = await getDocs(postsCollectionRefrance);
    setposts(postsData.docs.length);
  });
  useEffect(async () => {
    const newsCollectionRefrance = collection(db, "news");
    const newsData = await getDocs(newsCollectionRefrance);
    setnews(newsData.docs.length);
  });
  useEffect(async () => {
    const jobsCollectionRefrance = collection(db, "jobs");
    const usersData = await getDocs(jobsCollectionRefrance);
    setJobs(usersData.docs.length);
  });

  const data = [
    {
      month: "Jan",
      "active users": 4000,
    },
    {
      month: "Feb",
      "active users": 3000,
    },
    {
      month: "Mar",
      "active users": 2000,
    },
    {
      month: "Apr",
      "active users": 2780,
    },
    {
      month: "May",
      "active users": 1890,
    },
    {
      month: "Jun",
      "active users": 2390,
    },
    {
      month: "Jul",
      "active users": 3490,
    },
    {
      month: "Aug",
      "active users": 4200,
    },
    {
      month: "Sep",
      "active users": 4800,
    },
    {
      month: "Oct",
      "active users": 4000,
    },
    {
      month: "Nov",
      "active users": 3000,
    },
    {
      month: "Dec",
      "active users": 5000,
    },
  ];
  return (
    <>
      <Navbar />
      <div className=" admin-container ">
        <div className="container text-center dashboard text-light">
          <h2 className="admintittle">Dashboard</h2>
          <div className="content text-light">
            <div className="row justify-content-md-center">
              <div className="col-md-2">
                <div className="box p-5 mb-1 bg-secondary rounded">
                  {users ? (
                    <>
                      <FaUsers className="fs-3" />
                      <h3 className="mt-2 h1">
                        <CountUp
                          delay={0}
                          start={0}
                          end={users}
                          duration={3}
                          useEasing
                        />
                      </h3>
                      <div className="mt-2">
                        <Link className="text-light " to="/AdminUsers">
                          Users
                        </Link>
                      </div>
                    </>
                  ) : (
                    <Loader
                      type="Oval"
                      color="#00BFFF"
                      height={50}
                      width={50}
                      timeout={3000} //3 secs
                    />
                  )}
                </div>
              </div>
              <div className="col-md-2">
                <div className="box p-5 mb-1 bg-danger rounded">
                  {tracks ? (
                    <>
                      <FaFileCode className="fs-3" />
                      <h3 className="mt-2 h1">
                        <CountUp
                          delay={0}
                          start={0}
                          end={tracks}
                          duration={3}
                          useEasing
                        />
                      </h3>
                      <div className="mt-2">
                        <Link className="text-light " to="/AdminUsers">
                          Tracks
                        </Link>
                      </div>
                    </>
                  ) : (
                    <Loader
                      type="Oval"
                      color="#00BFFF"
                      height={50}
                      width={50}
                      timeout={3000} //3 secs
                    />
                  )}
                </div>
              </div>
              <div className="col-md-2">
                <div className="box p-5 mb-1 bg-dark rounded">
                  {posts ? (
                    <>
                      <FaCommentAlt className="fs-3" />
                      <h3 className="mt-2 h1">
                        <CountUp
                          delay={0}
                          start={0}
                          end={posts}
                          duration={3}
                          useEasing
                        />
                      </h3>
                      <div className="mt-2">
                        <Link className="text-light " to="/AdminPosts">
                          Posts
                        </Link>
                      </div>
                    </>
                  ) : (
                    <Loader
                      type="Oval"
                      color="#00BFFF"
                      height={50}
                      width={50}
                      timeout={3000} //3 secs
                    />
                  )}
                </div>
              </div>
              <div className="col-md-2">
                <div className="box p-5 mb-1 bg-warning rounded">
                  {jobs ? (
                    <>
                      <FaHardHat className="fs-3" />
                      <h3 className="mt-2 h1">
                        <CountUp
                          delay={0}
                          start={0}
                          end={jobs}
                          duration={3}
                          useEasing
                        />
                      </h3>
                      <div className="mt-2">
                        <Link className="text-light " to="/AdminJobs">
                          Jobs
                        </Link>
                      </div>
                    </>
                  ) : (
                    <Loader
                      type="Oval"
                      color="#00BFFF"
                      height={50}
                      width={50}
                      timeout={3000} //3 secs
                    />
                  )}
                </div>
              </div>
              <div className="col-md-2">
                <div className="box p-5 mb-1 bg-secondary rounded">
                  {news ? (
                    <>
                      <FaNewspaper className="fs-3" />
                      <h3 className="mt-2 h1">
                        <CountUp
                          delay={0}
                          start={0}
                          end={news}
                          duration={3}
                          useEasing
                        />
                      </h3>
                      <div className="mt-2">
                        <Link className="text-light " to="/AdminNews">
                          News
                        </Link>
                      </div>
                    </>
                  ) : (
                    <Loader
                      type="Oval"
                      color="#00BFFF"
                      height={50}
                      width={50}
                      timeout={3000} //3 secs
                    />
                  )}
                </div>
              </div>
            </div>
            <div>
              <Chart
                title="User Analytics"
                data={data}
                dataKey="active users"
                grid
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminHome;
