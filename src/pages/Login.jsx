import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "../css/Login.css";

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [resetError, setResetError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [resetModal, setResetModal] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://musahealthcareapi.onrender.com/auth/login",
        {
          email,
          password,
        }
      );
      console.log("Login successful:", response.data);
      localStorage.setItem("accessToken", response.data.access_token);
      localStorage.setItem("userEmail", response.data.user.email); // Store user's email
      setEmail(response.data.user.email); // Set user's email in state

      // Check if response contains data and role property
      const role = response.data.user.role;
      console.log("User role:", role); // Log user role

      // Redirect based on user's role
      if (role === "admin") {
        navigate("/dash1");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError(t('Invalid email or password. Please try again.'));
    }
  };

  const handleForgotPassword = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSendResetRequest = async () => {
    try {
      await axios.post("https://musahealthcareapi.onrender.com/auth/forget", {
        email,
      });
      setShowModal(false);
      setResetModal(true);
    } catch (error) {
      console.error("Error sending reset password email:", error);
      setResetError(t('Failed to send reset password email. Please try again.'));
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      console.log(email, otp, newpassword);
      const response = await axios.post(
        "https://musahealthcareapi.onrender.com/auth/reset",
        {
          email,
          otp,
          newpassword,
        }
      );

      console.log("Password reset successful:", response.data);
      setResetModal(false);
    } catch (error) {
      console.error("Error resetting password:", error);
      setResetError(t('Failed to reset password. Please try again.'));
    }
  };

  return (
    <div className="loginpage">
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>{t('Musa Healthcare Login')}</h2>
          
          {error && <p className="error-message">{error}</p>}
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
            <button type="submit" className="btn">
              {t('INJIRA')}
            </button>
          </div>
          <div className="form-group">
            <a href="#" onClick={handleForgotPassword}>
              {t('Forgot Password? Click here.')}
            </a>
          </div>
          <div>
            <p>
              {t("Don't have an account?")} <Link to="/register">{t('Register here')}</Link>
            </p>
          </div>
        </form>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleCloseModal}>
                &times;
              </span>
              <h2>{t('Forgot Password')}</h2>
              <p>{t('Please enter your email to reset your password:')}</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {resetError && <p className="error-message">{resetError}</p>}
              <button onClick={handleSendResetRequest}>{t('Send Reset Email')}</button>
            </div>
          </div>
        )}

        {resetModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setResetModal(false)}>
                &times;
              </span>
              <h2>{t('Reset Password')}</h2>
              <p>{t('Please enter your email and OTP to reset your password:')}</p>
              <div className="form-group">
                <label htmlFor="resetEmail">{t('Email')}:</label>
                <input
                  type="email"
                  id="resetEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="otp">{t('Enter OTP')}:</label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">{t('New Password')}:</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newpassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <button onClick={handleResetPassword}>{t('Reset Password')}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
