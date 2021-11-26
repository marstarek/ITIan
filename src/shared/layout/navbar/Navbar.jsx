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
      <nav class="navBar navbar navbar-expand-lg navbar-dark ">
        <div class="container-fluid">
          <img className="topbarImg" src="/assets/log2.png" alt="ITI Logo" />

          <div
            class="collapse navbar-collapse  justify-content-center  "
            id="navbarNav"
          >
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link " to="/">
                  Home
                </Link>
              </li>

              <li class="nav-item">
                <Link class="nav-link " to="/MyTrackPage">
                  Front End
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link " to="/MessagesPage">
                  MessagesPage
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link " to="/about">
                  Tracks
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link " to="/Jobs">
                  Jobs
                </Link>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Options
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link class="nav-link text-danger  " to="/Profile">
                      <BsFillPersonFill class=" fs-4 " /> Profile
                    </Link>
                  </li>
                  <li>
                    <Link class="nav-link text-danger " to="/AdminLogin">
                      <BsServer class=" fs-4 my-auto" /> AdminHome
                    </Link>
                  </li>
                  <li>
                    <Link class="nav-link text-danger " onClick={handleSignout}>
                      <BsBoxArrowRight class=" fs-4 my-auto" />
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
                <div class="spinner-border fs-2 text-light" role="status">
                  <span class="sr-only"></span>
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
