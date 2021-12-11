import { FieldArray, Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, db } from "../../firebase-config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import FormikField from "../../shared/form/FormikField";
import styles from "./register.module.css";
import { setDoc, doc, Timestamp } from "firebase/firestore";
// import logo from "../../imgs/1.png";
const validationSchema = yup.object({
  name: yup
    .string()
    .required("name field is required")
    .matches(/^[aA-zZ]/, "Only alphabets are allowed for this field ")
    .required(),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email field is required"),
  password: yup
    .string()
    .required("Password field is required")
    .min(8)
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
  passwordConfirmation: yup.string().when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: yup
      .string()
      .oneOf([yup.ref("password")], "Both password need to be the same"),
  }),
});

const Register = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    Itian: [],
  };
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    error: null,
    loading: false,
  });
  const [user, setUser] = useState({});
  const history = useHistory();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  const onSubmit = async (values) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password,
        values.passwordConfirmation
      );
      await setDoc(doc(db, "users", user.user.uid), {
        uid: user.user.uid,
        name: values.name,
        email: values.email,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true,
        avatar:
          "https://www.duke-nus.edu.sg/images/librariesprovider5/people/1-placeholder.png?sfvrsn=61a8955c_0",
        avatarPath: "",
        SKILLS: "",
        EXPERIANCES: "",
        CONTACTS: "",
        rule: "user",
        track: values.Itian[0],
        following: "vMsaYyksVAMCoGbT2hY7y0M7CjG2",
      });
      setData({
        name: "",
        email: "",
        password: "",
        error: null,
        loading: false,
      });
      history.push("/");
      console.log(user);
    } catch (error) {
      setError(error.message);
      alert(error.message);
    }
  };
  const [error, setError] = useState("");

  return (
    <div className="container  ">
      <div className="row">
        <div className="col-12 col-lg-6  d-flex justify-content-center ">
          <figure className={`w-50 d-none d-lg-block  `}>
            <img
              src="https://www.iti.gov.eg/assets/images/iti-logo.png"
              alt=""
              className="w-100"
            />
            <p className={`${styles.ITI_Community}`}> Community</p>
          </figure>
        </div>
        <div className={`col-12 col-lg-6 ${styles.form__wrapper} pb-5  my-5`}>
          <h2>Register</h2>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {(formik) => {
              return (
                <Form>
                  <div className="form w-75 m-auto" style={{ padding: 20 }}>
                    <div className="mb-2">
                      <FormikField
                        label="name:"
                        name="name"
                        type="text"
                        placeholder="Your name"
                        as="input"
                      />
                    </div>
                    <div className="mb-2">
                      <FormikField
                        label="email"
                        name="email"
                        type="email"
                        placeholder="Your email"
                        as="input"
                      />
                    </div>
                    <div className="mb-2">
                      <FormikField
                        label="password"
                        name="password"
                        type="password"
                        placeholder="Your password"
                        as="input"
                      />
                    </div>
                    <div className="mb-2">
                      <FormikField
                        label="password confirmation"
                        name="passwordConfirmation"
                        type="password"
                        placeholder="Confirm password"
                        as="input"
                      />
                    </div>

                    <Field name="itian">
                      {(formikField) => {
                        return (
                          <>
                            <div>
                              <label
                                htmlFor="Itian"
                                className={`form-label `}
                                style={{
                                  display: "block",
                                }}
                              ></label>
                              <FieldArray name="Itian">
                                {({
                                  push,

                                  form: {
                                    values: { Itian },
                                  },
                                }) => {
                                  return (
                                    <div>
                                      <button
                                        type="button"
                                        className={`my-3 w-50 btn-sm ${styles.button}  px-5 py-2`}
                                        onClick={() => {
                                          push();
                                          push();
                                        }}
                                      >
                                        Itian
                                      </button>
                                      {Itian.map((feild, i) => (
                                        <div key={i}>
                                          {i === 0 && (
                                            <label
                                              htmlFor={`Itian[${i}]`}
                                              name={`track`}
                                              className="form-label  "
                                              style={{
                                                display: "block",
                                              }}
                                            >
                                              track
                                            </label>
                                          )}
                                          {i === 1 && (
                                            <label
                                              htmlFor={`Itian[${i}]`}
                                              name={`code`}
                                              className="form-label  "
                                              style={{
                                                display: "block",
                                              }}
                                            >
                                              iti code
                                            </label>
                                          )}
                                          <Field
                                            className={`${styles.input}  ${styles.a} `}
                                            name={`Itian[${i}]`}
                                          />
                                          {Itian.length > 2 &&
                                            (Itian.length = 0)}
                                        </div>
                                      ))}
                                    </div>
                                  );
                                }}
                              </FieldArray>
                            </div>
                          </>
                        );
                      }}
                    </Field>
                    <button
                      style={{ display: "block" }}
                      type="submit"
                      className={`btn-sm mt-3 ${styles.button}`}
                    >
                      submit
                    </button>
                  </div>
                  {error ? (
                    <p className=" text-danger text-center">
                      this email already in use
                    </p>
                  ) : null}
                </Form>
              );
            }}
          </Formik>
          <p className="text-center">
            Already a user?{" "}
            <Link to="/login" className="text-danger">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
