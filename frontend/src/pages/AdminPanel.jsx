import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/adminPanel.css';

const AdminPanel = () => {
  return (
    <div className="admin-container">
      <UserManagement />
      <TourManagement />
    </div>
  );
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [userError, setUserError] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });
      setUsers(res.data.data);
    } catch (err) {
      console.error('Error fetching users:', err.response?.data || err.message);
      setUserError('Failed to fetch users.');
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`http://localhost:4000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });
      setUsers(prev => prev.filter(user => user._id !== id));
    } catch (err) {
      alert('Failed to delete user');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="admin-section">
      <h2>User Management</h2>
      {loadingUsers ? (
        <p>Loading users...</p>
      ) : userError ? (
        <p className="error">{userError}</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleDeleteUser(user._id)} className="delete-btn">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const TourManagement = () => {
  const [tours, setTours] = useState([]);
  const [formData, setFormData] = useState({
    title: '', city: '', address: '', distance: '', photo: '',
    desc: '', price: '', maxGroupSize: '', featured: false
  });
  const [editingId, setEditingId] = useState(null);

  const fetchTours = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/tours');
      setTours(res.data.data);
    } catch (err) {
      console.error('Failed to fetch tours', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingId
      ? `http://localhost:4000/api/tours/${editingId}`
      : 'http://localhost:4000/api/tours';

    try {
      if (editingId) {
        await axios.put(url, formData);
      } else {
        await axios.post(url, formData);
      }
      setFormData({
        title: '', city: '', address: '', distance: '',
        photo: '', desc: '', price: '', maxGroupSize: '', featured: false
      });
      setEditingId(null);
      fetchTours();
    } catch (err) {
      console.error('Error saving tour:', err);
    }
  };

  const handleEdit = (tour) => {
    setFormData(tour);
    setEditingId(tour._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this tour?')) return;
    try {
      await axios.delete(`http://localhost:4000/api/tours/${id}`);
      fetchTours();
    } catch (err) {
      console.error('Failed to delete tour:', err);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  return (
    <div className="admin-section">
      <h2>Tour Management</h2>

      <form onSubmit={handleSubmit} className="tour-form">
        <h3>{editingId ? 'Edit Tour' : 'Add New Tour'}</h3>
        {['title', 'city', 'address', 'distance', 'photo', 'desc', 'price', 'maxGroupSize'].map(field => (
          <input
            key={field}
            type={['distance', 'price', 'maxGroupSize'].includes(field) ? 'number' : 'text'}
            name={field}
            placeholder={field}
            value={formData[field]}
            onChange={handleChange}
            required
          />
        ))}
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />
          Featured
        </label>
        <button type="submit">{editingId ? 'Update' : 'Add'} Tour</button>
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>City</th>
            <th>Price</th>
            <th>Distance</th>
            <th>Group Size</th>
            <th>Featured</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tours.map(tour => (
            <tr key={tour._id}>
              <td>{tour.title}</td>
              <td>{tour.city}</td>
              <td>${tour.price}</td>
              <td>{tour.distance} km</td>
              <td>{tour.maxGroupSize}</td>
              <td>{tour.featured ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => handleEdit(tour)}>Edit</button>{' '}
                <button onClick={() => handleDelete(tour._id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
