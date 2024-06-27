import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/Singlefarm.css';

const SinglePlant_medecine = () => {
    const [farm, setFarm] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchFarm = async () => {
            try {
                const response = await axios.get(`https://musahealthcareapi.onrender.com/farm/getfarmById/${id}`);
                if (response.data.status === 'success') {
                    setFarm(response.data.data);
                } else {
                    console.error('Error fetching farm:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching farm:', error);
            }
        };

        fetchFarm();
    }, [id]);

    if (!farm) {
        return <div>Loading...</div>;
    }

    return (
        <div className="single-farm-container">
            <p>Description: {farm.description}</p>
            {farm.images.map((image, index) => (
                <img key={index} src={image} alt={`Farm Image ${index + 1}`} />
            ))}
            <p>Location: {farm.locations.join(', ')}</p>
            <p>Number of Trees: {farm.trees.length}</p>
            
        </div>
    );
};

export default SinglePlant_medecine;
