import { useState } from 'react';
import UserEditModal from './UserEditModal';

const UserTable = ({ users, refreshUsers }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleEdit = (user) => {
    setCurrentUser(user);
    setShowEditModal(true);
  };

  const handleDelete = async (email) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`https://userapp6.onrender.com/deleteuser/${email}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete user');
        }
        
        refreshUsers();
      } catch (err) {
        console.error('Error deleting user:', err);
        alert('Failed to delete user. Please try again.');
      }
    }
  };

  return (
    <>
      <table className="user-table">
        <thead>
          <tr>
            <th>Sr.No.</th>
            <th>User Email</th>
            <th>User Name</th>
            <th>User Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id || index}>
              <td>{index + 1}</td>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(user)}>
                  Edit
                </button>
                <button className="btn-delete" onClick={() => handleDelete(user.email)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showEditModal && (
        <UserEditModal 
          user={currentUser} 
          onClose={() => setShowEditModal(false)}
          refreshUsers={refreshUsers}
        />
      )}
    </>
  );
};

export default UserTable;