import styles from "./job.module.css";

export default function Job({ job, deleteJob, i, curUser }) {
  return (
    <div
      className={` ${styles.jobpostwrapper}  rounded p-3 m-3  d-flex justify-content-between`}
      key={job.id}
    >
      <div className={`d-flex`}>
        <div className={styles.avatar}>
          <img className={`w-100`} src={job.avatar} alt="avatar" />
        </div>
        <div className={`job__info flex-grow-1`}>
          <p className={`text-start  fs-5 text-capitalize fw-bold`}>
            {" "}
            {job.postOwner}{" "}
          </p>

          <div>
            <small className={`text-start  fs-6 fw-bold job-location`}>
              <span className={`text-capitalize text-danger`}>Job tittle:</span>{" "}
              {job.jobTitle}
            </small>
            <br />
            <small className={`text-start  fs-6 fw-bold job-location`}>
              <span className={`text-capitalize text-danger`}>Location:</span>{" "}
              {job.location}
            </small>
          </div>
          <pre className={`text-capitalize job-description pt-2 px-4`}>
            {job.description}
          </pre>
        </div>
      </div>
      <div>
        <button className={`${styles.delete} me-1 btn btn-danger`}>
          Apply
        </button>
        {curUser.uid === job.ownerId && (
          <button
            className={`${styles.delete} btn btn-danger`}
            onClick={() => deleteJob(i)}
          >
            X
          </button>
        )}
      </div>
    </div>
  );
}
