import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { submitSurvey } from "../../store/slices/surveySlice";
import { fetchUser } from "../../store/slices/authSlice";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";
import { useNavigate } from "react-router-dom";

const SurveyNew = () => {
  const [showFormReview, setShowFormReview] = useState(false);
  const [formValues, setFormValues] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormSubmit = (values) => {
    setFormValues(values);
    setShowFormReview(true);
  };

  const handleSurveySubmit = async () => {
    await dispatch(submitSurvey({ values: formValues, navigate }));
    dispatch(fetchUser());
  };

  const renderContent = () => {
    if (showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => setShowFormReview(false)}
          formValues={formValues}
          onSurveySubmit={handleSurveySubmit}
        />
      );
    }

    return (
      <SurveyForm
        onSurveySubmit={handleFormSubmit}
        initialValues={formValues}
      />
    );
  };

  return <div>{renderContent()}</div>;
};

export default SurveyNew;
