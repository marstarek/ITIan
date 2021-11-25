import "./share.css";
import { FaPaperPlane } from "react-icons/fa";
import { useState } from "react";

import { BsCardImage, BsFillFunnelFill } from "react-icons/bs";
export const Share = ({
  PostText,
  handleSubmit,
  setPostText,
  setImg,
  curUser,
  Img,
  setQuery,
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
        <div className="shareBottom  g-0 row">
          <div className="  col-6 ps-3">
            <BsFillFunnelFill className="shareIcon text-danger " />
            <input
              placeholder="filter your Wall ... "
              autocomplete="off"
              onChange={(event) => setQuery(event.target.value)}
              className="shareInput"
            />
          </div>
          <div className=" col-4 ">
            <div className="shareOption-row  justify-content-end  row g-0 ">
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
              <div className="shareOption mx-1 col-4 g-0 ">
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
      </div>
    </div>
  );
};
export default Share;
