import { useState } from 'react';
import axios from 'axios';
import '../css/Contact.css'; 
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) {
      errors.name = t('Name is required');
    }
    if (!telephone.trim()) {
      errors.telephone = t('Telephone is required');
    }
    if (!email.trim()) {
      errors.email = t('Email is required');
    }
    if (!subject.trim()) {
      errors.subject = t('Subject is required');
    }
    if (!message.trim()) {
      errors.message = t('Message is required');
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post('https://musahealthcareapi.onrender.com/contact/createContact', {
          name,
          email,
          telephone,
          subject,
          message
        });
        setSuccessMessage(t('Your message has been sent successfully!'));

        setTimeout(() => {
          setSuccessMessage('');
        }, 1000);

        setName('');
        setEmail('');
        setTelephone('');
        setSubject('');
        setMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
        setErrorMessage(t('Failed to send message. Please try again later.'));
      }
    }
  };

  return (
    <>
      <h3 style={{ textAlign: 'center' }}>{t('Contact Us')}</h3>
      <div className="contact-container">
        <div className="contact-form">
          <h1>{t('GET IN TOUCH')}</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" placeholder={t('Enter your name')} value={name} onChange={(e) => setName(e.target.value)} />
              {errors.name && <p className="error-message">{errors.name}</p>}
            </div>
            <div className="form-group">
              <input type="tel" placeholder={t('Enter your telephone')} value={telephone} onChange={(e) => setTelephone(e.target.value)} />
              {errors.telephone && <p className="error-message">{errors.telephone}</p>}
            </div>
            <div className="form-group">
              <input type="email" placeholder={t('Enter your email')} value={email} onChange={(e) => setEmail(e.target.value)} />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            <div className="form-group">
              <input type="text" placeholder={t('Enter your subject')} value={subject} onChange={(e) => setSubject(e.target.value)} />
              {errors.subject && <p className="error-message">{errors.subject}</p>}
            </div>
            <div className="form-group">
              <textarea placeholder={t('Enter your message')} value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
              {errors.message && <p className="error-message">{errors.message}</p>}
            </div>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit">{t('Send')}</button>
          </form>
        </div>
        
        <div className="contact-info">
          <div style={{ width: '100%' }}>
            <iframe
              width="100%"
              height="550"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=Nyamata+(Mussa_Healthcare)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              title="Mussa_Healthcare_Location"
            >
            </iframe>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
