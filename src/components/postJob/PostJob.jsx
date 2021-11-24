import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikField from "../../shared/form/FormikField";
import FormikErrorMessage from "../../shared/form/FormikErrorMessage";
import styles from "./PostJob.module.css";

const PostJob = () => {
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

  const onSubmit = (values) => {
    // alert(
    //   `Job is ${values.jobTitle} and Location is ${values.location} and ${values.description}`
    // );
    values.jobTitle = "";
    values.location = "";
    values.description = "";
  };

  return (
    <div className={`w-50 mx-auto`}>
      <h4 className="text-center mb-3">Add a new job</h4>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div>
            <div className="form-control border-0">
              <FormikField
                name="jobTitle"
                type="text"
                className="w-100"
                placeholder="Job Title"
                as="input"
              />
            </div>
            <div className="form-control border-0">
              <FormikField
                name="location"
                type="text"
                className="w-100"
                placeholder="Location"
                as="input"
              />
            </div>
            <div className="form-control border-0">
              <FormikField
                name="description"
                placeholder="Description"
                className={`w-100 ${styles.textarea}`}
                as="textarea"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className={`text-white btn btn-danger rounded-pill mt-2`}
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
