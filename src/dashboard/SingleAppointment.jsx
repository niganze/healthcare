import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar"; // Import calendar component
import "react-calendar/dist/Calendar.css"; // Import calendar CSS
import "../css/SingleAppointment.css"; // Import custom CSS file for styling

const SingleAppointment = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState({
    _id: "",
    Name: "",
    date: "",
    Time: "",
    Email: "",
    description: "",
    Telephone: "",
    Type: "Follow-up", // Additional static data - appointment type
    Location: "Hospital", // Additional static data - appointment location
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(
          `https://musahealthcareapi.onrender.com/appointment/getAppointmentById/${id}`
        );
        setAppointment(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching single appointment:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id]);

  const handleWhatsAppReply = () => {
    const phoneNumber = appointment.Telephone;
    const whatsappUrl = `whatsapp://send?phone=+250${phoneNumber}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleEmailReply = () => {
    const emailSubject = "Reply to your appointment";
    const emailBody = "Hello, I am contacting you regarding your appointment.";
    const mailtoUrl = `mailto:${appointment.Email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoUrl, "_blank");
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="single-appointment">
      <h2>Appointment Details</h2>
      <div className="appointment-info">
        <div className="left-column">
          <p><strong>Date:</strong> {appointment.date}</p>
          <p><strong>Time:</strong> {appointment.Time}</p>
          <p><strong>Type:</strong> {appointment.Type}</p>
          <p><strong>Location:</strong> {appointment.Location}</p>
        </div>
        <div className="right-column">
          <p><strong>ID:</strong> {appointment._id}</p>
          <p><strong>Name:</strong> {appointment.Name}</p>
          <p><strong>Email:</strong> {appointment.Email}</p>
          <p><strong>Telephone:</strong> {appointment.Telephone}</p>
        </div>
      </div>
      <div className="calendar-container">
        <h3>Appointment Calendar</h3>
        <div className="red-calendar">
          <Calendar value={new Date(appointment.date)} readOnly />
        </div>
      </div>

      <p className="description"><strong>Description:</strong> {appointment.description}</p>
      <div className="reply-button-container">
        <button className="reply-button" type="button" onClick={handleWhatsAppReply}>Reply via WhatsApp</button>
        <button className="reply-button" type="button" onClick={handleEmailReply}>Reply via Email</button>
      </div>
    </div>
  );
};

export default SingleAppointment;
