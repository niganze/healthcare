import { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Medecines.css';
import { Link } from "react-router-dom";

const Medicines = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get('https://musahealthcareapi.onrender.com/medicine/getAllMedicines');
        setMedicines(response.data.data); 
      } catch (error) {
        console.error('Error fetching medicines:', error);
      }
    };

    fetchMedicines();
  }, []); 

  return (
    <div className="medicines-container">
      <h2>Medicines</h2>
      <div className="medicine-list">
        {medicines.map((medicine, index) => (
          <div key={index} className="medicine-card">            
            <h3>{medicine.name}</h3>
            <img src={medicine.images} alt={medicine.name} />
            {/* <p><strong>Uses:</strong> {medicine.diseases}</p> */}
            <p><strong>Frequency:</strong> {medicine.frequency}</p>
            <p><strong>Additional Materials:</strong> {medicine.additionalMaterials}</p>
            <p><strong>Procedure to Make:</strong> {medicine.procedureToMake}</p>
            <p><strong>Procedure to Take:</strong> {medicine.procedureToTake}</p>
            <p><strong>Extra Additions:</strong> {medicine.extraAdditions}</p>
            <p><strong>Beneficiaries:</strong> {medicine.beneficiaries}</p>
            <button type="button"><Link to={`/medicine/${medicine._id}`}>View Details</Link></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Medicines;
