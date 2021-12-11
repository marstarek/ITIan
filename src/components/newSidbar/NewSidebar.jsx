import styles from "./sidebar.module.css";
import { BsFillChatTextFill, BsChatFill, BsNewspaper } from "react-icons/bs";
import { RiChat1Fill } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
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
  // function nav(Uid) {
  //   users.filter((user, i) => {
  //     if (Uid === user.uid) {
  //       localStorage.setItem("index", i);

  //       setnewIndex(i);
  //       history.push({
  //         pathname: "/UserProfile",
  //       });
  //       console.log(i);
  //     }
  //   });
  // }
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
      <div className={`${styles.sidebarWrapper}  `}>
        <h2 className="text-center fs-2 ">
          {" "}
          <FaUserFriends className=" fs-2 mb-1 me-2" />
          MY Friends
        </h2>

        <input
          className="  form-control  border-0 mb-3  border-bottom text-dark"
          type="text"
          name="Search"
          placeholder="Search...."
          autoComplete="off"
          onChange={(event) => setQuery(event.target.value)}
        />

        {users
          .filter((user, i) => {
            if (user.follow?.includes(auth.currentUser.uid)) {
              return user;
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
            <div
              key={user.uid}
              className={styles.user_wrapper}
              onClick={() => {
                nav(user.uid);
              }}
            >
              <div className="">
                <div className="d-flex justify-content-between align-items-center w-100">
                  <div className="d-flex justify-content-center align-items-center">
                    <img
                      src={user.avatar || Img}
                      alt="tarek"
                      className={styles.avatar}
                    />
                    <div>
                      <h6 className="mb-0">{user?.name}</h6>
                      <p className="mb-0 ">{user?.track}</p>
                    </div>
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
