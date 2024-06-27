import "../css/Services.css";
import SS from '../assets/about-remove-remove.jpg';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t } = useTranslation();

  return (
    <>
      <h3 style={{ textAlign: 'center' }}>{t("Our Services")}</h3>
      <div className="services-container">
        <div className="first_service">
          <div className="service">
            <div className="service-heading">
              <img src={SS} alt="Service Logo" className="service-logo" />
              <h2>{t("Medicine")}</h2>
            </div>
            <p>{t("Mussa provides essential medical services using a diverse range of traditional Rwandan remedies, ensuring holistic care for those in need")}</p>
          </div>
          <div className="service">
            <div className="service-heading">
              <img src={SS} alt="Service Logo" className="service-logo" />
              <h2>{t("Awareness of Missing Medicine")}</h2>
            </div>
            <p>{t("Awareness of Missing Medicine service ensures access to essential medications through the utilization of diverse Rwandan traditional remedies.")}</p>
          </div>
          <div className="service">
            <div className="service-heading">
              <img src={SS} alt="Service Logo" className="service-logo" />
              <h2>{t("Providing Medicine Knowledge")}</h2>
            </div>
            <p>{t("Provides essential medicine knowledge to healthcare professionals, leveraging the efficacy of various Rwandan traditional remedies to serve medical needs effectively.")}</p>
          </div>
        </div>
        <div className="image-service">
          <img src={SS} alt="Service Image" />
        </div>
        <div className="second_service">
          <div className="service">
            <div className="service-heading">
              <img src={SS} alt="Service Logo" className="service-logo" />
              <h2>{t("Grow Medicinal Plants")}</h2>
            </div>
            <p>{t("Promoting cooperatives to grow medicinal plants is Mussa's service to empower healthcare providers with diverse Rwandan traditional remedies, fostering a healthier community.")}</p>
          </div>
          <div className="service">
            <div className="service-heading">
              <img src={SS} alt="Service Logo" className="service-logo" />
              <h2>{t("Job Creation")}</h2>
            </div>
            <p>{t("Through the development of the medical industry, job creation is promoted, providing employment opportunities and economic growth.")}</p>
          </div>
          <div className="service">
            <div className="service-heading">
              <img src={SS} alt="Service Logo" className="service-logo" />
              <h2>{t("Motivation In Plant Conservation")}</h2>
            </div>
            <p>{t("Motivation in plant conservation drives efforts to protect and preserve the diversity of plant species, ensuring their survival for future generations.")}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
