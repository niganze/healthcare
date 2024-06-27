import { useEffect, useState } from 'react';
import axios from 'axios';
import '../Dashcss/DashMedecine.css';

function DashMedecine() {
  const [medicine, setMedicine] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const response = await axios.get('https://musahealthcareapi.onrender.com/medicine/getMedicineById/65f447034833585dbb5ca4f5');
        setMedicine(response.data.data);
      } catch (err) {
        setError('Error fetching medicine data');
      }
    };

    fetchMedicine();
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!medicine) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="medicine-container">
      <h2 className="medicine-name">{medicine.name}</h2>
      <img className="medicine-image" src={medicine.images[0]} alt={medicine.name} />
      <div className="medicine-info">
        <p><strong>Description:</strong> {medicine.description}</p>
        <p><strong>Frequency:</strong> {medicine.frequency}</p>
        <p><strong>Procedure to Make:</strong> {medicine.procedureToMake}</p>
        <p><strong>Procedure to Take:</strong> {medicine.procedureToTake}</p>
        <p><strong>Extra Additions to Take It:</strong> {medicine.extraAdditionsTotakeit.join(', ')}</p>
        <p><strong>Additional Materials to Make It:</strong> {medicine.additionMaterialsTomakeIt.join(', ')}</p>
        <p><strong>Beneficiaries:</strong> {medicine.beneficiaries.join(', ')}</p>
      </div>

      <div className="diseases-section">
        <h2>Diseases</h2>
        {medicine.diseases.map(disease => (
          <div key={disease._id} className="disease-card">
            <h3>{disease.name}</h3>
            <p><strong>Description:</strong> {disease.description}</p>
            <p><strong>How it Attacks:</strong> {disease.howItAttacks}</p>
            <p><strong>Symptoms:</strong> {disease.symptoms.join(', ')}</p>
          </div>
        ))}
      </div>

      <div className="trees-section">
        <h2>Trees Used</h2>
        {medicine.treesUsed.map(tree => (
          <div key={tree._id} className="tree-card">
            <h3>{tree.name}</h3>
            <img className="tree-image" src={tree.images[0]} alt={tree.name} />
            <p><strong>Description:</strong> {tree.description}</p>
            <p><strong>Locations:</strong> {tree.locations.join(', ')}</p>
            <p><strong>Parts Used:</strong> {tree.partsUsed.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashMedecine;
