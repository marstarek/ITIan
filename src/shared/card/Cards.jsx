import { Link } from "react-router-dom";
import "./cards.css";
export const Cards = (props) => {
  return (
    <>
      <div className='card'>
        <img
          src={props.photo}
          className='imgo card-img-top w-100 mx-auto'
          alt='...'
        />
        <div className='card-body'>
          <h2 className='card-title '> {props.title} </h2>{" "}
          <p className='card-text mb-5'> {props.text} </p>{" "}
          <Link className=' btnD rounded my-5' to='/track'>
            Go To Details
          </Link>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
};
export default Cards;
