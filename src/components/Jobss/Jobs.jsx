// import React from "react";
// import Job from "../Job/Job";
// import { jobs } from "../../dummyData";
// import PostJob from "../postJob/PostJob";
// export default function Jobs() {
//   return (
//     <>
//       <div className={`row gx-0`}>
//         <div className={`col-lg-5 pt-5`}>
//           <PostJob />
//         </div>
//         <div className={`col-lg-7`}>
//           <h3 className={`text-center pt-4 pb-2`}>
//             Explore New Career Opportunities
//           </h3>
//           <div>
//             {jobs.map((J) => (
//               <Job key={J.id} job={J} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import { useState, useEffect } from "react";
import Job from "../Job/Job";

import PostJob from "../postJob/PostJob";
import { db } from "../../firebase-config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function Jobs() {
  const [jobs, setJobs] = useState();

  const jobsCollectionRefrance = collection(db, "jobs");
  const getJob = async () => {
    const usersData = await getDocs(jobsCollectionRefrance);
    setJobs(usersData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    getJob();
  }, []);
  const deleteJob = async (i) => {
    const commentDoc = doc(db, "jobs", jobs[i].id);
    await deleteDoc(commentDoc);

    getJob();
  };
  return (
    <>
      <div className={`row gx-0`}>
        <div className={`col-lg-7`}>
          <h3 className={`text-center pt-4 pb-2`}>
            Explore New Career Opportunities
          </h3>
          <div>
            {jobs?.map((J, i) => (
              <>
                {" "}
                <button onClick={() => deleteJob(i)}>del</button>
                <Job key={J.id} job={J} deleteJob={deleteJob} />
              </>
            ))}
          </div>
        </div>
        <div className={`order-0 col-lg-5 pt-5`}>
          <PostJob />
        </div>
      </div>
    </>
  );
}
