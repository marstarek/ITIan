import {
  FaCommentAlt,
  FaLaptopCode,
  FaClipboardList,
  FaGraduationCap,
} from "react-icons/fa";
import { Link } from "react-router-dom";
export const AdminHome = () => {
  return (
    <>
      <div classNameName=" admin-container ">
        <div className="container text-center dashboard text-light">
          <h2>Dashboard</h2>
          <div className="content text-light">
            <div className="row justify-content-md-center">
              <div className="col-md-3">
                <div className="box p-5 mb-1 bg-secondary rounded">
                  <FaGraduationCap className="fs-3" />

                  <div className="mt-2">
                    <Link className="text-light fs-1" to="/AdminUsers">
                      Users{" "}
                    </Link>
                  </div>
                  <h3>500 user </h3>
                </div>
              </div>
              <div className="col-md-3">
                <div className="box p-5 mb-1 bg-danger rounded">
                  <FaLaptopCode className="fs-3" />
                  <div className="mt-2">
                    <Link className="text-light fs-1" to="/AdminTracks">
                      Tracks{" "}
                    </Link>
                  </div>
                  <h3> 43 Track </h3>
                </div>
              </div>
              <div className="col-md-3">
                <div className="box p-5 mb-1 bg-dark rounded">
                  <FaCommentAlt className="fs-4" />
                  <div className="mt-2">
                    <Link className="text-light fs-1" to="/AdminPosts">
                      Posts{" "}
                    </Link>
                  </div>
                  <h3>700 Post</h3>
                </div>
              </div>
              <div className="col-md-3">
                <div className="box p-5 mb-1 bg-info rounded">
                  <FaClipboardList className="fs-4" />
                  <div className="mt-2">
                    <Link className="text-light fs-1" to="/AdminJobs">
                      Jobs{" "}
                    </Link>
                  </div>
                  <h3>Jobs </h3>
                </div>
              </div>
            </div>
            <div>
              <img src="assets/chart.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminHome;
