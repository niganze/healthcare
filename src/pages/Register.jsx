import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../css/Register.css';

const Register = () => {
  const { t } = useTranslation();
  const [fullNames, setFullName] = useState('');
  const [sex, setSex] = useState('Male');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://musahealthcareapi.onrender.com/auth/signup', {
        fullNames,
        sex,
        email,
        password,
        phoneNumber,
        location,
      });
      console.log('Registration successful:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Error registering:', error);
      setError(t('Registration failed. Please try again.'));
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>{t('Registration Form')}</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="fullName">{t('Full Name')}:</label>
          <input
            type="text"
            id="fullName"
            value={fullNames}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="sex">{t('Sex')}:</label>
          <select
            id="sex"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            required
          >
            <option value="Male">{t('Male')}</option>
            <option value="Female">{t('Female')}</option>
            <option value="Other">{t('Other')}</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="email">{t('Email')}:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">{t('Password')}:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">{t('Phone Number')}:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">{t('Location')}:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn">{t('Register')}</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
