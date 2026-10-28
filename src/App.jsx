import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import OrderPage from './pages/OrderPage';
import LoginPage from './pages/LoginPage';
import ViewFeedback from './pages/ViewFeedback'; // Uncomment if needed
import AddCustomer from './pages/Addcustomer'; // Capitalize for consistency
import FeedBackPage from './pages/FeedBackPage';
import CustomersPage from './pages/CustomersPage';
import InvoicesPage from './pages/InvoicesPage';
import Order from './pages/Order';
import CustomerMap from './pages/CustomerMap'; // adjust the path as needed


function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect to /login as the default route */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login Page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Main App Pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vieworder" element={<OrderPage />} />
        <Route path="/customer" element={<AddCustomer />} />
        <Route path="/order" element={<Order />} />
        <Route path="/cart" element={<cart />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/invoices" element={<InvoicesPage />} />
        <Route path="/viewfeedback" element={<ViewFeedback />} />
        <Route path="/feedback" element={<FeedBackPage/>} />
        <Route path="/customermap" element={<CustomerMap/>} />
      </Routes>
    </Router>
  );
}

export default App;
