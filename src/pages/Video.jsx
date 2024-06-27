import { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Video.css';
import { FaSeedling, FaBuilding, FaUserMd } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Video = () => {
  const { t } = useTranslation();
  const [farmCount, setFarmCount] = useState(0);
  const [partnerCount, setPartnerCount] = useState(0);
  const [patientCount, setPatientCount] = useState(0);
  const [treeCount, setTreeCount] = useState(0);

  useEffect(() => {
    // Fetch data for each category
    const fetchData = async () => {
      try {
        const farmResponse = await axios.get('https://musahealthcareapi.onrender.com/farm/getAllFarms');
        setFarmCount(farmResponse.data.data.length);

        const partnerResponse = await axios.get('https://musahealthcareapi.onrender.com/partner/getAllPartners');
        setPartnerCount(partnerResponse.data.data.length);

        const patientResponse = await axios.get('https://musahealthcareapi.onrender.com/patient/getAllPatients');
        setPatientCount(patientResponse.data.data.length);

        const treeResponse = await axios.get('https://musahealthcareapi.onrender.com/tree/getAllTrees');
        setTreeCount(treeResponse.data.data.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='youtube_video'>
      <div className="cardyoutube">
        <div className="card">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/86PYT9sRRBQ?si=WbJH_cCh0cu7vofn" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
        <div className="card">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/ZcgDWvZl6uA?si=HVz5RZL4SQwRqqik" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
        <div className="card">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/-q8WZbcPeDc?si=pAqQZnZINot1ceI2" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
      </div>
      <div className="cardyoutube">
        <div className="card">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/YxA34JSBCns?si=9Wpv7PGXwdc2Zhqc" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
        <div className="card">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/ZcgDWvZl6uA?si=HVz5RZL4SQwRqqik" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
        <div className="card">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/-q8WZbcPeDc?si=pAqQZnZINot1ceI2" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
      </div>

      <div className="sumupdetails">
        <div className="card_details">
          <p><FaSeedling /> {t("Farm Plantation")}</p>
          <h4>{farmCount}+ </h4>
        </div>
        <div className="card_details">
          <p><FaBuilding /> {t("Official Partners")}</p>
          <h4>{partnerCount}+</h4>
        </div>
        <div className="card_details">
          <p><FaUserMd /> {t("Patients Treated")}</p>
          <h4>{patientCount}+</h4>
        </div>
        <div className="card_details">
          <p><FaSeedling /> {t("Trees Conserved")}</p>
          <h4>{treeCount}+</h4>
        </div>
      </div>
    </div>
  )
}

export default Video;
