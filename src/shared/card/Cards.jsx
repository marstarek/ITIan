import { Link } from "react-router-dom";
import "./cards.css";
export const Cards = (props) => {
  return (
    <>
      <div className="card p-0 col-3">
        <img
          src={props.photo}
          className="imgo card-img-top w-100 mb-0 mx-auto"
          alt="..."
        />
        <div className="card-body">
          <h2 className="card-title fs-3"> {props.title} </h2>{" "}
          <p className="card-text mb-"> {props.text} </p>{" "}
          <Link className=" btnD rounded my-5" to="/track">
            More Details
          </Link>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
};
export default Cards;
