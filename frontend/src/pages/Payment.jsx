import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, FormGroup, Button } from 'reactstrap';
import { BASE_URL } from '../utils/config';
import { FaCreditCard, FaUser, FaCalendarAlt, FaLock } from 'react-icons/fa';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { booking, totalamount } = location.state || {};

  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);

  if (!booking) {
    return (
      <p style={{ textAlign: 'center', marginTop: '100px' }}>
        No booking data found. Please try again.
      </p>
    );
  }

  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, '')
      .slice(0, 16)
      .replace(/(.{4})/g, '$1 ')
      .trim();
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const formatExpiryDate = (value) => {
    let cleaned = value.replace(/\D/g, '').slice(0, 4);
    if (cleaned.length >= 3) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
    return cleaned;
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    setExpiry(formatted);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (!cardNumber || !cardName || !expiry || !cvv) {
      return alert('Please fill in all fields');
    }

    setLoading(true);
    setTimeout(async () => {
      try {
        const res = await fetch(`${BASE_URL}/booking`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(booking),
        });

        const result = await res.json();

        if (!res.ok) {
          setLoading(false);
          return alert(result.message || 'Booking failed');
        }

        setLoading(false);
        navigate('/thank-you');
      } catch (err) {
        setLoading(false);
        alert('Payment failed: ' + err.message);
      }
    }, 2000);
  };

  return (
    <div className="payment-container" style={{
      maxWidth: '450px',
      margin: '2rem auto',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      backgroundColor: '#fff'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Payment</h2>
      <p style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        Total Amount: <strong>${totalamount}</strong>
      </p>
      <Form onSubmit={handlePaymentSubmit}>
        <FormGroup>
          <label><FaCreditCard /> Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="1234 5678 9012 3456"
            required
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              borderRadius: '8px',
              border: '1px solid #ccc'
            }}
          />
        </FormGroup>
        <FormGroup>
          <label><FaUser /> Name on Card</label>
          <input
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="Full Name"
            required
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              borderRadius: '8px',
              border: '1px solid #ccc'
            }}
          />
        </FormGroup>
        <FormGroup>
          <label><FaCalendarAlt /> Expiry Date</label>
          <input
            type="text"
            maxLength="5"
            value={expiry}
            onChange={handleExpiryChange}
            placeholder="MM/YY"
            required
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              borderRadius: '8px',
              border: '1px solid #ccc'
            }}
          />
        </FormGroup>
        <FormGroup>
          <label><FaLock /> CVV</label>
          <input
            type="password"
            maxLength="3"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="123"
            required
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              borderRadius: '8px',
              border: '1px solid #ccc'
            }}
          />
        </FormGroup>
        <Button
          type="submit"
          color="primary"
          disabled={loading}
          className="w-100"
          style={{
            padding: '12px',
            fontSize: '16px',
            marginTop: '15px',
            borderRadius: '8px'
          }}
        >
          {loading ? 'Processing...' : 'Pay & Confirm Booking'}
        </Button>
      </Form>
    </div>
  );
};

export default Payment;
