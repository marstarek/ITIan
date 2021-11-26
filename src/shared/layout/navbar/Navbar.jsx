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
      <nav className="navBar navbar navbar-expand-lg navbar-dark ">
        <div className="container-fluid">
          <img className="topbarImg" src="/assets/log2.png" alt="ITI Logo" />

          <div
            className="collapse navbar-collapse  justify-content-center  "
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link " to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link " to="/MyTrackPage">
                  Front End
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link " to="/about">
                  Tracks
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/Jobs">
                  Jobs
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Options
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="nav-link text-danger  " to="/Profile">
                      <BsFillPersonFill className=" fs-4 " /> Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link text-danger " to="/AdminLogin">
                      <BsServer className=" fs-4 my-auto" /> AdminHome
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="nav-link text-danger "
                      onClick={handleSignout}
                    >
                      <BsBoxArrowRight className=" fs-4 my-auto" />
                      Sign Out
                    </Link>
                  </li>
                </ul>
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
                  <span className="sr-only"></span>
                </div>
                {/* <p>...Loading</p> */}
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
