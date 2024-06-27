import { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineFilterAlt } from "react-icons/md";
import { DataGrid } from "@mui/x-data-grid";
import '../css/Table.css';

function Treedash() {
  // State variables
  const [trees, setTrees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [newTreeData, setNewTreeData] = useState({
    name: "",
    images: [],
    locations: "",
    farm: "",
    description: "",
    medicines: [],
    diseasesCured: "",
    partsUsed: "",
    patients: "",
  });
  const [farms, setFarms] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [patients, setPatients] = useState([]);

  // Fetch options useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const farmsResponse = await fetchOptions(
          "https://musahealthcareapi.onrender.com/farm/getallfarms"
        );
        setFarms(farmsResponse);
        const medicinesResponse = await fetchOptions(
          "https://musahealthcareapi.onrender.com/medicine/getAllMedicines"
        );
        setMedicines(medicinesResponse);
        const diseasesResponse = await fetchOptions(
          "https://musahealthcareapi.onrender.com/disease/getAllDiseases"
        );
        setDiseases(diseasesResponse);
        const patientsResponse = await fetchOptions(
          "https://musahealthcareapi.onrender.com/patient/getAllPatients"
        );
        setPatients(patientsResponse);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchData();
  }, []);

  // Fetch options helper function
  const fetchOptions = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching options from ${url}:`, error);
      return [];
    }
  };

  // Delete tree function
  const deleteTree = async (id) => {
    try {
      await axios.delete(
        `https://musahealthcareapi.onrender.com/tree/deleteTree/${id}`
      );
      setTrees(trees.filter((tree) => tree._id !== id));
    } catch (error) {
      console.error("Error deleting tree:", error);
    }
  };

  // Open modal function
  const openModal = () => {
    setShowModal(true);
  };

  // Close modal function
  const closeModal = () => {
    setShowModal(false);
    setSuccessMessage("");
    setNewTreeData({
      name: "",
      images: [],
      locations: "",
      farm: "",
      description: "",
      medicines: [],
      diseasesCured: "",
      partsUsed: "",
      patients: "",
    });
  };

  // Handle change function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTreeData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle image change function
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewTreeData((prevState) => ({
      ...prevState,
      images: files,
    }));
  };

  // Handle save function
  const handleSave = async () => {
    try {
      const formData = new FormData();
      Object.entries(newTreeData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(key, item);
          });
        } else {
          formData.append(key, value);
        }
      });

      const response = await axios.post(
        "https://musahealthcareapi.onrender.com/tree/createTree",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Tree created successfully:", response.data);
      setSuccessMessage("Tree created successfully!");
      const updatedTrees = await axios.get(
        "https://musahealthcareapi.onrender.com/tree/getAllTrees"
      );
      setTrees(updatedTrees.data.data);
      closeModal(); // Close modal and reset form
    } catch (error) {
      console.error("Error creating tree:", error);
    }
  };

  // Fetch trees useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const treesResponse = await axios.get(
          "https://musahealthcareapi.onrender.com/tree/getAllTrees"
        );
        setTrees(treesResponse.data.data);
      } catch (error) {
        console.error("Error fetching trees:", error);
      }
    };

    fetchData();
  }, []);

  // Define columns
  const columns = [
    { field: "id", headerName: "ID", width: 30 },
    { field: "name", headerName: "Name", width: 150 },
    {
      field: "images",
      headerName: "Images",
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <div>
          {params.row.images.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`Image ${index + 1}`}
              style={{ width: "100px", height: "auto" }}
            />
          ))}
        </div>
      ),
    },
    { field: "locations", headerName: "Locations", width: 200 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "partsUsed", headerName: "Parts Used", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div className="actionButton">
          <button
            onClick={() => deleteTree(params.row._id)}
            className="delete-button"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="treedash">
      <h2>Tree Dashboard</h2>
      <button type="button" onClick={openModal}>
        Create Tree
      </button>
      <div className="datatable">
        <div className="filter-container">
          <p>Filter</p>
          <MdOutlineFilterAlt />
        </div>
        <div style={{ height: "100%", width: "100%" }}>
          <DataGrid
            className="datagrid"
            rows={trees.map((tree, index) => ({ ...tree, id: index + 1 }))}
            columns={columns}
            pageSize={7}
            checkboxSelection
            pageSizeOptions={[5, 10, 25]}
            getRowId={(row) => row._id}
          />
        </div>
      </div>
      {showModal && (
        <div className="popup">
          <div className="popup-inner">
            <h3>Create Tree</h3>
            {successMessage && <p>{successMessage}</p>}
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newTreeData.name}
              onChange={handleChange}
            /><br/>
            <label htmlFor="images">Images:</label>
            <input
              type="file"
              id="images"
              name="images"
              onChange={handleImageChange}
              multiple
            /><br/>
            <label htmlFor="locations">Locations:</label>
            <input
              type="text"
              id="locations"
              name="locations"
              value={newTreeData.locations}
              onChange={handleChange}
            />
            <label htmlFor="farm">Farm:</label>
            <select
              id="farm"
              name="farm"
              value={newTreeData.farm}
              onChange={handleChange}
            >
              <option value="">Select a Farm</option>
              {farms.map((option) => (
                <option key={option._id} value={option._id}>
                  {option.name}
                </option>
              ))}
            </select>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={newTreeData.description}
              onChange={handleChange}
            />
            <label htmlFor="medicines">Medicines:</label>
            <select
              id="medicines"
              name="medicines"
              value={newTreeData.medicines}
              onChange={handleChange}
            >
              <option value="">Select a Medicine</option>
              {medicines.map((option) => (
                <option key={option._id} value={option._id}>
                  {option.name}
                </option>
              ))}
            </select>
            <label htmlFor="diseasesCured">Diseases Cured:</label>
            <select
              id="diseasesCured"
              name="diseasesCured"
              value={newTreeData.diseasesCured}
              onChange={handleChange}
            >
              <option value="">Select a Disease</option>
              {diseases.map((option) => (
                <option key={option._id} value={option._id}>
                  {option.name}
                </option>
              ))}
            </select>
            <label htmlFor="partsUsed">Parts Used:</label>
            <input
              type="text"
              id="partsUsed"
              name="partsUsed"
              value={newTreeData.partsUsed}
              onChange={handleChange}
            />
            <label htmlFor="patients">Patients:</label>
            <select
              id="patients"
              name="patients"
              value={newTreeData.patients}
              onChange={handleChange}
            >
              <option value="">Select a Patient</option>
              {patients.map((option) => (
                <option key={option._id} value={option._id}>
                  {option.name}
                </option>
              ))}
            </select>
            <button onClick={handleSave} className="save-button">Save</button>
            <button onClick={closeModal} className="save-button">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Treedash;
