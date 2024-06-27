// import  { useState,useEffect } from 'react';
// import '../css/FarmPage.css';
// import axios from "axios";

// const FarmPage = () => {
//     const [farms, setFarms] = useState([]);
//   useEffect(() => {
//     const fetchFarms = async () => {
//       try {
//         const response = await axios.get('https://musahealthcareapi.onrender.com/farm/getallfarms');
//         setFarms(response.data.data);
//       } catch (error) {
//         console.error('Error fetching farms:', error);
//       }
//     };

//     fetchFarms();
//   }, []);

//   return (
//     <div className="farm-page">
//       <h1>Farms</h1>
//       <div className="farms-container">
//         {farms.map((farm) => {
//             return(
//                 <div className="farm-card" key={farm.id}>
//                 <img className="farm-image" src={farm.images[2]} alt={farm.name} />
//                 <h2>{farm.name}</h2>
//                 <p>Location: {farm.locations}</p>
//                 <p>Number of Trees: {farm.trees.length}</p>
//                 <p>description: {farm.descrption}</p>
//                  <button type="button">Read More</button>
//               </div>
//             )
//             })}
//       </div>
//     </div>
//   );
// };

// export default FarmPage;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/FarmPage.css";
import axios from "axios";

const FarmPage = () => {
  const [farms, setFarms] = useState([]);

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const response = await axios.get(
          "https://musahealthcareapi.onrender.com/farm/getallfarms"
        );
        setFarms(response.data.data);
      } catch (error) {
        console.error("Error fetching farms:", error);
      }
    };

    fetchFarms();
  }, []);

  return (
    <div className="farm-page">
      <h1>Farms</h1>
      <div className="farms-container">
        {farms.map((farm) => (
          <div className="farm-card" key={farm._id}>
            <img className="farm-image" src={farm.images[2]} alt={farm.name} />
            <h2>{farm.name}</h2>
            <p>Location: {farm.locations.join(", ")}</p>
            <p>Number of Trees: {farm.trees.length}</p>
            <p>Description: {farm.description}</p>
            <Link to={`/farm/${farm._id}`} className="read-more">
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmPage;
