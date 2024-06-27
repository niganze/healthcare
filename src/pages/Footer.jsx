import '../css/Footer.css'; 
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaWhatsapp, FaGoogle, FaTiktok } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Footer = () => {

  const handleWhatsAppClick = () => {
    // Constructing the WhatsApp link
    const phoneNumber = '+250785444477';
    const whatsappLink = `https://api.whatsapp.com/send?phone=${encodeURIComponent(phoneNumber)}`;

    // Opening the WhatsApp link in a new tab
    window.open(whatsappLink, '_blank', 'noopener,noreferrer');
  }

  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>{t('About Us')}</h2>
          <p>{t('Empowering Communities Through Traditional Healing Wisdom and Modern Healthcare Integration.')}</p>
          <div className="socials">
            <a href="#"><FaFacebook color='0862F7' /></a>
            <a href="#"><FaTwitter color='1C96E8' /></a>
            <a href="#"><FaInstagram color='F70166' /></a>
            <a href="#"><FaYoutube color='red' /></a>
             <a href="#" onClick={handleWhatsAppClick}>
              <FaWhatsapp color='4ADF61' />
            </a>
            <a href="#"><FaGoogle color='F3B604' /></a>
            <a href="#"><FaTiktok color='000000' /></a>
          </div>
        </div>
        <div className="footer-section links">
          <h2>{t('Quick Links')}</h2>
          <ul className='footer_links'>
            <li><a href="#">{t('Home')}</a></li>
            <li><a href="#">{t('About Us')}</a></li>
            <li><a href="#">{t('Services')}</a></li>
            <li><a href="#">{t('Blog')}</a></li>
            <li><a href="#">{t('Contact')}</a></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h2>{t('Contact Us')}</h2>
          <div className="contact-info">
            <p><FaMapMarkerAlt /> {t('Bugesera, Nyamata')}</p>
            <p><FaPhone /> +250 785444477</p>
            <p><FaEnvelope /> kayirangamussa74@gmail.com</p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 {t('Mussa Healthcare. All rights reserved.')}</p>
      </div>
    </footer>
  );
}

export default Footer;
