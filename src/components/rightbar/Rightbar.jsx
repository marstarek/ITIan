import "./rightbar.css";
import { db } from "../../firebase-config";
import { BsFillBookFill, BsChatFill, BsNewspaper } from "react-icons/bs";

import { useState, useEffect } from "react";

import News from "../news/News";
import { collection, getDocs } from "firebase/firestore";
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
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <div className="rightbarContainer justify-content-center">
          <h2 className="subhead">
            <BsFillBookFill className="fs-2 mb-1" /> ITI News
          </h2>
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
