import { useState } from "react";
import axios from 'axios';
import "../css/Home.css"; 
import HH from "../assets/home-remove.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import About from "./About";
import Services from "./Services";
import Testimonials from "./Testimonials";
import Contact from "./Contact";
import Video from "./Video";
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  const [date, setdate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [Time, setTime] = useState("");
  const [Telephone, setTelephone] = useState("");
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [formErrors, setFormErrors] = useState({
    date: "",
    Time: "",
    Telephone: "",
    Email: "",
    Name: "",
    description: ""
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    let errors = {};
    let formIsValid = true;

    if (!date) {
      errors.date = t("Date is required");
      formIsValid = false;
    }

    if (!Time) {
      errors.Time = t("Suitable Time is required");
      formIsValid = false;
    }

    if (!Telephone) {
      errors.Telephone = t("Telephone is required");
      formIsValid = false;
    }

    if (!Email) {
      errors.Email = t("Email is required");
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(Email)) {
      errors.Email = t("Email address is invalid");
      formIsValid = false;
    }

    if (!Name) {
      errors.Name = t("Name is required");
      formIsValid = false;
    }

    if (!description) {
      errors.description = t("Description is required");
      formIsValid = false;
    }

    if (formIsValid) {
      try {
        const appointmentData = {
          date: date.toISOString(), // Convert date to ISO string format
          Time,
          Name,
          description,
          Telephone,
          Email,
        };

        // Send appointment data to the backend API
        await axios.post('https://musahealthcareapi.onrender.com/appointment/createAppointment', appointmentData);

        console.log("Appointment submitted successfully:", appointmentData);

        // Reset form fields
        setdate(new Date());
        setTime("");
        setName("");
        setDescription("");
        setTelephone("");
        setEmail("");
        setShowForm(false);
        // Reset form errors
        setFormErrors({
          date: "",
          Time: "",
          Telephone: "",
          Email: "",
          Name: "",
          description: ""
        });

        // Show success message
        setShowSuccessMessage(true);
        // Hide success message after 5 seconds
        setTimeout(() => setShowSuccessMessage(false), 5000);
      } catch (error) {
        console.error("Error submitting appointment:", error);
        // Handle error: display an error message to the user
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <>
      <div className="home_content">
        <div className="container">
          <div className="content">
            <h1>{t("We Care for Your Health Every Moment")}</h1>
            <p>
              {t("Empowering Communities Through the Fusion of Traditional Healing Wisdom and Modern Healthcare Practices.")}
            </p>
            <button onClick={toggleForm}>{t("Make an Appointment")}</button>
          </div>
          <div className="image">
            <img src={HH} alt="Healthcare Image" />
          </div>
        </div>
        {showForm && (
          <div className="popup">
            <div className="popup-inner">
              <h2>{t("Appointment Form")}</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="date">{t("Pick Date:")}</label>
                    <DatePicker
                      selected={date}
                      onChange={(date) => setdate(date)}
                    />
                    {formErrors.date && <span className="error">{formErrors.date}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="Time">{t("Suitable Time:")}</label>
                    <select
                      id="Time"
                      value={Time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                    >
                      <option value="">{t("Select suitable Time")}</option>
                      <option value="Morning">{t("Morning")}</option>
                      <option value="Afternoon">{t("Afternoon")}</option>
                    </select>
                    {formErrors.Time && <span className="error">{formErrors.Time}</span>}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="Telephone">{t("Telephone:")}</label>
                    <input
                      type="tel"
                      id="Telephone"
                      value={Telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                      placeholder={t("Enter your Telephone")}
                      required
                    />
                    {formErrors.Telephone && <span className="error">{formErrors.Telephone}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="Email">{t("Email:")}</label>
                    <input
                      type="Email"
                      id="Email"
                      value={Email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("Enter your Email")}
                      required
                    />
                    {formErrors.Email && <span className="error">{formErrors.Email}</span>}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">{t("Name:")}</label>
                    <input
                      type="text"
                      id="name"
                      value={Name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t("Enter your name")}
                      required
                    />
                    {formErrors.Name && <span className="error">{formErrors.Name}</span>}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="description">{t("Description for Diseases Faced:")}</label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={t("Enter description")}
                    required
                  />
                  {formErrors.description && <span className="error">{formErrors.description}</span>}
                </div>
                <div className="buttons">
                  <button type="submit">{t("Submit")}</button>
                  <button type="button" onClick={toggleForm}>
                    {t("Cancel")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {showSuccessMessage && (
          <div className="success-message">
            {t("Murakoze gutaga randevu yanyu mwihange mutegere mugaga abasubize kurii email")}
          </div>
        )}
      </div>
      <section>
        <About />
      </section>
      <Services />
      <Testimonials />
      <Video />
      <Contact />
    </>
  );
};

export default Home;
