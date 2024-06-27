import { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Testimonials.css';
import INESS from '../assets/iness.jpeg';
import NIRDA from '../assets/nirda-1.jpg';
import UNISECCO from '../assets/unesco.png';
import REMA from '../assets/rema.jpg';
import { useTranslation } from 'react-i18next';

const Testimonials = () => {
  const { t } = useTranslation();
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    axios.get('https://musahealthcareapi.onrender.com/testimony/getTestimony')
      .then(response => {
        setTestimonials(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching testimonies:', error);
      });
  }, []);

  return (
    <>
      <h3 style={{ textAlign: 'center' }}>{t("Testimonial")}</h3>
      <div className="testimonials-container">
        <div className="testimonials">
          {testimonials.map((testimonial, index) => (
            <div key={index} className={`testimonial ${index % 2 === 0 ? 'left' : 'right'}`}>
              <img src={testimonial.image} alt="Testimonial Image" />
              <div className="testimonial-details">
                {testimonial.diseases && testimonial.diseases.length > 0 ? (
                  <>
                    <h2>{t("Disease Treated")}: {testimonial.diseases[0].name}</h2>
                    <p>{t("Symptoms")}: {testimonial.diseases[0].symptoms.join(', ')}</p>
                    <p>{t("Description")}: {testimonial.diseases[0].description}</p>
                    <p>{t("How It Attacks")}: {testimonial.diseases[0].howItAttacks}</p>
                  </>
                ) : (
                  <p>{t("No disease information available")}</p>
                )}
                <p>{t("Testimonial")}: {testimonial.maintestimony}</p>
                <p>{t("Contact")}: {testimonial.name}</p>
                <p>{t("Date")}: {testimonial.date}</p>
              </div>
            </div>
          ))}
        </div>
        <h3 style={{ textAlign: 'center' }}>{t("Official Partners")}</h3>
        <div className="partners">
          <div className="musa_partners">
            <a href="https://www.unesco.org/en/brief" target="_blank" rel="noopener noreferrer">
              <img src={UNISECCO} alt="UNESCO" />
              <p>{t("United Nations Educational, Scientific and Cultural Organization")}</p>
            </a>
          </div>
          <div className="musa_partners">
            <a href="http://ephyto.ines.ac.rw/" target="_blank" rel="noopener noreferrer">
              <img src={INESS} alt="INESS" />
              <p>{t("Though medicinal plants benefits are known to the common Rwandans, their use is sought by rural communities and less in urban because many prospective.")}</p>
            </a>
          </div>
          <div className="musa_partners">
            <a href="https://www.nirda.gov.rw/" target="_blank" rel="noopener noreferrer">
              <img src={NIRDA} alt="NIRDA" />
              <p>{t("The National Industrial Research and Development Agency (NIRDA).")}</p>
            </a>
          </div>
          <div className="musa_partners">
            <a href="https://www.rema.gov.rw/home" target="_blank" rel="noopener noreferrer">
              <img src={REMA} alt="REMA" />
              <p>{t("Rwanda Environment Management Authority")}</p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonials;
