import styles from "./sidebar.module.css";
import {
  BsFillAwardFill,
  BsFillArrowDownCircleFill,
  BsFillArchiveFill,
  BsFillBagPlusFill,
  BsFillBookmarkCheckFill,
  BsFillCalendarPlusFill,
  BsFillChatDotsFill,
} from "react-icons/bs";
import { Users } from "../../dummyData";
import { Link, useHistory } from "react-router-dom";

import Online from "../online/Online";
import { db, auth, storage } from "../../firebase-config";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  QuerySnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import Img from "../../image1.jpg";

export const NewSidebar = () => {
  const [users, setUsers] = useState([]);
  const user1 = auth.currentUser.uid;
  const [msgs, setMsgs] = useState([]);
  const [chat, setChat] = useState("");

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
  function nav(i) {
    history.push({
      pathname: "/UserProfile",
      params: i,
    });
  }
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarWrapper}>
        <ul className={styles.sidebarList}>
          <li className={styles.sidebarListItem}>
            <BsFillAwardFill className={styles.sidebarIcon} />
            <span className={styles.sidebarListItemText}>Chats</span>
          </li>
          <li className={styles.sidebarListItem}>
            <BsFillArrowDownCircleFill className={styles.sidebarIcon} />
            <span className={styles.sidebarListItemText}>Tracks</span>
          </li>
          <li className={styles.sidebarListItem}>
            <BsFillArchiveFill className={styles.sidebarIcon} />
            <span className={styles.sidebarListItemText}>About ITI</span>
          </li>
          <li className={styles.sidebarListItem}>
            <BsFillBagPlusFill className={styles.sidebarIcon} />
            <span className={styles.sidebarListItemText}>Questions</span>
          </li>
          <li className={styles.sidebarListItem}>
            <BsFillBookmarkCheckFill className={styles.sidebarIcon} />
            <span className={styles.sidebarListItemText}>Jobs</span>
          </li>
          <li className={styles.sidebarListItem}>
            <BsFillCalendarPlusFill className={styles.sidebarIcon} />
            <span className={styles.sidebarListItemText}>Events</span>
          </li>
          <li className={styles.sidebarListItem}>
            <BsFillChatDotsFill className={styles.sidebarIcon} />
            <span className={styles.sidebarListItemText}> Programs </span>
          </li>
        </ul>
        <button className={`${styles.sidebarButton} text-danger`}>
          <Link
            className={`${styles.sidebarButton} text-danger`}
            to="/MessagesPage"
          >
            Open Chat
          </Link>
        </button>
        <hr className={styles.sidebarHr} />
        {users.map((user, i) => (
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
                      nav(i);
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
                // onClick={() => selectUser(user)}
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
export default NewSidebar;
