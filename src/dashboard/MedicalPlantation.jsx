import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { MdOutlineFilterAlt } from "react-icons/md";

function MedicalPlantation() {
  const [farms, setFarms] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    plantationName: "",
    district: "",
    numberOfTrees: "",
    harvestedTrees: "",
    uncommonTrees: "",
    expectedMedicine: "",
    expectedHarvestDate: "",
    images: [], // Initialize images as an empty array
  });

  const [trees, setTrees] = useState([]);

  useEffect(() => {
    axios
      .get("https://musahealthcareapi.onrender.com/tree/getAllTrees")
      .then((response) => {
        setTrees(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching trees:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://musahealthcareapi.onrender.com/farm/getallfarms")
      .then((response) => {
        setFarms(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching farms:", error);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://musahealthcareapi.onrender.com/farm/deleteFarm/${id}`
      );
      setFarms(farms.filter((farm) => farm._id !== id));
      console.log("Farm deleted successfully");
    } catch (error) {
      console.error("Error deleting farm:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setFormData({ ...formData, images: files });
  };

  const handleTreeSelection = (e) => {
    const selectedTreeIds = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData({ ...formData, trees: selectedTreeIds });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "images") {
          for (let i = 0; i < formData.images.length; i++) {
            formDataToSend.append("images", formData.images[i]);
          }
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });
      await axios.post(
        "https://musahealthcareapi.onrender.com/farm/createfarms",
        formDataToSend
      );
      setShowModal(false);
      console.log("Farm created successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error creating farm:", error);
    }
  };

  return (
    <div>
      <h2>Medical Plantation</h2>
      <button type="button" onClick={() => setShowModal(true)}>
        Create farm
      </button>

      {showModal && (
        <div className="popup">
          <div className="popup-inner">
            <form onSubmit={handleSubmit}>
              <label>
                Plantation Name:
                <input
                  type="text"
                  name="plantationName"
                  value={formData.plantationName}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                District Located:
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                >
                  <optgroup label="Eastern Province">
                    <option value="Bugesera">Bugesera</option>
                    <option value="Gatsibo">Gatsibo</option>
                    <option value="Kayonza">Kayonza</option>
                    <option value="Kirehe">Kirehe</option>
                    <option value="Ngoma">Ngoma</option>
                    <option value="Nyagatare">Nyagatare</option>
                    <option value="Rwamagana">Rwamagana</option>
                  </optgroup>
                  <optgroup label="Kigali Province">
                    <option value="Gasabo">Gasabo</option>
                    <option value="Kicukiro">Kicukiro</option>
                    <option value="Nyarugenge">Nyarugenge</option>
                  </optgroup>
                  <optgroup label="Northern Province">
                    <option value="Burera">Burera</option>
                    <option value="Gakenke">Gakenke</option>
                    <option value="Gicumbi">Gicumbi</option>
                    <option value="Musanze">Musanze</option>
                    <option value="Rulindo">Rulindo</option>
                  </optgroup>
                  <optgroup label="Southern Province">
                    <option value="Gisagara">Gisagara</option>
                    <option value="Huye">Huye</option>
                    <option value="Kamonyi">Kamonyi</option>
                    <option value="Muhanga">Muhanga</option>
                    <option value="Nyamagabe">Nyamagabe</option>
                    <option value="Nyanza">Nyanza</option>
                    <option value="Nyaruguru">Nyaruguru</option>
                    <option value="Ruhango">Ruhango</option>
                  </optgroup>
                  <optgroup label="Western Province">
                    <option value="Karongi">Karongi</option>
                    <option value="Ngororero">Ngororero</option>
                    <option value="Nyabihu">Nyabihu</option>
                    <option value="Nyamasheke">Nyamasheke</option>
                    <option value="Rubavu">Rubavu</option>
                    <option value="Rusizi">Rusizi</option>
                    <option value="Rutsiro">Rutsiro</option>
                  </optgroup>
                </select>
              </label>

              <label>
                Number of Trees:
                <input
                  type="number"
                  name="numberOfTrees"
                  value={formData.numberOfTrees}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Locations:
                <input
                  type="text"
                  name="locations"
                  value={formData.locations}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Google Map:
                <input
                  type="text"
                  name="googlemap"
                  value={formData.googlemap}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Images:
                <input
                  type="file"
                  name="images"
                  onChange={handleFileChange}
                  multiple
                />
              </label>
              <label>
                Trees:
                <select
                  name="trees"
                  value={formData.trees}
                  onChange={handleTreeSelection}
                >
                  <option value="">Select a tree</option>
                  {trees.map((tree) => (
                    <option key={tree._id} value={tree._id}>
                      {tree.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Trees Types:
                <input
                  type="text"
                  name="treestypes"
                  value={formData.treestypes}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Expected Yield Time:
                <input
                  type="text"
                  name="expectedYieldTime"
                  value={formData.expectedYieldTime}
                  onChange={handleInputChange}
                />
              </label>
              <button type="submit" className="save-button">Save</button>
              <button type="button" onClick={() => setShowModal(false)}>cancel</button>
            </form>
          </div>
        </div>
      )}

      <div className="datatable">
        <div className="filter-container">
          <p>Filter</p>
          <MdOutlineFilterAlt />
        </div>

        <DataGrid
          className="datagrid"
          autoHeight
          rows={farms.map((farm, index) => ({ ...farm, id: index + 1 }))}
          columns={[
            { field: "id", headerName: "ID", width: 30 },
            { field: "locations", headerName: "Location", width: 170 },
            { field: "googlemap", headerName: "Google Map", width: 180 },
            {
              field: "images",
              headerName: "Images",
              width: 200,
              renderCell: (params) => (
                <div>
                  {params.row.images.map((imageUrl, index) => (
                    <img
                      key={index}
                      src={imageUrl}
                      alt={`Farm Image ${index + 1}`}
                      style={{ maxWidth: "100px", margin: "5px" }}
                    />
                  ))}
                </div>
              ),
            },
            { field: "treestypes", headerName: "Number of Trees", width: 100 },
            {
              field: "expectedYieldTime",
              headerName: "Expected Yield Time",
              width: 100,
            },
            {
              field: "action",
              headerName: "Action",
              width: 200,
              renderCell: (params) => (
                <div className="actionButton">
                  <button
                    onClick={() => handleDelete(params.row._id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                  <button className="viewButton">Edit</button>
                </div>
              ),
            },
          ]}
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
    </div>
  );
}

export default MedicalPlantation;
