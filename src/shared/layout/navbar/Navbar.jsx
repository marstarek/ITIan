import { Link } from "react-router-dom";
import "./navbar.css";
import { auth, db } from "../../../firebase-config";
import { signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { useHistory } from "react-router-dom";
import Img from "../../../image1.jpg";
import { BsFillPersonFill, BsBoxArrowRight, BsServer } from "react-icons/bs";
const Navbar = () => {
  const history = useHistory();
  const handleSignout = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
    history.replace("/login");
  };
  const [curUser, setcurUser] = useState();
  useEffect(() => {
    auth?.currentUser &&
      getDoc(doc(db, "users", auth.currentUser?.uid)).then((docSnap) => {
        if (docSnap.exists()) {
          setcurUser(docSnap.data());
        }
      });
  }, []);

  return (
    <>
      <nav className="navBar navbar navbar-expand-lg navbar-dark sticky-top  ">
        <div className="container-fluid">
          <h5 className="text-light">ITI Community</h5>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse  justify-content-center  "
            id="navbarNavAltMarkup"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link " to="/">
                  Home
                </Link>
              </li>
              {curUser?.track !== "applicant" ? (
                <li className="nav-item">
                  <Link className="nav-link " to="/MyTrackPage">
                    Front End
                  </Link>
                </li>
              ) : null}
              <li className="nav-item">
                <Link className="nav-link " to="/about">
                  Tracks
                </Link>
              </li>
              {curUser?.track !== "applicant" ? (
                <li className="nav-item">
                  <Link className="nav-link " to="/Jobs">
                    Jobs
                  </Link>
                </li>
              ) : null}
              {curUser?.rule === "admin" ? (
                <li>
                  <Link className="nav-link  " to="/AdminLogin">
                    AdminHome
                  </Link>
                </li>
              ) : null}
              <li>
                <Link className="nav-link " onClick={handleSignout}>
                  <BsBoxArrowRight className=" fs-4 my-auto" />
                  Sign Out
                </Link>
              </li>
            </ul>
          </div>
          <div>
            {curUser ? (
              <>
                <div className="profile">
                  <Link
                    className="text-light fs-5 text-capitalize"
                    to="/Profile"
                  >
                    {curUser.name}
                  </Link>
                  <img
                    src={curUser.avatar || Img}
                    alt=""
                    className="topbarImg"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="spinner-border fs-2 text-light" role="status">
                  <span className="sr-only text-dark"></span>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
