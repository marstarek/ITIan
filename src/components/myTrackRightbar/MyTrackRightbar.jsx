import "./rightbar.css";
import { BsFillBookFill } from "react-icons/bs";
import { Newz } from "../../dummyData";
export const MyTrackRightbar = () => {
  // sidebare

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <div className="rightbarContainer justify-content-center">
          <p className="subhead">
            <BsFillBookFill className=" fs-5 mb-1" /> latest Front End
            Technology
          </p>
        </div>
        <hr className="w-50 text-center  mx-auto shadow " />
        <ul className="rightbarNewsList">
          {Newz.map((newsPost, i) => (
            <div className="mx-3 my-2 py-2 px-2 bg-danger rounded">
              <div className="mx-3 my-2 py-2 px-2 bg- rounded">
                <p>{newsPost.desc}</p>
                <p>{newsPost.comment}</p>
                <p>{newsPost.like}</p>
                <p>{newsPost.date}</p>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default MyTrackRightbar;
