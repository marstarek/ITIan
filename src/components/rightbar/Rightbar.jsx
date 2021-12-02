import "./rightbar.css";
import { BsFillBookFill, BsChatFill, BsNewspaper } from "react-icons/bs";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import News from "../news/News";
// sidebare
import { RiChat1Fill } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import { db, auth } from "../../firebase-config";
import { collection, getDocs, query, onSnapshot } from "firebase/firestore";
import Img from "../../image1.jpg";
export const RightBar = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    getNews();
  }, []);
  const newsRefrance = collection(db, "news");
  const getNews = async () => {
    const newsData = await getDocs(newsRefrance);
    setNews(newsData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  // sidebare
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
    <div className="rightbar">
      <div className="rightbarWrapper">
        <h6 className="my-2 opacity-50 text-center ">people you may know </h6>
        <Carousel className="mb-5 ">
          {users
            .filter((user, i) => {
              if (
                !user.follow?.includes(auth.currentUser.uid) &&
                user.uid !== auth.currentUser.uid
              ) {
                return user;
              }
            })
            .map((user, i) => (
              <Carousel.Item>
                <Card
                  onClick={() => {
                    nav(user.uid);
                  }}
                  style={{ width: "10rem", padding: "0.5rem" }}
                  className="mx-auto mb-3 userCard"
                >
                  <div className="cardo ">
                    <Card.Img
                      variant="top"
                      src={user.avatar || Img}
                      className="cardimg d-block  img-fluid"
                    />
                  </div>

                  <Card.Body style={{ height: "5rem" }}>
                    <Card.Title>{user?.name}</Card.Title>
                    <Card.Text className="mt-1">Some quick example</Card.Text>
                  </Card.Body>
                </Card>
              </Carousel.Item>
            ))}
        </Carousel>

        {/* sidebare */}
        <input
          className="  form-control  border-0 mb-3  border-bottom text-dark"
          type="text"
          name="Search"
          placeholder="look for new friends ...."
          autoComplete="off"
          onChange={(event) => setQuery(event.target.value)}
        />

        {users
          .filter((user, i) => {
            if (Query === "") {
              return null;
            } else if (user?.name.toLowerCase().includes(Query.toLowerCase())) {
              return user;
            }
          })
          .map((user, i) => (
            <div key={user.uid} className="user_wrapper">
              <div className="">
                <div className="d-flex justify-content-between align-items-center w-100">
                  <div className="d-flex justify-content-center align-items-center">
                    <img
                      src={user.avatar || Img}
                      alt="tarek"
                      className="avatar"
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
                    className={`"user_status" ${
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

        <div className="rightbarContainer justify-content-center">
          <h3 className="subhead">
            <BsFillBookFill className="fs-3 mb-1" /> ITI News
          </h3>
        </div>

        <hr className="w-50 text-center  mx-auto shadow " />
        <ul className="rightbarNewsList">
          {news.map((newsPost, i) => (
            <News key={i} news={newsPost} />
          ))}
        </ul>
      </div>
    </div>
  );
};
export default RightBar;
