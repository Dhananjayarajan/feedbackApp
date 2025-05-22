
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {Link} from 'react-router-dom'
import SurveyList from './surveys/SurveyList';

const Dashboard = ({ fetchUser }) => {
  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get('session_id');
    if (sessionId) {
      const timer = setTimeout(() => {
        fetchUser();
      }, 1500);
  
      return () => clearTimeout(timer); 
    }
  }, []);

  return (
    <div>
      <SurveyList />
      <div className="fixed-action-btn">
        <Link to="/surveys/new" className="btn-floating btn-large red">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default connect(null, actions)(Dashboard);
