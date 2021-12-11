import "./userprofile.css";
import Navbar from "../../shared/layout/navbar/Navbar";
import Img from "../../image1.jpg";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { storage, db, auth } from "../../firebase-config";
import NewSidebar from "../newSidbar/NewSidebar";
import { BsTrashFill } from "react-icons/bs";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
const UserProfile = (paramz, { user1, selectUser, chat }) => {
  const [img, setImg] = useState("");
  const [user, setUser] = useState();
  let [refresh, setrefresh] = useState(false);
  const [users, setUsers] = useState();
  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
        // console.log(user);
      }
    });
    // localStorag();
  }, []);
  /* ---------------------------------msg----------------------------------------- */

  /* -------------------------------------------------------------------------- */
  const GetUsers = () => {
    Promise.all([
      fetch(
        "https://firestore.googleapis.com/v1/projects/new-test-7e4d3/databases/(default)/documents/users"
      )
        .then((value) => value.json())
        .then((value) => setUsers(value.documents)),
    ]).catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    Promise.all([
      fetch(
        "https://firestore.googleapis.com/v1/projects/new-test-7e4d3/databases/(default)/documents/users"
      )
        .then((value) => value.json())
        .then((value) => setUsers(value.documents)),
    ]).catch((err) => {
      console.log(err);
    });
    // getFollowersNum();
  }, []);

  const [userindex, setuserindex] = useState();
  const GetUserIndex = () => {
    setuserindex(localStorage.getItem("index"));
  };
  const [curUser, setcurUser] = useState();
  /* -------------------------------------useEffect------------------------------------- */
  useEffect(() => {
    GetUserIndex();
    auth?.currentUser &&
      getDoc(doc(db, "users", auth.currentUser?.uid)).then((docSnap) => {
        if (docSnap.exists()) {
          setcurUser(docSnap.data());
        }
      });
  }, []);
  const [followToggle, setfollowToggle] = useState();
  const follow = async () => {
    if (
      !users[userindex]?.fields?.follow?.stringValue?.includes(
        auth.currentUser.uid
      )
    ) {
      await updateDoc(
        doc(db, "users", users[userindex].fields.uid.stringValue),
        {
          follow:
            users[userindex]?.fields?.follow?.stringValue +
            "," +
            auth.currentUser.uid,
        }
      );
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        following:
          curUser.following + "," + users[userindex]?.fields?.uid?.stringValue,
      });
      setfollowToggle("unFollow");
    } else {
      let splitedfollow =
        users[userindex]?.fields?.follow?.stringValue.split(",");
      let splitedfollowing = curUser.following?.split(",");

      splitedfollow.splice(
        users[userindex]?.fields?.follow?.stringValue
          .split(",")
          .indexOf(auth.currentUser.uid),
        1
      );
      splitedfollowing.splice(
        curUser.following
          ?.split(",")
          .indexOf(users[userindex]?.fields?.uid?.stringValue),
        1
      );
      await updateDoc(
        doc(db, "users", users[userindex].fields.uid.stringValue),
        {
          follow: splitedfollow.join(),
        }
      );
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        following: splitedfollowing.join(),
      });
      setfollowToggle("Follow");
    }
    GetUsers();
  };
  return user && users ? (
    <>
      <Navbar />
      <div class="main-content">
        <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center pb-5 ">
          <div class="container-fluid d-flex align-items-center justify-content-center">
            <div class="row firstsec">
              <div class="col-7 ">
                <h2 class="  text-white text-lg-start text-capitalize">
                  {users[userindex]?.fields.name.stringValue}
                </h2>
                <h4 class="text-white  text-capitalize  ">
                  {users[userindex]?.fields.track.stringValue}
                </h4>

                <ul className="text-left text-white mt-0 mb-5 py-1 lh-2">
                  {users[userindex]?.fields?.CONTACTS?.stringValue
                    .split(",")
                    .map((C, i) => {
                      return (
                        <li className=" py-1  " key={i}>
                          {C}
                        </li>
                      );
                    })}
                </ul>
                <div className="follow-counter d-flex ">
                  {users?.[userindex]?.fields?.follow?.stringValue.includes(
                    "undefined"
                  ) ||
                  users?.[userindex]?.fields?.follow?.stringValue.includes(
                    ""
                  ) ? (
                    <h6 className="text-light me-2">
                      followers:{" "}
                      {users[userindex]?.fields?.follow?.stringValue.split(",")
                        .length - 1}
                    </h6>
                  ) : (
                    <h6 className="text-light me-2">
                      followers:{" "}
                      {
                        users[userindex]?.fields?.follow?.stringValue.split(",")
                          .length
                      }
                    </h6>
                  )}
                  {/* following */}
                  {users?.[userindex]?.fields?.following?.stringValue.includes(
                    "undefined"
                  ) ||
                  users?.[userindex]?.fields?.following?.stringValue.includes(
                    ""
                  ) ? (
                    <h6 className="text-light ms-2">
                      following:
                      {users[userindex]?.fields?.following?.stringValue.split(
                        ","
                      ).length - 1}
                    </h6>
                  ) : (
                    <h6 className="text-light ms-2">
                      following:
                      {
                        users[userindex]?.fields?.following?.stringValue.split(
                          ","
                        ).length
                      }
                    </h6>
                  )}
                </div>
              </div>
              <div class="card-profile-image col-4 d-flex ">
                <figure className="d-flex">
                  <img
                    src={users[userindex].fields.avatar.stringValue || Img}
                    class="   user-profile-img "
                    alt="userprofile "
                  />
                </figure>
                <button
                  className="button w-50 rounded px-3 mt-2 d-block my-1 mx-auto"
                  onClick={follow}
                >
                  {followToggle ? (
                    <span> {followToggle}</span>
                  ) : (
                    <>
                      {" "}
                      {users[userindex]?.fields.follow?.stringValue.includes(
                        auth.currentUser.uid
                      ) ? (
                        <span>unFollow</span>
                      ) : (
                        <span>Follow</span>
                      )}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="       ">
          <div className=" container py-5  text-center mx-auto    row">
            <div className="col-7 align-bottom px-5">
              <button class="button-51 mb-4" role="button">
                <h2 class="   text-white text-lg-start text-capitalize">
                  {" "}
                  EXPERIANCES
                </h2>
              </button>
              <div className="userprofilecard p-2">
                <ul className="text-center p-2  ">
                  {users[userindex].fields?.EXPERIANCES?.stringValue
                    .split(",")
                    .map((E, i) => {
                      return <li key={i}>{E}</li>;
                    })}
                </ul>
              </div>
            </div>
            <div className="col-5">
              <button class="button-51 mb-4" role="button">
                <h2 class="   text-white text-lg-start text-capitalize">
                  {" "}
                  Skills
                </h2>
              </button>
              <div className="userprofilecard p-2">
                <>
                  <ul className="text-center p-2">
                    {users[userindex]?.fields?.SKILLS?.stringValue
                      .split(",")
                      .map((s, i) => {
                        return <li key={i}>{s}</li>;
                      })}
                  </ul>
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
};
export default UserProfile;
