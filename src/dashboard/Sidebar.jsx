import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaHome, FaCapsules, FaCalendarAlt, FaUserFriends, FaFileMedicalAlt, FaListAlt, FaUserMd, FaCog, FaSignOutAlt, FaTasks, FaTree } from "react-icons/fa";
import { Link } from "react-router-dom";
import '../Dashcss/sidebar.css'

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleOutsideClick = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setShowSidebar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div className="toggle-btn" onClick={toggleSidebar}>
      {showSidebar ? <FaTimes style={{ fontSize: '24px', color: '#BDDD85' }} /> : <FaBars style={{ fontSize: '24px', color: '#BDDD85' }} />}
      </div>
      <div className={`sidebar ${showSidebar ? 'active' : ''}`} ref={sidebarRef}>
        <Link to="/dash1" className="sidebar-item">
          <FaHome /> Dashboard
        </Link>
        <Link to="/imiti" className="sidebar-item">
          <FaCapsules /> Imiti
        </Link>
        <Link to="/appointments" className="sidebar-item">
          <FaCalendarAlt /> Randevu
        </Link>
        <Link to="/patients" className="sidebar-item">
          <FaUserFriends /> Abarwayi
        </Link>
        <Link to="/services" className="sidebar-item">
          <FaTasks /> Services
        </Link>
        <Link to="/partners" className="sidebar-item">
          <FaUserMd /> Abafatanyabikorwa
        </Link>
        <Link to="/tree" className="sidebar-item">
          <FaTree /> Ibiti bivura
        </Link>
        <Link to="/Medicadisease" className="sidebar-item">
          <FaFileMedicalAlt /> Irwara
        </Link>
        <Link to="/medical-plantation" className="sidebar-item">
          <FaListAlt /> Medical Plantation
        </Link>
        <Link to="/testimony" className="sidebar-item">
          <FaCog /> Ubuhamya
        </Link>
        <Link to="/message" className="sidebar-item">
          <FaCog /> Message
        </Link>
        <Link to="/alluser" className="sidebar-item">
          <FaUserMd /> Abanyamuryango
        </Link>
        <Link to="/setting" className="sidebar-item">
          <FaUserMd /> Igenamiterere
        </Link>
        <Link to="/" className="sidebar-item">
          <FaSignOutAlt /> Sohoka
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
