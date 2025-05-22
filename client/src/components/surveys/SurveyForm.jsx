import React from "react";
import { Form, Field } from "react-final-form";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
import validateEmails from "../../store/utils/validateEmails";
import formFields from "./formFields";

const SurveyForm = ({ onSurveySubmit, initialValues }) => {
  const validate = (values) => {
    const errors = {};

    errors.recipients = validateEmails(values.recipients || "");

    formFields.forEach(({ name }) => {
      if (!values[name]) {
        errors[name] = "You must provide a value";
      }
    });

    return errors;
  };

  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSurveySubmit}
      validate={validate}
      render={({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
          {formFields.map(({ label, name }) => (
            <Field
              key={name}
              component={SurveyField}
              type="text"
              label={label}
              name={name}
            />
          ))}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      )}
    />
  );
};

export default SurveyForm;
