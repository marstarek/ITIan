import {
  FaCommentAlt,
  FaLaptopCode,
  FaClipboardList,
  FaGraduationCap,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
} from "recharts";
import Chart from "./chart/Chart";
import Navbar from "../../shared/layout/navbar/Navbar";

export const AdminHome = () => {
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
          <h2>Dashboard</h2>
          <div className="content text-light">
            <div className="row justify-content-md-center">
              <div className="col-md-3">
                <div className="box p-5 mb-1 bg-secondary rounded">
                  <FaGraduationCap className="fs-3" />
                  <h3 className="mt-2 h1">
                    <CountUp
                      delay={0}
                      start={0}
                      end={500}
                      duration={3}
                      useEasing
                    />
                  </h3>
                  <div className="mt-2">
                    <Link className="text-light fs-5" to="/AdminUsers">
                      Users
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="box p-5 mb-1 bg-danger rounded">
                  <FaLaptopCode className="fs-3" />
                  <h3 className="mt-2 h1">
                    <CountUp
                      delay={0}
                      start={0}
                      end={43}
                      duration={3}
                      useEasing
                    />
                  </h3>
                  <div className="mt-2">
                    <Link className="text-light fs-5" to="/AdminTracks">
                      Tracks
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="box p-5 mb-1 bg-dark rounded">
                  <FaCommentAlt className="fs-4" />
                  <h3 className="mt-2 h1">
                    <CountUp
                      delay={0}
                      start={0}
                      end={700}
                      duration={3}
                      useEasing
                    />
                  </h3>
                  <div className="mt-2">
                    <Link className="text-light fs-5" to="/AdminPosts">
                      Posts
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="box p-5 mb-1 bg-info rounded">
                  <FaClipboardList className="fs-4" />
                  <h3 className="mt-2 h1">
                    <CountUp
                      delay={0}
                      start={0}
                      end={300}
                      duration={3}
                      useEasing
                    />
                  </h3>
                  <div className="mt-2">
                    <Link className="text-light fs-5" to="/AdminJobs">
                      Posted Jobs
                    </Link>
                  </div>
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
