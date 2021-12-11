import { Formik, Form } from "formik";
import * as yup from "yup";
import FormikField from "../../shared/form/FormikField";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, db } from "../../firebase-config";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import styles from "./Login.module.css";
const validationSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email field is required"),
  password: yup
    .string()
    .required("Password field is required")
    .min(6, "Must be exactly 6 digits"),
});

const Login = () => {
  const [user, setUser] = useState({});
  const history = useHistory();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  const initialValues = {
    email: "",
    password: "",
  };
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    error: null,
    loading: false,
  });
  const [error, setError] = useState("");
  const onSubmit = async (values) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      await updateDoc(doc(db, "users", user.user.uid), {
        isOnline: true,
      });

      setData({
        email: "",
        password: "",
        error: null,
        loading: false,
      });
      history.push("/");
      console.log(user);
    } catch (error) {
      setError(error.message);
    }
  };

  console.log(user);
  return (
    <div className={`align-items-center d-flex ${styles.login__wrapper}`}>
      <div className={`col-6 ${styles.form__wrapper} p-3 my-5  form`}>
        <h2>Login</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div className="form w-75 m-auto" style={{ padding: 20 }}>
              <div className="mb-2">
                <FormikField
                  label="email"
                  name="email"
                  type="email"
                  placeholder="Your email"
                  as="input"
                />
              </div>
              <FormikField
                label="password"
                name="password"
                type="password"
                placeholder="Password"
                as="input"
              />

              <button
                style={{ display: "block" }}
                className={`  btn-sm fs-6  ${styles.button} my-4`}
              >
                login
              </button>
              {error ? (
                <p className=" text-danger">wrong email or password</p>
              ) : null}
            </div>
          </Form>
        </Formik>
        <p className="text-center">
          Not a user?{" "}
          <Link to="/register" className="text-danger">
            Sign Up
          </Link>
          <br />
        </p>
      </div>
    </div>
  );
};

export default Login;
