import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { MdOutlineFilterAlt } from "react-icons/md";
import { DataGrid } from "@mui/x-data-grid";
import "../css/Table.css";

function AllPatients() {
  const [diseases, setDiseases] = useState([]);
  const [patients, setPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const fetchPatients = () => {
    axios
      .get("https://musahealthcareapi.onrender.com/patient/getAllPatients")
      .then((response) => {
        setPatients(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching patients:", error);
      });
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    axios
      .get("https://musahealthcareapi.onrender.com/disease/getAllDiseases")
      .then((response) => {
        setDiseases(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching diseases:", error);
      });
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'image') {
          formData.append(key, value[0]);
        } else {
          formData.append(key, value);
        }
      });
      await axios.post(
        "https://musahealthcareapi.onrender.com/patient/createPatient",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Patient created successfully");
      fetchPatients();
      closeModal();
      reset();
    } catch (error) {
      console.error("Error creating patient:", error);
    }
  };
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://musahealthcareapi.onrender.com/patient/deletePatient/${id}`
      );
      setPatients(patients.filter((patient) => patient._id !== id));
    } catch (error) {
      console.error(`Error deleting patient with ID ${id}:`, error);
    }
  };

  const handleViewClick = async (id) => {
    try {
      const response = await axios.get(`https://musahealthcareapi.onrender.com/patient/getPatientById/${id}`);
      setSelectedPatient(response.data.data);
      setShowViewModal(true);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setSelectedPatient(null);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 12 },
    { field: "name", headerName: "Name", width: 80 },
    { field: "email", headerName: "Email", width: 100 },
    { field: "phone", headerName: "Phone", width: 80 },
    { field: "age", headerName: "Age", width: 10 },
    { field: "howWasAttack", headerName: "How was Attack", width: 100 },
    { field: "symptoms", headerName: "Symptoms", width: 100 },
    { field: "recentMedecine", headerName: "Recent Medicine", width: 100 },
    { field: "recentlyAffectedDisease", headerName: "Recently Affected Disease", width: 100 },
    { field: "location", headerName: "Location", width: 40 },
    { field: "description", headerName: "Description", width: 70 },
    {
      field: "image",
      headerName: "Image",
      width: 80,
      renderCell: (params) => {
        if (params.row.image) {
          return <img src={params.row.image} alt="Patient" style={{ width: 60, height: 60 }} />
        }
        return <p>No image available</p>;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <div className="actionButton">
          <button
            onClick={() => handleDelete(params.row._id)}
            className="delete-button"
          >
            Delete
          </button>
          <button
            onClick={() => handleViewClick(params.row._id)}
            className="viewButton"
          >
            View
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="datatable">
      <div className="filter-container">
        <p>Filter</p>
        <MdOutlineFilterAlt />
      </div>

      <button type="button" onClick={openModal}>
        Create patient
      </button>
      <div className="datatable-container">
        <DataGrid
          className="datagrid"
          rows={patients.map((patient, index) => ({
            ...patient,
            id: index + 1,
          }))}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 4,
              },
            },
          }}
          checkboxSelection
          pageSizeOptions={[5, 10, 25]}
          getRowId={(row) => row._id}
        />
      </div>
      {showModal && (
        <div className="popup">
          <div className="popup-inner">
            <h3>Make Patients Record</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    {...register("name", { required: true })}
                  />
                  {errors.name && <span>This field is required</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="disease">Disease</label>
                  <select
                    id="disease"
                    name="disease"
                    {...register("disease", { required: true })}
                  >
                    <option value="">Select Disease</option>
                    {diseases.map((disease) => (
                      <option key={disease._id} value={disease._id}>
                        {disease.name}
                      </option>
                    ))}
                  </select>
                  {errors.disease && <span>This field is required</span>}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="gender">Gender:</label>
                  <select id="gender" name="gender" {...register("gender")}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="location">Location:</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    {...register("location", { required: true })}
                  />
                  {errors.location && <span>This field is required</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number:</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    {...register("phone", { required: true })}
                  />
                  {errors.phone && <span>This field is required</span>}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    {...register("email", { required: true })}
                  />
                  {errors.email && <span>This field is required</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="profilePicture">Profile Picture:</label>
                  <input
                    type="file"
                    id="profilePicture"
                    name="profilePicture"
                    {...register("image", { required: true })}
                  />
                  {errors.image && <span>This field is required</span>}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="symptoms">Symptoms:</label>
                <input
                  type="text"
                  id="symptoms"
                  name="symptoms"
                  {...register("symptoms", { required: true })}
                />
                {errors.symptoms && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label htmlFor="howWasAttack">How was the attack?</label>
                <input
                  type="text"
                  id="howWasAttack"
                  name="howWasAttack"
                  {...register("howWasAttack", { required: true })}
                />
                {errors.howWasAttack && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label htmlFor="age">Age:</label>
                <input type="number" id="age" name="age" {...register("age", { required: true })} />
                {errors.age && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label htmlFor="recentMedecine">Recent Medicine:</label>
                <input
                  type="text"
                  id="recentMedecine"
                  name="recentMedecine"
                  {...register("recentMedecine", { required: true })}
                />
                {errors.recentMedecine && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label htmlFor="recentlyAffectedDisease">Recently Affected Diseases:</label>
                <input
                  type="text"
                  id="recentlyAffectedDisease"
                  name="recentlyAffectedDisease"
                  {...register("recentlyAffectedDisease", { required: true })}
                />
                {errors.recentlyAffectedDisease && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label htmlFor="description">Medical History:</label>
                <textarea
                  id="description"
                  name="description"
                  {...register("description", { required: true })}
                ></textarea>
                {errors.description && <span>This field is required</span>}
              </div>
              <button type="submit" className="save-button">Save</button>
              <button type="button" onClick={closeModal}>Cancel</button>
            </form>
          </div>
        </div>
      )}
      {showViewModal && selectedPatient && (
        <div className="modal">
          <div className="modal-content">
            <h2>Patient Details</h2>
            <p><strong>Name:</strong> {selectedPatient.name}</p>
            <p><strong>Email:</strong> {selectedPatient.email}</p>
            <p><strong>Phone:</strong> {selectedPatient.phone}</p>
            <p><strong>Age:</strong> {selectedPatient.age}</p>
            <p><strong>How was Attack:</strong> {selectedPatient.howWasAttack}</p>
            <p><strong>Symptoms:</strong> {selectedPatient.symptoms}</p>
            <p><strong>Recent Medicine:</strong> {selectedPatient.recentMedecine}</p>
            <p><strong>Recently Affected Disease:</strong> {selectedPatient.recentlyAffectedDisease}</p>
            <p><strong>Location:</strong> {selectedPatient.location}</p>
            <p><strong>Description:</strong> {selectedPatient.description}</p>
            {selectedPatient.image && <img src={selectedPatient.image} alt="Patient" />}
            <button onClick={closeViewModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllPatients;
