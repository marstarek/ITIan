import React from "react";
import { Field } from "formik";
import FormikErrorMessage from "./FormikErrorMessage";
import "./form.css";

const FormikField = ({ name, type, placeholder, as = "" }) => {
  return (
    <>
      <Field
        name={name}
        type={type}
        placeholder={placeholder}
        as={as}
        className="input"
      ></Field>
      <FormikErrorMessage name={name} />
    </>
  );
};

export default FormikField;
