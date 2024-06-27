import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { Typography, Badge, Space } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import logo from "../assets/logo.jpg";
import '../Dashcss/Navbar.css';

const AppHeader = () => {
  const [messageCount, setMessageCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Fetch message count
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          "https://musahealthcareapi.onrender.com/contact/getAllContacts"
        );
        setMessageCount(response.data.data.length);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    // Fetch appointment count
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "https://musahealthcareapi.onrender.com/appointment/getAllAppointments"
        );
        setAppointmentCount(response.data.data.length);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchMessages();
    fetchAppointments();

    // Update the current time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // Format the current time
  const formattedTime = currentTime.toLocaleTimeString();
  const formattedDate = currentTime.toLocaleDateString();

  return (
    <div className="AppHeader">
      <div className="logodash">
        <img src={logo} alt="Logo" className="logo" />
        <span> Musa_Healthcare</span>
      </div>
      <Typography.Title level={3} className="title">
        Muganga Dashboard
      </Typography.Title>

      <div className="time-container">
        <Typography.Text className="time-text">
          {formattedDate} {formattedTime}
        </Typography.Text>
      </div>

      <Space size="large" className="large">
        <Badge count={appointmentCount}>
          <UserOutlined style={{ fontSize: 24 }} />
        </Badge>
        <Badge count={messageCount}>
          <BellOutlined style={{ fontSize: 24 }} />
        </Badge>
      </Space>
    </div>
  );
};

export default AppHeader;
