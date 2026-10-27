import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/customers`);
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  const styles = {
    container: {
      padding: '20px',
      marginLeft: '260px',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    },
    heading: {
      marginBottom: '20px',
      fontSize: '28px',
      color: '#2c3e50',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: '30px',
    },
    th: {
      backgroundColor: '#ecf0f1',
      padding: '10px',
      border: '1px solid #ddd',
      textAlign: 'left',
    },
    td: {
      padding: '10px',
      border: '1px solid #ddd',
    },
    buttonContainer: {
      textAlign: 'center',
    },
    button: {
      backgroundColor: '#2980b9',
      color: 'white',
      padding: '10px 20px',
      textDecoration: 'none',
      borderRadius: '5px',
      fontSize: '16px',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Customer Details</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Phone</th>
            <th style={styles.th}>Gender</th>
            <th style={styles.th}>Location</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td style={styles.td}>{customer.id}</td>
              <td style={styles.td}>{customer.name}</td>
              <td style={styles.td}>{customer.email}</td>
              <td style={styles.td}>{customer.phone}</td>
              <td style={styles.td}>{customer.gender}</td>
              <td style={styles.td}>{customer.location}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={styles.buttonContainer}>
        <Link to="/dashboard" style={styles.button}>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default CustomersPage;
