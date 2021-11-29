import "./rightbar.css";
import { db } from "../../firebase-config";

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
        <div className="rightbarContainer">
          <h2 className="rightbarImg">ITI News</h2>
          <img className="rightbarImg" src="assets/iti.jpg" alt="" />
        </div>
        <hr />
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
