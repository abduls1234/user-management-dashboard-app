import React, { useEffect, useState, useCallback } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import ErrorBoundary from './components/ErrorBoundary';
import Pagination from './components/Pagination';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  const [allUsers, setAllUsers] = useState([]); // Complete list of all users
  const [users, setUsers] = useState([]); // Users for the current page
  const [userToEdit, setUserToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10); // Show 10 users per page
  const [totalUsers, setTotalUsers] = useState(0);
  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      console.log('Fetching all users');
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      const departments = [
        "Human Resources", "Sales", "Marketing", "Finance", "Engineering", "IT Support",
        "Customer Service", "Legal", "Operations", "Research and Development (R&D)",
        "Product Management", "Quality Assurance", "Purchasing", "Administration", "Business Development"
      ];
      const usersWithDepartments = response.data.map(user => ({
        ...user,
        department: departments[Math.floor(Math.random() * departments.length)]
      }));

      setAllUsers(usersWithDepartments);
      setTotalUsers(usersWithDepartments.length);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      toast.error('Failed to fetch users. Please try again later.');
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    setUsers(allUsers.slice(indexOfFirstUser, indexOfLastUser));
  }, [allUsers, currentPage, usersPerPage]);

  // Add user function
  const addUser = async (newUser) => {
    try {
      // Generate a unique ID for the new user
      const newUserWithId = { ...newUser, id: totalUsers + 1, department: "Unknown" };

      // Update the total users count
      const newTotalUsers = totalUsers + 1;
      setTotalUsers(newTotalUsers);

      // Calculate the next page where the new user should appear
      const nextPage = Math.ceil(newTotalUsers / usersPerPage);

      // Add the new user to the complete users list
      setAllUsers((prevUsers) => [...prevUsers, newUserWithId]);

      // Redirect to the next page
      setCurrentPage(nextPage);
      navigate(`/page/${nextPage}`);

      toast.success('User added successfully');
    } catch (error) {
      setError(error);
      toast.error('Failed to add user');
    }
  };

  const deleteUser = async (id) => {
    try {
      const updatedUsers = allUsers.filter(user => user.id !== id);
      setAllUsers(updatedUsers);
      setTotalUsers(totalUsers - 1);

      if (updatedUsers.length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1); // Go to the previous page if the current page is empty
      }

      toast.success('User deleted successfully');
    } catch (error) {
      setError(error);
      toast.error('Failed to delete user');
    }
  };

  const updateUser = async (updatedUser) => {
    try {
      const updatedUsers = allUsers.map(user => user.id === updatedUser.id ? updatedUser : user);
      setAllUsers(updatedUsers);

      toast.success('User updated successfully');
    } catch (error) {
      setError(error);
      toast.error('Failed to update user');
    }
  };

  // Handle pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`/page/${pageNumber}`);
  };

  return (
    <div className="App">
      <ToastContainer autoClose={3000} hideProgressBar={false} newestOnTop closeButton={false} position="top-right" />
      <ErrorBoundary>
        {error && <div className="error">Error: {error.message}</div>}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Routes>
            <Route exact path="/" element={
              <>
                <UserForm addUser={addUser} userToEdit={userToEdit} updateUser={updateUser} />
                <UserList users={users} deleteUser={deleteUser} setUserToEdit={setUserToEdit} />
                <Pagination
                  usersPerPage={usersPerPage}
                  totalUsers={totalUsers}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </>
            }/>
            <Route path="/page/:page" element={
              <>
                <UserForm addUser={addUser} userToEdit={userToEdit} updateUser={updateUser} />
                <UserList users={users} deleteUser={deleteUser} setUserToEdit={setUserToEdit} />
                <Pagination
                  usersPerPage={usersPerPage}
                  totalUsers={totalUsers}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </>
            }/>
          </Routes>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default App;
