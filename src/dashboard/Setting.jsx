import { useState } from 'react';
import axios from 'axios';
import '../Dashcss/Setting.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Setting = () => {
  const [currentpassword, setcurrentpassword] = useState('');
  const [newpassword, setnewpassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post(
        'https://musahealthcareapi.onrender.com/auth/change',
        {
          currentpassword,
          newpassword
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      console.log('Password change successful:', response.data);
      setSuccessMessage('Password changed successfully!');
      setcurrentpassword('');
      setnewpassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setSuccessMessage('');
      }, 2000); // Clear success message after 2 seconds
    } catch (error) {
      console.error('Error changing password:', error);
      setError('Failed to change password. Please try again.');
    }
  };

  const toggleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  return (
<div className="setting-container">
  <div className="change-password-form">
    <h3>Change Password</h3>
    {error && <p className="error-message">{error}</p>}
    {successMessage && <p className="success-message">{successMessage}</p>}
    <form onSubmit={handleChangePassword}>
      <div className="form-group">
        <label htmlFor="currentpassword">Current Password:</label>
        <div className="password-input">
          <input
            type={showCurrentPassword ? 'text' : 'password'}
            id="currentpassword"
            value={currentpassword}
            onChange={(e) => setcurrentpassword(e.target.value)}
            required
          />
          <span onClick={toggleShowCurrentPassword}>
            {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="newpassword">New Password:</label>
        <div className="password-input">
          <input
            type={showNewPassword ? 'text' : 'password'}
            id="newpassword"
            value={newpassword}
            onChange={(e) => setnewpassword(e.target.value)}
            required
          />
          <span onClick={toggleShowNewPassword}>
            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm New Password:</label>
         <div className="password-input">
         <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <span onClick={toggleShowNewPassword}>
            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
         </div>
        
      </div>
      <button type="submit" className="submit-btn">Change Password</button>
    </form>
  </div>
  {/* Add other settings related features here */}
</div>

  );
};

export default Setting;
