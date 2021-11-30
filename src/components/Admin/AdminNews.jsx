import React, { useEffect, useState } from "react";
import {
  BsFillFunnelFill,
  BsTrashFill,
  BsCardImage,
  BsCardHeading,
} from "react-icons/bs";
import { db, auth, storage } from "../../firebase-config";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import Navbar from "../../shared/layout/navbar/Navbar";

import { Link } from "react-router-dom";

const AdminNews = () => {
  const [img, setImg] = useState();
  const [news, setnews] = useState([]);

  const [newsText, setNewsText] = useState("");
  const newsCollectionRefrance = collection(db, "news");
  const [eventDate, setEventDate] = useState([]);
  const [curUser, setcurUser] = useState();
  const [error, setError] = useState();
  /* ------------------------------------handleSubmit-------------------------------------- */
  useEffect(() => {
    auth?.currentUser &&
      getDoc(doc(db, "users", auth.currentUser?.uid)).then((docSnap) => {
        if (docSnap.exists()) {
          setcurUser(docSnap.data());
        }
      });
    getNews();
  }, []);

  const postNews = async (e) => {
    setError("");
    if ((newsText && newsText?.trim()) || img) {
      const id = `${curUser.uid}${new Date().getTime()}`;
      let url;
      if (img) {
        const imgRef = ref(
          storage,
          `newsimages/${new Date().getTime()} - ${img.name}`
        );
        const snap = await uploadBytes(imgRef, img);
        const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
        url = dlUrl;
      }

      await addDoc(collection(db, "news"), {
        newsText,
        from: "admin",
        createdAt: Timestamp.fromDate(new Date()),
        media: url || "",
        eventDate: eventDate || "",
        ownerImg: curUser.avatar,
        postOwnername: curUser.name,
      });
      const docSnap = await getDoc(doc(db, "news", id));

      setNewsText("");
      setEventDate("");
    } else {
      setError("empty post please write something");
    }
    setImg("");
    getNews();
  };

  const getNews = async () => {
    const newsData = await getDocs(newsCollectionRefrance);
    setnews(newsData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteposrs = async (i) => {
    try {
      const newsdoc = doc(db, "news", news[i].id);
      await deleteDoc(newsdoc);
      getNews();
    } catch (err) {
      alert(err);
    }
  };
  const [query, setQuery] = useState("");

  return (
    <>
      <Navbar />
      <div className="container-fluid bg-dark text-light ">
        <h2 className="py-3 ">News</h2>

        <div className="row text-light ">
          <div className="col-8  text-light ">
            <div className="input-group mx-auto w-75 text-light ">
              <input
                className="form-control bg-dark text-light"
                type="text"
                name="Search"
                placeholder="Search"
                onChange={(event) => setQuery(event.target.value)}
              />{" "}
              <span className="input-group-prepend input-group-text btn-danger active btn ">
                search <BsFillFunnelFill />
              </span>
            </div>
            <div className="row flex-nowrap g-0 text-light">
              <div className=" admincard  text-light ">
                <table className="table table-bordered text-light">
                  <thead>
                    <tr>
                      <th>post photo</th>
                      <th className="max-width">post ownar</th>
                      <th className="sortable">post contant</th>
                      <th> post ID</th>
                      <th>created at</th>
                      <th>option</th>
                    </tr>
                  </thead>
                  <tbody>
                    {news
                      .filter((newss) => {
                        if (query === "") {
                          return newss;
                        } else if (
                          newss.newsText
                            .toLowerCase()
                            .includes(query.toLowerCase())
                        ) {
                          return newss;
                        }
                      })
                      .map((newss, i) => (
                        <tr key={i}>
                          <td className="align-middle text-center">
                            <div
                              className="bg-light d-inline-flex justify-content-center align-items-center align-top"
                              style={{
                                width: " 35px",
                                height: "35px",
                                "border-radius": " 3px",
                              }}
                            >
                              <img
                                style={{
                                  width: " 35px",
                                  height: "35px",
                                  "border-radius": " 3px",
                                }}
                                src={newss.media}
                                alt=""
                              />
                            </div>
                          </td>
                          <td className="text-nowrap align-middle">
                            {newss.postOwnername}
                          </td>
                          <td className=" align-middle  text-nowrap">
                            <div
                              style={{
                                width: "250px",
                                overflow: "auto",
                              }}
                            >
                              <p className="  text-light ">{newss.newsText} </p>
                            </div>
                          </td>

                          <td className="text-center align-middle">
                            <span>{newss.id}</span>
                          </td>
                          <td className="text-center align-middle">
                            <span>
                              {newss.createdAt.toDate().toDateString()}
                            </span>
                          </td>
                          <td className="text-center align-middle">
                            <div className="btn-group align-top">
                              <button
                                className="btn btn-sm btn-outline-danger "
                                type="button"
                              >
                                <BsTrashFill
                                  onClick={async () => {
                                    await deleteposrs(i);
                                  }}
                                />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className=" add-user  col-3 ">
            {" "}
            <div className=" mx-auto ">
              <div className="login text-center mx-auto ">
                {/*  */}
                <div className="img_container mx-auto">
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    id="photo"
                    id="actual-btn"
                  />{" "}
                  {error && (
                    <div className="bg-danger rounded p-1 m-3">{error}</div>
                  )}
                </div>

                {/*  */}
                <hr className="login-hr" />
                <div className="input-group">
                  <span className="input-group-prepend input-group-text btn-danger active">
                    <BsCardHeading />
                  </span>
                  <input
                    className="form-control bg-dark text-light "
                    type="date"
                    name="date"
                    value={eventDate}
                    required
                    onChange={(e) => setEventDate(e.target.value)}
                    placeholder="event date"
                  ></input>
                </div>

                <div className="input-group">
                  <span className="input-group-prepend input-group-text btn-danger active">
                    <BsCardHeading />
                  </span>
                  <input
                    className="form-control bg-dark text-light py-5"
                    type="text "
                    name="des"
                    value={newsText}
                    required
                    onChange={(e) => setNewsText(e.target.value)}
                    placeholder="what is on your mind"
                  ></input>
                </div>
                <div className="shareOption mx-1 col-4 g-0 ">
                  <span className="shareOptionText"> Photo </span>
                  <label htmlFor="img">
                    <BsCardImage className="shareIcon text-danger" />
                  </label>
                  <input
                    onChange={(e) => setImg(e.target.files[0])}
                    type="file"
                    id="img"
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                </div>
                <button
                  className=" btn btn-danger "
                  onClick={(e) => postNews(e.target.value)}
                >
                  Add Post
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row ">
          <ul className="pagination pagination-sm mx-auto justify-content-center bg-dark">
            <li className="page-item  ">
              <Link className="page-link bg-danger text-light" to="/AdminUsers">
                Users
              </Link>
            </li>
            <li className="page-item ">
              <Link
                className="page-link bg-danger text-light"
                to="/AdminTracks"
                tabIndex="-1"
              >
                Track
              </Link>
            </li>
            <li className="page-item">
              <Link
                className="page-link bg-danger text-light disabled "
                to="/AdminPosts"
                tabIndex="-1"
              >
                news
              </Link>
            </li>
            <li className="page-item">
              <Link
                className="page-link bg-danger text-light  "
                to="/AdminJobs"
                tabIndex="-1"
              >
                Posts
              </Link>
            </li>
            <li className="page-item">
              <Link
                className="page-link bg-danger text-light  "
                to="/AdminJobs"
                tabIndex="-1"
              >
                Jobs
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default AdminNews;
