import "./post.css";
import {
  BsFillXCircleFill,
  BsChatSquareTextFill,
  BsChevronDoubleDown,
  BsFillCursorFill,
  BsFillHeartFill,
  BsCardImage,
  BsTrashFill,
} from "react-icons/bs";
import { FaPaperPlane } from "react-icons/fa";
import ShowMoreText from "react-show-more-text";
export const FirstPost = ({
  post,
  Img,
  curUser,
  deletePost,
  likeHandler,
  likes,
}) => {
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="shareProfileImg postProfileImg"
              src={curUser.avatar}
              alt=""
            />
            {/* PostText, from: id, createdAt: Timestamp.fromDate(new Date()),
            media: url || "", like: 0, islike: false, ownerImg: curUser.avatar,
            postOwnername: curUser.name, */}
            <figure>
              <span className="postUsername">{post.postOwnername}</span>
              <br />
              <figcaption>
                <cite>
                  <span className="postDate">
                    {post.createdAt.timestampValue}
                  </span>
                </cite>
              </figcaption>
            </figure>
          </div>
          <div className="postTopRight">
            <>
              <div className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle fs-3
                    text-danger"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                ></a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    {/* {(curUser.rule === "admin" ||
                      postd.fields.from?.stringValue.includes(curUser.uid)) && (
                      <span>
                        <BsTrashFill
                          className=' deleteIcon  fs-4 text-danger '
                          // onClick={async () => {
                          //   await delatePost(i); }         }
                        />{" "}
                        Delete Post
                      </span>
                    )} */}
                    <span>
                      <BsTrashFill
                        className=" deleteIcon  fs-4 text-danger "
                        onClick={deletePost}
                      />{" "}
                      Delete Post
                    </span>
                  </li>
                </ul>
              </div>
            </>
          </div>
        </div>
        <div className="postCenter">
          <bdi className="postText px-2">
            <ShowMoreText
              lines={4}
              more="Show more"
              less="...Show less"
              anchor
              className="show-more-p"
              expanded={false}
              width={0}
            >
              {post.PostText}
            </ShowMoreText>
          </bdi>
          <img className="postImg" src={post.media} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <span className="postCommentText">
              <BsChatSquareTextFill
                className="deleteIcon me-1  fs-4 text-danger"
                // onClick={() => {
                //   showComments(i);
                // }}
              />
              Comments
            </span>
          </div>
          <div className="postBottomRight">
            <BsFillHeartFill
              className="likeIcon text-danger"
              onClick={likeHandler}
            />
            <span className="postLikeCounter">
              {likes}
              Like It
            </span>
          </div>
        </div>
        <hr />
        <div className="show-comments ">
          {/* {comments ? (
            <div>
              {comments.map((comment, index) => {
                if (comment.fields.postID.stringValue === posts[i]?.id) {
                  return (
                    <div
                      key={index}
                      className={` D-non ${
                        I === i ? "d-flex" : "d-none "
                      } m-2 p-2  row g-0  justify-content-around   `}>
                      <div className='col-1 me-3'>
                        <img
                          className='shareProfileImg postProfileImg mb-2'
                          src={
                            comment.fields.commentOwnerImg.stringValue || Img
                          }
                          alt=''
                        />
                      </div>
                      <div className='col-9 '>
                        <div className='row g-0'>
                          <h6 className='postUsername'>
                            {comment.fields.commentOwnername.stringValue}
                          </h6>
                        </div>
                        <div className='row g-0'>
                          <p style={{ "font-size": "0.7rem" }}>
                            {comment.fields.createdAt.timestampValue}
                          </p>
                        </div>
                        <div className='commentfiled row p-1 m-0 '>
                          <p className='m-0 '>
                            {comment.fields.commentsText.stringValue}
                          </p>
                        </div>
                      </div>
                      <div className='col-1'>
                        {(curUser.rule === "admin" ||
                          comment.fields.from?.stringValue.includes(
                            curUser.uid
                          )) && (
                          <BsFillXCircleFill
                            className='fs-4 text-danger deleteIcon '
                            onClick={() => {
                              delatecomment(i, index);
                            }}
                          />
                        )}
                      </div>
                    </div>
                  );
                }img
              })}
            </div>
          ) : (
            " "
          )} */}
        </div>
        <div className="postComment">
          <input
            placeholder="inputComment"
            className="inputComment"
            // onChange={(e) => setcommentsText(e.target.value)}
          />
          <button
            className="shareButton  btn-sm fs-6
            "
            // onClick={() => {
            //   commentsHandler(i); }}
          >
            Comment
          </button>
        </div>
      </div>
    </div>
  );
};
export default FirstPost;
