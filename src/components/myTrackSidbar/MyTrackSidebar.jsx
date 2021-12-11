import styles from "./sidebar.module.css";
import { BsFillChatTextFill, BsChatFill } from "react-icons/bs";
import { RiChat1Fill } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";

import { Link, useHistory } from "react-router-dom";
import { db, auth } from "../../firebase-config";
import { collection, query, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Img from "../../image1.jpg";

export const MyTrackSidebar = () => {
  const [users, setUsers] = useState([]);
  const user1 = auth.currentUser.uid;
  const [msgs, setMsgs] = useState([]);
  const [chat, setChat] = useState("");
  const [Query, setQuery] = useState("");
  const [newIndex, setnewIndex] = useState("");

  useEffect(() => {
    const usersRef = collection(db, "users");
    const q = query(usersRef);
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });

    return () => unsub();
  }, []);
  const history = useHistory();
  function nav(Uid) {
    users.filter((user, i) => {
      if (Uid === user.uid) {
        localStorage.setItem("index", i);

        setnewIndex(i);
        history.push({
          pathname: "/UserProfile",
        });
      }
    });
  }
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarWrapper}>
        <div className="text-center bg-light rounded shadow-sm ">
          {/* <p>{seconds}</p> */}
          <h5 className="py-3  ">
            “First, solve the problem. Then, write the code.”
          </h5>
        </div>

        <div className="text-center">
          <FaUserFriends className="text-center fs-2 text-danger  " />
          <h2 className="text-center fs-2 ">Front End Friends</h2>
        </div>
        <hr className={styles.sidebarHr} />
        <input
          className="form-control  border-0 mb-3  border-bottom text-dark"
          type="text"
          name="Search"
          placeholder="Search"
          onChange={(event) => setQuery(event.target.value)}
        />

        {users
          .filter((userz, i) => {
            if (
              userz.track?.toLowerCase().includes("frontend") &&
              userz.uid !== auth.currentUser?.uid
            ) {
              return userz;
            }
          })
          .filter((user, i) => {
            if (Query === "") {
              return user;
            } else if (user?.name.toLowerCase().includes(Query.toLowerCase())) {
              return user;
            }
          })
          .map((user, i) => (
            <div key={user.uid} className={styles.user_wrapper}>
              <div className="">
                <div className="d-flex justify-content-between align-items-center w-100">
                  <div className="d-flex justify-content-center align-items-center">
                    <img
                      src={user.avatar || Img}
                      alt="tarek"
                      className={styles.avatar}
                    />
                    <h6
                      className="mb-0"
                      onClick={() => {
                        nav(user.uid);
                      }}
                    >
                      {user?.name}
                    </h6>
                  </div>
                  <div
                    className={`${styles.user_status} ${
                      user.isOnline ? "bg-success" : "bg-success opacity-25"
                    }`}
                  ></div>
                </div>

                <div
                  className={`sm_container ${
                    chat?.name === user?.name && "selected_user"
                  }`}
                >
                  <img
                    src={user.avatar || Img}
                    alt="avatar"
                    className="avatar sm_screen"
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default MyTrackSidebar;
