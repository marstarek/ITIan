import "./mytrackrightbar.css";
import { BsFillBookFill } from "react-icons/bs";
import { Newz } from "../../dummyData";
import Card from "react-bootstrap/Card";
import ShowMoreText from "react-show-more-text";

export const MyTrackRightbar = () => {
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <div>
          <img
            src="assets/news/ff.png"
            alt=""
            className="w-100 last-tech-img "
          />
        </div>
        <ul className="rightbarNewsList">
          {Newz.map((newsPost, i) => (
            <Card
              style={{
                width: "20rem",
                padding: "0.3rem",
                "min-width": "12rem",
                background: "#F8F9FA",
              }}
              className=" mx-auto mb-4  border-0 userCard"
            >
              <div className="cardo rounded ">
                <Card.Img
                  variant="top"
                  src={newsPost.photo}
                  className="cardimg d-block p-1    img-fluid"
                />
              </div>

              <Card.Body style={{ height: "8rem" }} className="my-1 py-1 px-1">
                <Card.Title className="fs-5 ">{newsPost.name}</Card.Title>
                <Card.Title className="fs-6 text-left">
                  {newsPost.desc}
                </Card.Title>

                <Card.Text className="my-1 ">
                  <a href="https://www.lambdatest.com/blog/top-11-front-end-development-trends-in-2021/">
                    Learn More{" "}
                  </a>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default MyTrackRightbar;
