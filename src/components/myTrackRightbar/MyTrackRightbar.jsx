import "./mytrackrightbar.css";
import { BsFillBookFill } from "react-icons/bs";
import { Newz } from "../../dummyData";
import Card from "react-bootstrap/Card";

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
            <Card
              style={{
                width: "12rem",
                padding: "0.3rem",
                "min-width": "12rem",
              }}
              className=" mx-auto mb-3 userCard"
            >
              <div className="cardo ">
                <Card.Img
                  variant="top"
                  src={newsPost.photo}
                  className="cardimg d-block  img-fluid"
                />
              </div>

              <Card.Body style={{ height: "4rem" }} className="my-1 py-1">
                <Card.Title className="fs-6 fw-bold">
                  {newsPost.desc}
                </Card.Title>
                <Card.Text className="mt-1">{newsPost.desc}</Card.Text>
              </Card.Body>
            </Card>
            // <div className="mx-3 my-2 py-2 px-2 bg-danger rounded shadow-sm">
            //   <div className="mx-3 my-2 py-2 px-2 bg- rounded">
            //     <p>{newsPost.desc}</p>
            //     <p>{newsPost.comment}</p>
            //     <p>{newsPost.like}</p>
            //     <p>{newsPost.date}</p>
            //   </div>
            // </div>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default MyTrackRightbar;
