import { useState, useEffect } from 'react';
import '../css/About.css';
import AA from '../assets/about-remove.png';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  const [numPatients, setNumPatients] = useState(0);
  const [numLands, setNumLands] = useState(0);

  useEffect(() => {
    
    fetch('https://musahealthcareapi.onrender.com/patient/getAllPatients')
      .then(response => response.json())
      .then(data => {
        
        setNumPatients(data.data.length);
      })
      .catch(error => console.error('Error fetching number of patients:', error));

    
    fetch('https://musahealthcareapi.onrender.com/farm/getallfarms')
      .then(response => response.json())
      .then(data => {
        
        setNumLands(data.data.length);
      })
      .catch(error => console.error('Error fetching number of lands cultivated:', error));
  }, []);

  return (
    <>
      <h3 style={{ textAlign: 'center' }}>{t("About Us")}</h3>
      <div className="about-content">
        <div className="about-image">
          <img src={AA} alt="Musa's Profile" />
        </div>
        <div className="about-details">
          <h1>{t("Local healer cultivating and treating with indigenous remedies")}</h1>
          <p>{t("MUSSA is a local healer in Rwanda, dedicated to aiding communities facing diverse illnesses through the use of indigenous remedies known as UMUTI He not only treats ailments but also cultivates the plants necessary for creating these local medicines. Additionally, MUSSA conducts research on infectious diseases and their treatment using traditional medicine, offering insights into the efficient utilization of these remedies")}</p>
          <div className="about-cards">
            <div className="about-card">
              <h2>{t("Experienced years")}</h2>
              <p>45+ </p>
            </div>
            <div className="about-card">
              <h2>{t("Number of Patients Treated")}</h2>
              <p>{numPatients}+  </p>
            </div>
            <div className="about-card">
              <h2>{t("Number of Lands Cultivated")}</h2>
              <p>{numLands}+ </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
