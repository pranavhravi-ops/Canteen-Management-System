import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddCustomer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    location: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/customers`, formData);
      alert('Customer added successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        gender: '',
        location: ''
      });
    } catch (error) {
      alert('Error adding customer.');
      console.error(error);
    }
  };

  const styles = {
    page: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f9f9f9',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      margin: 0
    },
    sidebar: {
      height: '100%',
      width: '240px',
      position: 'fixed',
      top: 0,
      left: 0,
      backgroundColor: '#2c3e50',
      paddingTop: '20px',
      boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
    },
    sidebarLink: {
      padding: '15px 20px',
      textDecoration: 'none',
      fontSize: '18px',
      color: '#ecf0f1',
      display: 'block'
    },
    formContainer: {
      background: '#fff',
      padding: '30px 25px',
      borderRadius: '10px',
      boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
      width: '90%',
      maxWidth: '500px',
      marginLeft: '260px'
    },
    heading: {
      color: '#4CAF50',
      marginBottom: '25px',
      textAlign: 'center'
    },
    formGroup: {
      marginBottom: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start'
    },
    label: {
      marginBottom: '8px',
      fontWeight: 'bold',
      color: '#333'
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '16px'
    },
    genderOptions: {
      display: 'flex',
      gap: '15px',
      alignItems: 'center'
    },
    genderLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      fontSize: '15px'
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      cursor: 'pointer',
      marginTop: '10px'
    },
    backLink: {
      display: 'block',
      textAlign: 'center',
      marginTop: '15px',
      color: '#4CAF50',
      textDecoration: 'none',
      fontSize: '15px'
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.sidebar}>
        <Link to="/dashboard" style={styles.sidebarLink}>Dashboard</Link>
        <Link to="/customer" style={styles.sidebarLink}>Customer</Link>
        <Link to="/Vieworder" style={styles.sidebarLink}>Food Section</Link>
        <Link to="/viewfeedback" style={styles.sidebarLink}>Feedbacks</Link>
        <Link to="/login" style={styles.sidebarLink}>Logout</Link>
      </div>

      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Add Customer</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              style={styles.input}
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              style={styles.input}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="phone" style={styles.label}>Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              style={styles.input}
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Gender</label>
            <div style={styles.genderOptions}>
              <label style={styles.genderLabel}>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === 'Male'}
                  onChange={handleChange}
                />
                Male
              </label>
              <label style={styles.genderLabel}>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === 'Female'}
                  onChange={handleChange}
                />
                Female
              </label>
            </div>
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="location" style={styles.label}>Location</label>
            <input
              type="text"
              id="location"
              name="location"
              style={styles.input}
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <button type="submit" style={styles.button}>Submit</button>
          </div>
        </form>
        <a href="/dashboard" style={styles.backLink}>Back to Home</a>
      </div>
    </div>
  );
};

export default AddCustomer;
