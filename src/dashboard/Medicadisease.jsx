import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { useForm } from "react-hook-form";
import '../css/Modal.css'
const DiseaseDataTable = () => {
  const [diseases, setDiseases] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://musahealthcareapi.onrender.com/disease/getAllDiseases"
        );
        setDiseases(response.data.data);
      } catch (error) {
        console.error("Error fetching diseases:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://musahealthcareapi.onrender.com/disease/deleteDisease/${id}`
      );
      setDiseases(diseases.filter((disease) => disease._id !== id));
    } catch (error) {
      console.error("Error deleting disease:", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      await axios.post(
        "https://musahealthcareapi.onrender.com/disease/createDisease",
        data
      );
      setShowModal(false);
      reset();
      // Refresh data after successful creation
      const response = await axios.get(
        "https://musahealthcareapi.onrender.com/disease/getAllDiseases"
      );
      setDiseases(response.data.data);
    } catch (error) {
      console.error("Error creating disease:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 30 },
    { field: "name", headerName: "Name", width: 100 },
    { field: "symptoms", headerName: "Symptoms", width: 200 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "howItAttacks", headerName: "How It Attacks", width: 100 },
    { field: "vaccinations", headerName: "Vaccinations", width: 100 },
    {
      field: "action",
      headerName: "Action",
      width: 260,
      renderCell: (params) => (
        <div className="actionButton">
          <button
            className="delete-button"
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </button>
          <button className="viewButton">View</button>
          <button className="viewButton">Update</button>
        </div>
      ),
    },
  ];

  return (
    <div className="DiseaseDataTable-container">
      <h2>DiseaseDataTable list we have been Discovered </h2>

      <button type="button" onClick={() => setShowModal(true)}>
        New Disease
      </button>

      {showModal && (
        <div className="popup">
          <div className="popup-inner">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>Name:</label>
              <input type="text" {...register("name", { required: true })} />
              {errors.name && <span>Name is required</span>}

              <label>Description:</label>
              <textarea
                {...register("description", { required: true })}
              ></textarea>
              {errors.description && <span>Description is required</span>}

              <label>Symptoms:</label>
              <input
                type="text"
                {...register("symptoms", { required: true })}
              />
              {errors.symptoms && <span>Symptoms are required</span>}

              <label>How It Attacks:</label>
              <input
                type="text"
                {...register("howItAttacks", { required: true })}
              />
              {errors.howItAttacks && <span>How It Attacks is required</span>}

              <label>Testimonies:</label>
              <input
                type="text"
                {...register("testimonies", { required: true })}
              />
              {errors.testimonies && <span>Testimonies are required</span>}

              <label>Patients:</label>
              <input
                type="text"
                {...register("patients", { required: true })}
              />
              {errors.patients && <span>Patients are required</span>}

              <label>Vaccinations:</label>
              <input
                type="text"
                {...register("vaccinations", { required: true })}
              />
              {errors.vaccinations && <span>Vaccinations are required</span>}

              <div className="button-group">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div style={{ height: 430, width: "100%" }}>
        <DataGrid
          rows={diseases.map((disease, index) => ({
            ...disease,
            id: index + 1,
            symptoms: disease.symptoms.join(", "),
            vaccinations: disease.vaccinations.join(", "),
          }))}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};

export default DiseaseDataTable;
