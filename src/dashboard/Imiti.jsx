import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import '../css/Table.css';

const Imiti = () => {
  const [medicines, setMedicines] = useState([]);
  const [trees, setTrees] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentMedicine, setCurrentMedicine] = useState(null);
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

  const navigate = useNavigate(); // Define the navigate function

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [medicinesRes, treesRes, diseasesRes] = await Promise.all([
          axios.get("https://musahealthcareapi.onrender.com/medicine/getAllMedicines"),
          axios.get("https://musahealthcareapi.onrender.com/tree/getAllTrees"),
          axios.get("https://musahealthcareapi.onrender.com/disease/getAllDiseases")
        ]);
        setMedicines(medicinesRes.data.data);
        setTrees(treesRes.data.data);
        setDiseases(diseasesRes.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://musahealthcareapi.onrender.com/medicine/deleteMedicine/${id}`);
      setMedicines(prevMedicines => prevMedicines.filter(medicine => medicine._id !== id));
    } catch (error) {
      console.error('Error deleting medicine:', error);
    }
  };

  const handleUpdateClick = async (id) => {
    try {
      const response = await axios.get(`https://musahealthcareapi.onrender.com/medicine/getMedicineById/${id}`);
      setCurrentMedicine(response.data.data);
      setShowModal(true);
      
      // Populate the form with the current data
      Object.keys(response.data.data).forEach(key => {
        setValue(key, response.data.data[key]);
      });
    } catch (error) {
      console.error('Error fetching medicine data:', error);
    }
  };

  const handleViewMedicine = (id) => {
    navigate(`/medicinee/${id}`); // Navigate to the SingleMedicine component
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("frequency", data.frequency);
      formData.append("additionMaterialsTomakeIt", data.additionMaterialsTomakeIt);
      formData.append("procedureToMake", data.procedureToMake);
      formData.append("procedureToTake", data.procedureToTake);
      formData.append("extraAdditionsTotakeit", data.extraAdditionsTotakeit);
      formData.append("beneficiaries", data.beneficiaries);
      formData.append("images", data.images[0]);
      
      if (data.diseases) {
        formData.append("diseases", data.diseases);
      }
      
      if (data.treesUsed) {
        formData.append("treesUsed", data.treesUsed);
      }

      if (currentMedicine) {
        // Update existing medicine
        await axios.put(`https://musahealthcareapi.onrender.com/medicine/updateMedicine/${currentMedicine._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        window.location.reload();
        // Update the local state with the updated medicine data
        setMedicines(prevMedicines => prevMedicines.map(medicine => medicine._id === currentMedicine._id ? { ...medicine, ...data } : medicine));
      } else {
        // Create new medicine
        const response = await axios.post('https://musahealthcareapi.onrender.com/medicine/createMedicine', formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        window.location.reload();
        setMedicines(prevMedicines => [...prevMedicines, response.data]);
      }

      setShowModal(false);
      reset();
      setCurrentMedicine(null);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleModalToggle = () => {
    setShowModal(!showModal);
    if (!showModal) {
      setCurrentMedicine(null);
      reset();
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 30 },
    { field: "name", headerName: "Name", sortable: false, width: 90 },
    { field: "beneficiaries", headerName: "Beneficiaries", width: 100 },
    {
      field: "diseases",
      headerName: "Diseases",
      width: 120,
      renderCell: (params) => {
        if (params.row.diseases && params.row.diseases.length > 0) {
          const firstDisease = params.row.diseases[0];
          return (
            <div>
              <p>{firstDisease.name}</p>
              <p>{firstDisease.symptoms.join(", ")}</p>
            </div>
          );
        }
      },
    },
    {
      field: "treesUsed",
      headerName: "Trees Used",
      width: 100,
      renderCell: (params) => {
        if (params.row.treesUsed && params.row.treesUsed.length > 0) {
          const firstTreeUsed = params.row.treesUsed[0];
          return <p>{firstTreeUsed.description}</p>;
        }
      },
    },
    { field: "frequency", headerName: "Frequency", width: 100 },
    { field: "additionMaterialsTomakeIt", headerName: "Materials", width: 100 },
    { field: "procedureToMake", headerName: "Procedure to Make", width: 120 },
    {
      field: "images",
      headerName: "Image",
      width: 100,
      renderCell: (params) => {
        if (params.row.images && params.row.images.length > 0) {
          return <img src={params.row.images[0]} alt="Medicine" style={{ width: 80, height: 80 }} />;
        }
        return <p>No image available</p>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 170,
      sortable: false,
      renderCell: (params) => (
        <div className="actionButton" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className="delete-button" onClick={() => handleDelete(params.row._id)}>Delete</button>
          <button className="viewButton" onClick={() => handleUpdateClick(params.row._id)}>Update</button>
          <button className="viewButton" onClick={() => handleViewMedicine(params.row._id)}>View</button>
        </div>
      ),
    },
  ];

  return (
    <div className="user-container">
      <h2>All Possible Medicines</h2>
      <button type="button" onClick={handleModalToggle}>Add Medicine</button>
      {showModal && (
        <div className="popup">
          <div className="popup-inner">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="medecine_form">
                <div className="input_field">
                  <label>Name:</label>
                  <input type="text" {...register("name", { required: true })} />
                  {errors.name && <span>Name is required</span>}
                </div>
                <div className="input_field">
                  <label>Description:</label>
                  <textarea {...register("description", { required: true })}></textarea>
                  {errors.description && <span>Description is required</span>}
                </div>
              </div>
              <div className="medecine_form">
                <div className="input_field">
                  <label>Images:</label>
                  <input type="file" {...register("images", { required: true })} multiple />
                  {errors.images && <span>Images are required</span>}
                </div>
                <div className="input_field">
                  <label>Diseases:</label>
                  <select {...register("diseases")}>
                    <option value="">Select a disease</option>
                    {diseases.map(disease => (
                      <option key={disease._id} value={disease._id}>{disease.name}</option>
                    ))}
                  </select>
                  {errors.diseases && <span>Diseases are required</span>}
                </div>
              </div>
              <div className="medecine_form">
                <div className="input_field">
                  <label>Trees Used:</label>
                  <select {...register("treesUsed")}>
                    <option value="">Select a tree</option>
                    {trees.map(tree => (
                      <option key={tree._id} value={tree._id}>{tree.name}</option>
                    ))}
                  </select>
                  {errors.treesUsed && <span>Tree selection is required</span>}
                </div>
                <div className="input_field">
                  <label>Frequency:</label>
                  <input type="text" {...register("frequency")} />
                </div>
              </div>
              <div className="medecine_form">
                <div className="input_field">
                  <label>Additional Materials to Make It:</label>
                  <input type="text" {...register("additionMaterialsTomakeIt")} />
                </div>
                <div className="input_field">
                  <label>Procedure to Make:</label>
                  <input type="text" {...register("procedureToMake")} />
                </div>
              </div>
              <div className="medecine_form">
                <div className="input_field">
                  <label>Procedure to Take:</label>
                  <input type="text" {...register("procedureToTake")} />
                </div>
                <div className="input_field">
                  <label>Extra Additions to Take It:</label>
                  <input type="text" {...register("extraAdditionsTotakeit")} />
                </div>
              </div>
              <div className="medecine_form">
                <div className="input_field">
                  <label>Beneficiaries:</label>
                  <input type="text" {...register("beneficiaries")} />
                </div>
              </div>
              <button type="submit" className="save-button">Save</button>
              <button type="Button" className="save-button" onClick={handleModalToggle}>Cancel</button>
            </form>
          </div>
        </div>
      )}
      <div className="datatable-container">
        <DataGrid
          className="datagrid"
          rows={medicines.map((medicine, index) => ({ ...medicine, id: index + 1 }))}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 7,
              },
            },
          }}
          checkboxSelection
          pageSizeOptions={[5, 10, 25]}
          getRowId={(row) => row._id}
        />
      </div>
    </div>
  );
};

export default Imiti;
