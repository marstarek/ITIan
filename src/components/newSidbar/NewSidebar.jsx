import styles from "./sidebar.module.css";
import { BsFillChatDotsFill } from "react-icons/bs";
import { Link, useHistory } from "react-router-dom";
import { db, auth } from "../../firebase-config";
import { collection, query, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Img from "../../image1.jpg";

export const NewSidebar = () => {
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
        setnewIndex(i);
        history.push({
          pathname: "/UserProfile",
          params: i,
        });
        console.log(i);
      }
    });
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarWrapper}>
        <ul className={styles.sidebarList}>
          <li className={styles.sidebarListItem}>
            <BsFillChatDotsFill className={styles.sidebarIcon} />
            <span className={styles.sidebarListItemText}>
              <Link
                className={`${styles.sidebarButton} text-dark`}
                to="/MessagesPage"
              >
                Open Yuor Chats
              </Link>
            </span>
          </li>
        </ul>
        <h5 className="text-center">Friends</h5>
        <hr className={styles.sidebarHr} />
        <input
          className="form-control bg-dark text-light"
          type="text"
          name="Search"
          placeholder="Search"
          onChange={(event) => setQuery(event.target.value)}
        />{" "}
        {users
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
export default NewSidebar;
