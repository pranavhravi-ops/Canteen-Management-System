import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/feedback`)
      .then(response => {
        setFeedbackList(response.data);
      })
      .catch(error => {
        console.error('Error fetching feedback:', error);
      });
  }, []);

  return (
    <>
      <style>{`
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f7f6;
        }

        .sidebar {
          height: 100vh;
          width: 240px;
          position: fixed;
          top: 0;
          left: 0;
          background-color: #2c3e50;
          padding-top: 20px;
          box-shadow: 2px 0 5px rgba(0,0,0,0.1);
        }

        .sidebar a {
          padding: 15px 20px;
          text-decoration: none;
          font-size: 18px;
          color: #ecf0f1;
          display: block;
          transition: color 0.3s ease, background-color 0.3s ease;
        }

        .sidebar a:hover {
          color: #2c3e50;
          background-color: #ecf0f1;
        }

        .main {
          margin-left: 260px;
          padding: 20px;
        }

        .feedback-card {
          background: white;
          padding: 20px;
          margin-bottom: 15px;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        h1 {
          margin-top: 0;
          align:center;
          color: #2c3e50;
        }
      `}</style>

      <div className="sidebar">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/customer">Customers</Link>
        <Link to="/vieworder">Food Section</Link>
        <Link to="/viewfeedback">Feedback</Link>
        <Link to="/login">Logout</Link>
      </div>

      <div className="main">
        <h1>Feedback</h1>
        {feedbackList.length > 0 ? (
          feedbackList.map((feedback, index) => (
            <div key={index} className="feedback-card">
              <p><strong>Feedback:</strong> {feedback.feedback}</p>

            </div>
          ))
        ) : (
          <p>No feedback found.</p>
        )}
      </div>
    </>
  );
};

export default ViewFeedback;
