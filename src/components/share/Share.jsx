import "./share.css";
import { FaPaperPlane } from "react-icons/fa";
import { BsCardImage } from "react-icons/bs";

import { useContext } from "react";
import ShowMoreText from "react-show-more-text";
import { db, storage, auth } from "../../firebase-config";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

export const Share = ({
  PostText,
  handleSubmit,
  setPostText,
  setImg,
  curUser,
  Img,
}) => {
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={curUser.avatar || Img} alt="" />
          {/*  */}
          <input
            placeholder="What's in your mind ?"
            className="shareInput"
            value={PostText}
            required
            onChange={(e) => setPostText(e.target.value)}
          />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOption mx-1">
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
          <div className="shareOption mx-1">
            <span className="shareOptionText"> Post </span>
            <label htmlFor="post">
              <FaPaperPlane
                id="post"
                onClick={handleSubmit}
                className="shareIcon text-danger "
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Share;
