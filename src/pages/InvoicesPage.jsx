import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/orders`);
        setInvoices(response.data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    fetchInvoices();
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
      <h2 style={styles.heading}>Invoice Details</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Order ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Price</th>
            <th style={styles.th}>Quantity</th>
            <th style={styles.th}>Order Time</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((order) => (
            <tr key={order.id}>
              <td style={styles.td}>{order.id}</td>
              <td style={styles.td}>{order.name}</td>
              <td style={styles.td}>{order.price}</td>
              <td style={styles.td}>{order.quantity}</td>
              <td style={styles.td}>
                {new Date(order.order_time).toLocaleString()}
              </td>
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

export default InvoicesPage;
