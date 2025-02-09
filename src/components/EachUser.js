import React from 'react';

const EachUser = ({ user, onEdit, onDelete }) => {
  return (
    <tr className="user-item">
      <td className="cell-id">{user.id}</td>
      <td className="cell-text">{user.firstName || user.name.split(' ')[0]}</td>
      <td className="cell-text">{user.lastName || user.name.split(' ')[1]}</td>
      <td className="cell-email">{user.email}</td>
      <td className="cell-text department">{user.department || user.company.name}</td>
      <td className="action-buttons">
        <button onClick={onEdit} aria-label={`Edit user ${user.id}`}>Edit</button>
        <button onClick={onDelete} aria-label={`Delete user ${user.id}`}>Delete</button>
      </td>
    </tr>
  );
};

export default EachUser;