import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const UserForm = ({ addUser, userToEdit, updateUser }) => {
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  });

  useEffect(() => {
    if (userToEdit) {
      setFormData({
        id: userToEdit.id || '',
        firstName: userToEdit.firstName || '',
        lastName: userToEdit.lastName || '',
        email: userToEdit.email || '',
        department: userToEdit.department || '',
      });
    }
  }, [userToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.department) {
      toast.error('Please fill out all fields');
      return;
    }
    if (!validateEmail(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (userToEdit) {
      updateUser(formData);
    } else {
      addUser(formData);
    }

    setFormData({ id: '', firstName: '', lastName: '', email: '', department: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        aria-label="First Name"
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        aria-label="Last Name"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        aria-label="Email"
        required
      />
      <input
        type="text"
        name="department"
        placeholder="Department"
        value={formData.department}
        onChange={handleChange}
        aria-label="Department"
        required
      />
      <button type="submit" disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.department}>
        {userToEdit ? 'Update User' : 'Add User'}
      </button>
    </form>
  );
};

export default UserForm;