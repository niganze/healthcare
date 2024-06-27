import '../Dashcss/dashboard.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FaCalendarAlt, FaUser, FaMedkit, FaUsers } from 'react-icons/fa';
import { DataGrid } from '@mui/x-data-grid';

const Dashparenr = () => {
  const [appointmentsCount, setAppointmentsCount] = useState(0);
  const [appointments, setAppointments] = useState([]);
  const [patientsCount, setPatientsCount] = useState(0);
  const [medicinesCount, setMedicinesCount] = useState(0);
  const [partnersCount, setPartnersCount] = useState(0);
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const createPartnerUrl = 'https://musahealthcareapi.onrender.com/partner/createPartner';
  const createServiceUrl = 'https://musahealthcareapi.onrender.com/service/createService';
  const [newPartner, setNewPartner] = useState({
    name: '',
    telephone: '',
    role: '',
    email: '',
    location: '',
    description: '',
    district: ''
  });

  const [newService, setNewService] = useState({
    image: '',
    title: '',
    description: '',
    audience: '', 
  });

  
  const handleModalPartnerToggle = () => {
    setShowPartnerModal(!showPartnerModal);
  };

  const handleModalServiceToggle = () => {
    setShowServiceModal(!showServiceModal);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (showPartnerModal) {
        setNewPartner({ ...newPartner, [name]: value });
    } else if (showServiceModal) {
        if (name === 'image') {
            setNewService({ ...newService, [name]: files[0] });
        } else {
            setNewService({ ...newService, [name]: value });
        }
    }
  };

  const closeModal = () => {
    setShowPartnerModal(false);
  };

  const closeModall = () => {
    setShowServiceModal(false);
  };

  const handlePartnerSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(createPartnerUrl, newPartner);
        console.log('Partner created successfully:', response.data);
        setNewPartner({
            name: '',
            telephone: '',
            role: '',
            email: '',
            location: '',
            description: '',
            district: ''
        });
    } catch (error) {
        console.error('Error creating partner:', error);
    }
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append('image', newService.image);
        formData.append('title', newService.title);
        formData.append('description', newService.description);
        formData.append('audience', newService.audience);
        
        const response = await axios.post(createServiceUrl, formData);
        console.log('Service created successfully:', response.data);
        setNewService({
            image: '',
            title: '',
            description: '',
            audience: ''
        });
    } catch (error) {
        console.error('Error creating service:', error);
    }
  };

 

  const columns = [
    { field: 'id', headerName: 'No', width: 90 },
    { field: 'Name', headerName: 'Name', width: 150 },
    { field: 'Telephone', headerName: 'Telephone', width: 150 },
    { field: 'date', headerName: 'Date', width: 150 },
  ];

  const rows = appointments.map((appointment, index) => ({
    id: index + 1,
    Name: appointment.Name,
    Telephone: appointment.Telephone,
    date: appointment.date,
  }));

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const appointmentsResponse = await axios.get('https://musahealthcareapi.onrender.com/appointment/getAllAppointments');
        setAppointmentsCount(appointmentsResponse.data.data.length);

        const patientsResponse = await axios.get('https://musahealthcareapi.onrender.com/patient/getAllPatients');
        setPatientsCount(patientsResponse.data.data.length);

        const medicinesResponse = await axios.get('https://musahealthcareapi.onrender.com/medicine/getAllMedicines');
        setMedicinesCount(medicinesResponse.data.data.length);

        const partnersResponse = await axios.get('https://musahealthcareapi.onrender.com/partner/getAllPartners');
        setPartnersCount(partnersResponse.data.data.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCounts();
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('https://musahealthcareapi.onrender.com/appointment/getAllAppointments');
        setAppointments(response.data.data.slice(0, 5));
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="homedashboard">
      <div className="homedash">
        <div className="search">
          <h1>Welcomne back Mussa!</h1>
          
        </div>
        <div className="buttondashboard">
          <button type="button" onClick={handleModalPartnerToggle}>Add Partner</button>
          <button type="button" onClick={handleModalServiceToggle}>Add Service</button>
        </div>

        {showPartnerModal && (
          <div className="popup">
            <div className="popup-inner">
              <form onSubmit={handlePartnerSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={newPartner.name} onChange={handleInputChange} />
                <label>Telephone:</label>
                <input type="tel" name="telephone" value={newPartner.telephone} onChange={handleInputChange} />
                <label>Role:</label>
                <input type="text" name="role" value={newPartner.role} onChange={handleInputChange} />
                <label>Email:</label>
                <input type="email" name="email" value={newPartner.email} onChange={handleInputChange} />
                <label>Location:</label>
                <input type="text" name="location" value={newPartner.location} onChange={handleInputChange} />
                <label>Description:</label>
                <textarea name="description" value={newPartner.description} onChange={handleInputChange}></textarea>
                <label>District:</label>
                <input type="text" name="district" value={newPartner.district} onChange={handleInputChange} />
                <button type="submit" className="save-button">Save</button>
                <button type='button' onClick={closeModal}>Cancel</button>
              </form>
            </div>
          </div>
        )}

        {showServiceModal && (
          <div className="popup">
            <div className="popup-inner">
              <form onSubmit={handleServiceSubmit}>
                <label>Image:</label>
                <input type="file" name="image" onChange={handleInputChange} /><br />
                <label>Title:</label>
                <input type="text" name="title" value={newService.title} onChange={handleInputChange} />
                <label>Description:</label>
                <textarea name="description" value={newService.description} onChange={handleInputChange}></textarea>
                <label>Choose audience:</label>
                <select name="audience" value={newService.audience} onChange={handleInputChange}>
                  <option value="">Choose one...</option>
                  <option value="partners">Partners</option>
                  <option value="patients">Patients</option>
                  <option value="researchers">Researchers</option>
                  <option value="students">Students in university</option>
                  <option value="others">Others</option>
                </select>
                <button type="submit" className="save-button">Save</button>
                <button type='button' onClick={closeModall}>Cancel</button>
              </form>
            </div>
          </div>
        )}
      </div>

      <div className="dashboard">
        <div className="card">
          <div className="card-content">
            <div>
              <h3><FaCalendarAlt className='icons' />Randevu</h3>
              <p>Umubare wa randevu zose ziri muri system</p>
            </div>
          </div>
          <div className="number">
            <p className='number'>{appointmentsCount}</p>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <div>
              <h3><FaUser className='icons' color='yellow' />Abarwayi</h3>
              <p>umubare wabarwayi Twavuye</p>
            </div>
          </div>
          <div className="number">
            <p className='number'>{patientsCount}</p>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <div>
              <h3> <FaMedkit className='icons' color='red' />Ibiti bivura</h3>
              <p>Umubare mbumbe kubiti bivura</p>
            </div>
          </div>
          <div className="number">
            <p className='number'>{medicinesCount}</p>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <div>
              <h3><FaUsers className='icons' color='green' />Abafatanyabikorwa</h3>
              <p>Umubare  wa Bafatanyakikorwa</p>
            </div>
          </div>
          <div className="number">
            <p className='number'>{partnersCount}</p>
          </div>
        </div>
      </div>

      <div className="main2_dashboard">
        <div className="recently_appointment">
          <h2>Recently Appointments</h2>
          <div style={{ height: 240, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={3}
              rowsPerPageOptions={[3, 6, 10]}
              checkboxSelection
            />
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default Dashparenr;
