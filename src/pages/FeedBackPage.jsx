import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState('');
  const [messageVisible, setMessageVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    try {
  const response = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/feedback`, { feedback });
  if (response.status === 200) {
    setMessageVisible(true);
    setFeedback('');
  }
} catch (error) {
  console.error('Error submitting feedback:', error);
}

  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
        .sidebar h2 {
          color: #ecf0f1;
          text-align: center;
          margin-bottom: 20px;
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

        .container {
          margin-left: 260px;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          padding: 20px;
        }

        .form-box {
          background: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 500px;
        }

        .form-box h1 {
          margin-top: 0;
          margin-bottom: 20px;
          font-size: 24px;
          color: #333;
          text-align: center;
        }

        textarea {
          width: 100%;
          height: 120px;
          padding: 10px;
          font-size: 16px;
          border-radius: 4px;
          border: 1px solid #ccc;
          resize: vertical;
        }

        button {
          display: block;
          width: 100%;
          padding: 10px;
          font-size: 16px;
          background-color: #2c3e50;
          color: white;
          border: none;
          border-radius: 4px;
          margin-top: 15px;
          cursor: pointer;
        }

        button:hover {
          background-color: #1a252f;
        }

        .message {
          margin-top: 15px;
          color: green;
          font-weight: bold;
          text-align: center;
        }

        .back-link {
          display: block;
          margin-top: 15px;
          text-align: center;
          text-decoration: none;
          color: #2c3e50;
          font-weight: 500;
        }

        .back-link:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="sidebar">
        <h2>Menu</h2>
        <a href="/order">Dashboard</a>
        <a href="/feedback">Feedback</a>
        <a href="/login">Logout</a>
      </div>

      <div className="container">
        <div className="form-box">
          <h1>Feedback</h1>
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="Enter your feedback here..."
              required
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
          <Link className="back-link" to="/order">Back to Home</Link>
          {messageVisible && <div className="message">Your response was recorded</div>}
        </div>
      </div>
    </>
  );
};

export default FeedbackPage;
