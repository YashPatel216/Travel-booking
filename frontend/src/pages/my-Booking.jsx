import React, { useEffect, useState, useContext } from 'react';
import '../styles/myBookings.css'
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  const [editBookingId, setEditBookingId] = useState(null);
const [editForm, setEditForm] = useState({
  guestSize: '',
  phone: '',
  bookAt: ''
});

const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirm) return;
    const res = await fetch(`${BASE_URL}/booking/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    const data = await res.json();
    if (res.ok) {
      setBookings(prev => prev.filter(booking => booking._id !== id));
    } else {
      alert(data.message);
    }
  };
  
  const handleEditSubmit = async (id) => {
    const res = await fetch(`${BASE_URL}/booking/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(editForm)
    });
    const data = await res.json();
    if (res.ok) {
      setBookings(prev =>
        prev.map(booking =>
          booking._id === id ? data.data : booking
        )
      );
      setEditBookingId(null);
    } else {
      alert(data.message);
    }
  };
  

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (!user || !user._id) return;

        const res = await fetch(`${BASE_URL}/booking/user/${user._id}`, {
          credentials: 'include',
        });

        const result = await res.json();
        if (res.ok) {
          setBookings(result.data);
        } else {
          console.error(result.message);
        }
      } catch (err) {
        console.error('Error fetching bookings:', err);
      }
    };

    fetchBookings();
  }, [user]);

  return (
    <div className="my-bookings">
      <h2 className="heading">📖 My Bookings</h2>
      {bookings.length === 0 ? (
        <p className="no-bookings">No bookings yet.</p>
      ) : (
        <div className="booking-list">
        {bookings.map((booking) => (
            <div key={booking._id} className="booking-card">
              {editBookingId === booking._id ? (
                <>
                  <h3>{booking.tourName}</h3>
                  <input
                    type="number"
                    placeholder="Guest Size"
                    value={editForm.guestSize}
                    onChange={(e) => setEditForm({ ...editForm, guestSize: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Phone"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  />
                  <input
                    type="date"
                    value={editForm.bookAt}
                    onChange={(e) => setEditForm({ ...editForm, bookAt: e.target.value })}
                  />
                  <button onClick={() => handleEditSubmit(booking._id)}>Save</button>
                  <button onClick={() => setEditBookingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <h3>{booking.tourName}</h3>
                  <p><strong>Name:</strong> {booking.fullName}</p>
                  <p><strong>Phone:</strong> {booking.phone}</p>
                  <p><strong>Guests:</strong> {booking.guestSize}</p>
                  <p><strong>Booking Date:</strong> {new Date(booking.bookAt).toLocaleDateString()}</p>
                  <div className="booking-actions">
                    <button onClick={() => {
                      setEditBookingId(booking._id);
                      setEditForm({
                        guestSize: booking.guestSize,
                        phone: booking.phone,
                        bookAt: booking.bookAt.split('T')[0]
                      });
                    }}>Edit</button>
                    <button onClick={() => handleDelete(booking._id)}>Cancel</button>
                  </div>
                </>
              )}
            </div>
          ))}
          
        </div>
      )}
    </div>
  );
};

export default MyBookings;
