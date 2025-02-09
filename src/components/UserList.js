import React from 'react';
import EachUser from './EachUser';

const UserList = ({ users, deleteUser, setUserToEdit }) => {
  const handleDelete = (id) => {
    deleteUser(id);
  };

  const handleEdit = (id) => {
    const user = users.find(user => user.id === id);
    setUserToEdit(user);
  };

  return (
    <div>
      <h1>User Management Dashboard</h1>
      {users.length === 0 ? (
        <div>No users available</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <EachUser
                key={user.id}
                user={user}
                onEdit={() => handleEdit(user.id)}
                onDelete={() => handleDelete(user.id)}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;