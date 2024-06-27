import { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { MdOutlineFilterAlt } from 'react-icons/md';

import "../Dashcss/tableRespo.css";

const DashService = () => {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editedService, setEditedService] = useState({
    image: '',
    name: '',
    description: '',
    beneficiaries: '',
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('https://musahealthcareapi.onrender.com/service/readServices');
        setServices(response.data.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 30 },
    { field: 'image', headerName: 'Image', sortable: false, width: 100, renderCell: (params) => <img src={params.value} alt="" className="service-image" /> },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'beneficiaries', headerName: 'Beneficiaries', width: 100 },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => (
        <div className="actionButton">
          <button className="viewButton" onClick={() => handleEditService(params.row)}>Edit</button>
          <button className="delete-button" onClick={() => handleDeleteService(params.row._id)}>Delete</button>
        </div>
      ),
    },
  ];

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handleEditService = (service) => {
    setEditedService(service);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Edited Service:', editedService);
    setShowModal(false);
    setEditedService({
      image: '',
      name: '',
      description: '',
      beneficiaries: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedService({ ...editedService, [name]: value });
  };

  const handleDeleteService = async (id) => {
    try {
      await axios.delete(`https://musahealthcareapi.onrender.com/service/deleteService/${id}`);
      setServices(services.filter(service => service._id !== id));
      console.log('Service deleted successfully');
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  return (
    <div className="service-container">
      <h2>Services</h2>
      <div className="datatable">
        <div className="filter-container">
          <p>Filter</p>
          <MdOutlineFilterAlt />
        </div>

        <DataGrid
          className="datagrid"
          rows={services.map((service, index) => ({ ...service, id: index + 1 }))}
          columns={columns}

          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 7,
              },
            },
          }}
          checkboxSelection
          pageSizeOptions={[5,10,25]}
          getRowId={(row) => row._id}
        />
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close" onClick={handleModalToggle}>&times;</span>
            <form onSubmit={handleSubmit}>
              <label>Image:</label>
              <input type="text" name="image" value={editedService.image} onChange={handleInputChange} />
              <label>Title:</label>
              <input type="text" name="name" value={editedService.name} onChange={handleInputChange} />
              <label>Description:</label>
              <textarea name="description" value={editedService.description} onChange={handleInputChange}></textarea>
              <label>Beneficiaries:</label>
              <input type="text" name="beneficiaries" value={editedService.beneficiaries} onChange={handleInputChange} />
              <button type="submit" className="save-button">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashService;
