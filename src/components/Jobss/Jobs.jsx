import { useState, useEffect } from "react";
import Job from "../Job/Job";
import PostJob from "../postJob/PostJob";
import { db, auth } from "../../firebase-config";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import Navbar from "../../shared/layout/navbar/Navbar";

export default function Jobs() {
  const [jobs, setJobs] = useState();
  const [curUser, setcurUser] = useState();
  const [query, setQuery] = useState("");

  const jobsCollectionRefrance = collection(db, "jobs");
  const getJob = async () => {
    const usersData = await getDocs(jobsCollectionRefrance);
    setJobs(usersData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    getJob();
    getCurrentUser();
  }, []);
  const deleteJob = async (i) => {
    const commentDoc = doc(db, "jobs", jobs[i].id);
    await deleteDoc(commentDoc);

    getJob();
  };
  const getCurrentUser = () => {
    auth?.currentUser &&
      getDoc(doc(db, "users", auth.currentUser?.uid)).then((docSnap) => {
        if (docSnap.exists()) {
          setcurUser(docSnap.data());
        }
      });
  };
  return (
    <>
      <div className={`row gx-0 flex-row-reverse `}>
        <div className={`order-0 col-lg-5 pt-4`}>
          {" "}
          <PostJob getJob={getJob} />
        </div>
        <div className={`col-lg-6`}>
          <h3 className={`text-center pt-4 pb-2`}>
            Explore New Career Opportunities
          </h3>

          <div className="input-group mx-auto w-75 text-light ">
            <input
              className="form-control text-danger"
              type="text"
              name="Search"
              placeholder="Search"
              autocomplete="off"
              onChange={(event) => setQuery(event.target.value)}
            />{" "}
            <span className="input-group-prepend input-group-text btn-danger  ">
              search
            </span>
          </div>
          <div>
            {jobs
              ?.filter((job, i) => {
                if (query === "") {
                  return job;
                } else if (
                  job.jobTitle.toLowerCase().includes(query.toLowerCase())
                ) {
                  return job;
                }
              })
              .map((job, i) => (
                <Job
                  key={i}
                  job={job}
                  jobIndex={i}
                  curUser={curUser}
                  deleteJob={() => deleteJob(i)}
                />
              ))}

            {/*  */}
          </div>
        </div>
      </div>
    </>
  );
}
