// components/Dashboard.js
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const Dashboard = ({ fetchUser }) => {
  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get('session_id');
    if (sessionId) {
      const timer = setTimeout(() => {
        fetchUser();
      }, 1500);
  
      return () => clearTimeout(timer); // cleanup
    }
  }, []);
  ; // ✅ useEffect runs once on component mount

  return <h2>Dashboard</h2>;
};

export default connect(null, actions)(Dashboard);
