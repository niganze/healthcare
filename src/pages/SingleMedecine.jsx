import { useState, useEffect } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';

const SingleMedecine = () => { 
    const [medicineData, setMedicineData] = useState(null);
   
    const { id } = useParams();

    useEffect(() => {
        const fetchMedicine = async () => {
            try {
                const response = await axios.get(`https://musahealthcareapi.onrender.com/medicine/getMedicineById/${id}`);
                setMedicineData(response.data.data); 
            } catch (error) {
                console.error('Error fetching medicine:', error);
            }
        };
    
        fetchMedicine();
    }, [id]);
    

    return (
        <div className="single-medicine-container">
            {medicineData && (
                <div className="medecineimage">
                    <div className="medicine_content">
                        <img src={medicineData.images[0]} alt="medicine" />
                    </div>
                    
                    <p>{medicineData.name}</p>
                </div>
            )}
     {medicineData && (
    <div className="desc">
        <h3>{medicineData.name}</h3>
        <h6>Diseases:</h6>
        <ul>
            {medicineData.diseases.map(disease => (
                <li key={disease._id}>
                    <h4>{disease.name}</h4>
                    <p><strong>Description:</strong> {disease.description}</p>
                    <p><strong>Symptoms:</strong> {disease.symptoms.join(', ')}</p>
                    <p><strong>How It Attacks:</strong> {disease.howItAttacks}</p>
                    {/* Additional disease information */}
                </li>
            ))}
        </ul>
        <h6>Trees Used:</h6>
        <ul>
            {medicineData.treesUsed.map(tree => (
                <li key={tree._id}>
                    <h4>Tree Description:</h4>
                    <p>{tree.description}</p>
                    <h4>Locations:</h4>
                    <ul>
                        {tree.locations.map(location => (
                            <li key={location}>{location}</li>
                        ))}
                    </ul>
                    <h4>Images:</h4>
                    <div className="tree-images">
                        {tree.images.map(image => (
                            <img key={image} src={image} alt="Tree" />
                        ))}
                    </div>
                    {/* Additional tree information */}
                </li>
            ))}
        </ul>
        {/* Additional medicine details */}
    </div>
)}
      {medicineData && (
                <div className="description">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, sequi
                        labore! Itaque minus, rem maxime recusandae dolor nulla pariatur
                        consequuntur error veniam sit quaerat quia earum voluptatibus ad quasi
                        corrupti.
                    </p>
                    <h3>ExtraAdditionsTotakeit</h3>
                    <p>{medicineData.extraAdditionsTotakeit}</p>
                    <h3>Beneficiaries</h3>
                    <p>{medicineData.beneficiaries}</p>
                    <div className="more-information">
                        <p>Call: 088888848484</p>
                        <p>Email: musaa@gmaail.com</p>
                    </div>
                </div>
            )}
            
        </div>
    );
};

export default SingleMedecine;
