import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { MdOutlineFilterAlt } from "react-icons/md";
import { useForm } from 'react-hook-form';

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [currentPartner, setCurrentPartner] = useState(null);
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

  useEffect(() => {
    axios
      .get("https://musahealthcareapi.onrender.com/partner/getAllPartners")
      .then((response) => {
        setPartners(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching partners:", error);
      });
  }, []);

  const deletePartner = (id) => {
    axios
      .delete(`https://musahealthcareapi.onrender.com/partner/deletePartner/${id}`)
      .then(() => {
        setPartners(partners.filter((partner) => partner._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting partner:", error);
      });
  };

  const handleEditClick = async (id) => {
    try {
      const response = await axios.get(`https://musahealthcareapi.onrender.com/partner/getPartnerById/${id}`);
      setCurrentPartner(response.data.data);
      setShowModal(true);
      
      // Populate the form with the current data
      Object.keys(response.data.data).forEach(key => {
        setValue(key, response.data.data[key]);
      });
    } catch (error) {
      console.error('Error fetching partner data:', error);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (currentPartner) {
        // Update existing partner
        await axios.put(`https://musahealthcareapi.onrender.com/partner/updatePartner/${currentPartner._id}`, data);
        // Update the local state with the updated partner data
        setPartners(prevPartners => prevPartners.map(partner => partner._id === currentPartner._id ? { ...partner, ...data } : partner));
      }

      setShowModal(false);
      reset();
      setCurrentPartner(null);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleModalToggle = () => {
    setShowModal(!showModal);
    if (!showModal) {
      setCurrentPartner(null);
      reset();
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 30 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "telephone", headerName: "Telephone", width: 100 },
    { field: "role", headerName: "Role", width: 100 },
    { field: "email", headerName: "Email", width: 100 },
    { field: "location", headerName: "Location", width: 100 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "district", headerName: "District", width: 100 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div className="actionButton">
          <button className="delete-button" onClick={() => deletePartner(params.row._id)}>Delete</button>
          <button className="viewButton" onClick={() => handleEditClick(params.row._id)}>Edit</button>
        </div>
      ),
    },
  ];

  const renderPartnersTable = () => {
    let filteredPartners = partners;
    if (selectedDistrict !== "All") {
      filteredPartners = partners.filter(
        (partner) => partner.district === selectedDistrict
      );
    }

    return (
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredPartners.map((partner, index) => ({ ...partner, id: index + 1 }))}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 6,
              },
            },
          }}
          checkboxSelection
          pageSizeOptions={[5, 10, 25]}
          getRowId={(row) => row._id}
        />
      </div>
    );
  };

  return (
    <div className="partners-container">
      <h2>Partners</h2>
      <div className="district-filter">
        <label>Filter by District:</label>
        <select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
        >
          <option value="All">All</option>
          {[...new Set(partners.map((partner) => partner.district))].map(
            (district) => (
              <option key={district} value={district}>
                {district}
              </option>
            )
          )}
        </select>
        <MdOutlineFilterAlt /> {/* Retaining the filter icon */}
      </div>
      {renderPartnersTable()}
      {showModal && (
        <div className="popup">
          <div className="popup-inner">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="partner_form">
                <div className="input_field">
                  <label>Name:</label>
                  <input type="text" {...register("name", { required: true })} />
                  {errors.name && <span>Name is required</span>}
                </div>
                <div className="input_field">
                  <label>Telephone:</label>
                  <input type="text" {...register("telephone", { required: true })} />
                  {errors.telephone && <span>Telephone is required</span>}
                </div>
                <div className="input_field">
                  <label>Role:</label>
                  <input type="text" {...register("role", { required: true })} />
                  {errors.role && <span>Role is required</span>}
                </div>
                <div className="input_field">
                  <label>Email:</label>
                  <input type="email" {...register("email", { required: true })} />
                  {errors.email && <span>Email is required</span>}
                </div>
                <div className="input_field">
                  <label>Location:</label>
                  <input type="text" {...register("location", { required: true })} />
                  {errors.location && <span>Location is required</span>}
                </div>
                <div className="input_field">
                  <label>Description:</label>
                  <textarea {...register("description", { required: true })}></textarea>
                  {errors.description && <span>Description is required</span>}
                </div>
                <div className="input_field">
                  <label>District:</label>
                  <input type="text" {...register("district", { required: true })} />
                  {errors.district && <span>District is required</span>}
                </div>
              </div>
              <button type="submit" className="save-button">Save</button>
              <button type="button" className="save-button" onClick={handleModalToggle}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Partners;
