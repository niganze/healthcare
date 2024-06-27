import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes
import '../css/RespNav.css';
import { IoMdClose } from "react-icons/io";

function RespNav({ toggleMenu }) {
  return (
    <div className="containerR">
      <div className='close'><IoMdClose onClick={toggleMenu} /></div>
      <div className="inner-container">
        <ul>
          <li><Link to="/home" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/about" onClick={toggleMenu}>About Us</Link></li>
          <li><Link to="/ser" onClick={toggleMenu}>Services</Link></li>
          <li><Link to="/blog" onClick={toggleMenu}>Blog</Link></li>
          <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
          <li><Link to="/plantmedicine" onClick={toggleMenu}>Farms</Link></li>
          <li><Link to="/medicines" onClick={toggleMenu}>Medicines</Link></li>
        </ul>
      </div>
    </div>
  );
}

// Define propTypes for RespNav component
RespNav.propTypes = {
  toggleMenu: PropTypes.func.isRequired, // toggleMenu is a required function prop
};

export default RespNav;

