import { useState } from 'react';

const UserForm = ({ refreshUsers }) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    role: 'student'
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.name || !formData.password) {
      alert('Please fill all required fields');
      return;
    }
    
    try {
      const response = await fetch('https://userapp6.onrender.com/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create user');
      }
      
      // Reset form
      setFormData({
        email: '',
        name: '',
        password: '',
        role: 'student'
      });
      
      // Refresh user list
      refreshUsers();
      
    } catch (err) {
      console.error('Error creating user:', err);
      alert('Failed to create user. Please try again.');
    }
  };

  // Using table row structure to match the UI in screenshot
  return (
    <form onSubmit={handleSubmit} className="form-row">
      <div>#</div>
      <div>
        <input 
          type="email" 
          name="email" 
          placeholder="Enter User Email" 
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input 
          type="text" 
          name="name" 
          placeholder="Enter Name of User" 
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <select 
          name="role" 
          value={formData.role}
          onChange={handleChange}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div>
        <button type="submit" className="btn-add">Add User</button>
      </div>
      <input 
        type="password" 
        name="password" 
        value={formData.password}
        onChange={handleChange}
        required
        placeholder="Password"
        style={{ display: 'none' }}
      />
    </form>
  );
};

export default UserForm;