import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser } from "../store/slices/authSlice";
import ThankYouPage from "./ThankYouPage";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className="container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/surveys" element={<Dashboard />} />
          <Route path="/surveys/new" element={<SurveyNew />} />
          <Route path="/api/stripe/success" element={<Dashboard />} />
          <Route path="/api/stripe/cancel" element={<Landing />} />
          <Route path="/api/surveys/thanks" element={<ThankYouPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
