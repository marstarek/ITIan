import { Formik, Form } from "formik";

import React, { useEffect, useState } from "react";

import * as Yup from "yup";
import FormikField from "../../shared/form/FormikField";
import FormikErrorMessage from "../../shared/form/FormikErrorMessage";
import { auth, db } from "../../firebase-config";
import { getDoc, addDoc, doc, collection, getDocs } from "firebase/firestore";

import "./PostJob.css";

const PostJob = ({ getJob }) => {
  const [Jobs, setJobs] = useState();
  const [curUser, setcurUser] = useState();
  const jobsCollectionRefrance = collection(db, "jobs");
  useEffect(() => {
    auth?.currentUser &&
      getDoc(doc(db, "users", auth.currentUser?.uid)).then((docSnap) => {
        if (docSnap.exists()) {
          setcurUser(docSnap.data());
        }
      });
  }, []);

  /* ------------------------------------handleSubmit-------------------------------------- */
  const postJobSubmit = async (values) => {
    const id = `${curUser.uid}${new Date().getTime()}`;

    await addDoc(collection(db, "jobs"), {
      jobTitle: values.jobTitle,
      location: values.location,
      description: values.description,
      postOwner: curUser.name,
      avatar: curUser.avatar,
      ownerId: curUser.uid,
      jobId: id,
    });
    const docSnap = await getDoc(doc(db, "jobs", id));

    values.jobTitle = "";
    values.location = "";
    values.description = "";
  };
  const initialValues = {
    jobTitle: "",
    location: "",
    description: "",
  };

  const validationSchema = Yup.object({
    jobTitle: Yup.string().required("Job title is required"),
    location: Yup.string().required("Location is required"),
    description: Yup.string().required("Job description is required"),
  });
  console.log(Jobs);
  return (
    <div className="w-50 mx-auto">
      <h3 className="text-center ">Add a new job</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={postJobSubmit}
      >
        <Form>
          <div>
            <div className="form-control border-0 mb-2">
              <FormikField
                name="jobTitle"
                type="text"
                className="w-100 "
                placeholder="Job Title"
                as="input"
              />
            </div>
            <div className="form-control border-0 mb-2">
              <FormikField
                name="location"
                type="text"
                className="w-100"
                placeholder="Location"
                as="input"
              />
            </div>
            <div className="form-control border-0 mb-2">
              <FormikField
                name="description"
                placeholder="Description"
                className="w-100 textarea"
                as="textarea"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="B text-white btn   mt-2"
                onClick={getJob}
              >
                Add a Job
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default PostJob;
