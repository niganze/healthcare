import LL from '../assets/logo.jpg';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMenu, IoLanguage } from "react-icons/io5";
import RespNav from './RespNav';
import { useTranslation } from 'react-i18next';
import eng from '../assets/uk-flag.svg';
import rw from '../assets/rwanda-svg.svg';
import fr from '../assets/fr.svg';
import '../css/Header.css';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleLanguageMenu = () => {
    setLanguageOpen(!languageOpen);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguageOpen(false); // Close dropdown after selecting a language
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userEmail');
    setUserEmail(null);
    navigate('/login');
  };

  return (
    <div className="navbar">
      {isOpen && <RespNav toggleMenu={toggleMenu} />}
      <div className="logo">
        <img src={LL} alt="Logo" />
        <span className="logo_name">
          <Link to="/">Mussa_Healthcare</Link>
        </span>
      </div>
      <div className="nav_links">
        <ul>
          <li><Link to="/home">{t('Home')}</Link></li>
          <li><Link to="/about">{t('About Us')}</Link></li>
          <li><Link to="/ser">{t('Services')}</Link></li>
          <li><Link to="/blog">{t('Blog')}</Link></li>
          <li><Link to="/contact">{t('Contact')}</Link></li>
          <li><Link to="/plantmedicine">{t('Farms')}</Link></li>
          <li><Link to="/medicines">{t('Medicines')}</Link></li>
        </ul>
      </div>
      <div className="small_device">
        {userEmail ? (
          <div className="login-button">
            <span className="user-email">{userEmail}</span>
            <button onClick={handleLogout} className="logout_btn">
              {t('Logout')}
            </button>
          </div>
        ) : (
          <div className="login-button">
            <Link to="/login" className="login_btn">
              {t('Login')}
            </Link>
          </div>
        )}
        <div className="language-selector">
          <IoLanguage onClick={toggleLanguageMenu} className="language-icon" />
          {languageOpen && (
            <ul className="language-dropdown">
              <li onClick={() => changeLanguage('en')}>
                <img src={eng} alt="English" className="flag-icon" />
                {t('English')}
              </li>
              <li onClick={() => changeLanguage('rw')}>
                <img src={rw} alt="Kinyarwanda" className="flag-icon" />
                {t('Kinyarwanda')}
              </li>
              <li onClick={() => changeLanguage('fr')}>
                <img src={fr} alt="Français" className="flag-icon" />
                {t('Français')}
              </li>
            </ul>
          )}
        </div>
        <div className="toggle-menu" onClick={toggleMenu}>
          <IoMenu />
        </div>
      </div>
    </div>
  );
};

export default Header;
