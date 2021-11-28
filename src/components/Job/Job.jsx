import "./job.css";
import ShowMoreText from "react-show-more-text";

import { BsTrashFill } from "react-icons/bs";
export default function Job({ job, deleteJob, i, curUser }) {
  return (
    <div
      className="jobpostwrapper  rounded p-3 my-4  d-flex justify-content-between"
      key={job.id}
    >
      <div className="d-flex">
        <div className="avatar">
          <img className=" shareProfileImg " src={job.avatar} alt="avatar" />
        </div>
        <div className="job__info flex-grow-1">
          <p className="text-start  fs-5 text-capitalize fw-bold">
            {job.postOwner}{" "}
          </p>
          <div>
            <small className="text-start  fs-6 fw-bold job-location">
              <span className="text-capitalize text-danger">Job tittle:</span>{" "}
              {job.jobTitle}
            </small>
            <br />
            <small className="text-start  fs-6 fw-bold job-location">
              <span className="text-capitalize text-danger">Location:</span>{" "}
              {job.location}
            </small>
          </div>
          <div className="postText ">
            <ShowMoreText
              lines={4}
              more="Show more"
              less="...Show less"
              anchor
              className="oooeeer"
              expanded={false}
              width={0}
            >
              {job.description}
            </ShowMoreText>
          </div>
        </div>
      </div>
      <div>
        {curUser.rule !== "admin" && curUser?.uid !== job.ownerId && (
          <button className="delete me-1 btn " type="file">
            Apply
          </button>
        )}

        {(curUser?.rule === "admin" || curUser?.uid === job.ownerId) && (
          <button className="delete me-1 btn" onClick={() => deleteJob(i)}>
            <BsTrashFill />
          </button>
        )}
      </div>
    </div>
  );
}
