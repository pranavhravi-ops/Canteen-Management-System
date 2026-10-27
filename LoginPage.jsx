// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import canteenLogo from '../Images/canteen_logo.png'; // Put your logo here
import background from '../Images/canteen.webp';
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const usernamePattern = /^[0-4][A-Za-z][A-Za-z][0-9][0-9][A-Za-z][A-Za-z][0-9][0-9][0-9]$/;

    if (username === 'admin' && password === 'admin@123') {
      navigate('/dashboard'); // Route to admin dashboard
      return;
    }

    if (username === 'user' && password === 'user@123') {
      navigate('/Order'); // Route to user order page
      return;
    }

    if (!usernamePattern.test(username)) {
      alert('Invalid username format. Please try again.');
      return;
    }

    if (password === 'sahana') {
      navigate('/order'); // Custom case
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <img src={canteenLogo} alt="Malnad Canteen Logo" style={styles.image} /> 
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Sign In</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  body: {
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    margin: 0,
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#fff',
    padding: 20,
    borderRadius: 10,
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  image: {
    width: '100%',
    maxWidth: 300,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    margin: '10px 0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  input: {
    padding: 10,
    margin: '5px 0',
    border: '1px solid #ddd',
    borderRadius: 5,
  },
  button: {
    padding: 10,
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    marginTop: 10,
  },
};

export default LoginPage;
