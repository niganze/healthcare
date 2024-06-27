import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { MdOutlineFilterAlt } from "react-icons/md";
import "../css/Table.css";

const Blog = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [testimonialData, setTestimonialData] = useState({
    patientName: "",
    testimonial: "",
    profileImage: null,
    additionalImages: [],
    date: "",
    rating: 0,
    diseases: [],
  });
  const [diseases, setDiseases] = useState([]);

  const fetchTestimonials = async () => {
    try {
      const testimonialResponse = await axios.get(
        "https://musahealthcareapi.onrender.com/testimony/getTestimony"
      );
      const diseaseResponse = await axios.get(
        "https://musahealthcareapi.onrender.com/disease/getAllDiseases"
      );

      const fetchedTestimonials = testimonialResponse.data.data;
      const fetchedDiseases = diseaseResponse.data.data;

      // Map disease IDs to their names for easy lookup
      const diseaseMap = {};
      fetchedDiseases.forEach((disease) => {
        diseaseMap[disease._id] = disease.name;
      });

      // Update testimonials with disease names
      const updatedTestimonials = fetchedTestimonials.map((testimonial) => {
        const diseaseNames = testimonial.diseases.map((id) => diseaseMap[id]);
        return { ...testimonial, diseaseNames };
      });

      setTestimonials(updatedTestimonials);
      setDiseases(fetchedDiseases); // Set the diseases in state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTestimonialData({ ...testimonialData, [name]: value });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setTestimonialData({ ...testimonialData, profileImage: file });
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setTestimonialData({ ...testimonialData, additionalImages: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", testimonialData.patientName);
      formData.append("maintestimony", testimonialData.testimonial);
      formData.append("image", testimonialData.profileImage);

      // Append additional images if available
      testimonialData.additionalImages.forEach((image) => {
        formData.append("images", image);
      });

      formData.append("date", new Date().toISOString()); // Sending current date and time
      formData.append("rating", testimonialData.rating);

      // Ensure that diseases is an array before appending
      const diseases = Array.isArray(testimonialData.diseases)
        ? testimonialData.diseases
        : [testimonialData.diseases];

      // Append diseases if available
      diseases.forEach((disease) => {
        formData.append("diseases", disease);
      });

      const response = await axios.post(
        "https://musahealthcareapi.onrender.com/testimony/createTestimony",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Testimonial created successfully:", response.data);

      closeModal();
      setTestimonialData({
        patientName: "",
        testimonial: "",
        profileImage: null,
        additionalImages: [],
        date: "",
        rating: 0,
        diseases: [],
      });

      // Fetch testimonials again to update the list
      fetchTestimonials();
    } catch (error) {
      console.error("Error creating testimonial:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://musahealthcareapi.onrender.com/testimony/deleteTestimony/${id}`
      );
      console.log("Testimonial deleted successfully");
      // Fetch testimonials again to update the list
      fetchTestimonials();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 30 },
    { field: "name", headerName: "Name", width: 90 },
    { field: "contacts", headerName: "Contacts", width: 90 },
    { field: "maintestimony", headerName: "Main Testimony", width: 200 },
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Testimonial"
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
    {
      field: "images",
      headerName: "Additional Images",
      width: 100,
      renderCell: (params) => (
        <>
          {params.value.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index}`}
              style={{ width: "50px", height: "50px", marginRight: "5px" }}
            />
          ))}
        </>
      ),
    },
    { field: "date", headerName: "Date", width: 80 },
    { field: "rating", headerName: "Rating", width: 20 },
    {
      field: "diseases",
      headerName: "Diseases",
      width: 90,
      renderCell: (params) => (
        <>
          {params.value.map((disease, index) => (
            <span key={index}>{disease.name}</span>
          ))}
        </>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 140,
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
  ];

  return (
    <div className="datatable">
      <h2>All Blog Posts</h2>
      <button type="button" onClick={openModal}>
        Create
      </button>

      <div className="filter-container">
        <p>Filter</p>
        <MdOutlineFilterAlt />
      </div>
      <DataGrid
        rows={testimonials.map((testimonial, index) => ({
          ...testimonial,
          id: index + 1,
        }))}
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

      {showModal && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Create Testimonial</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="patientName">Patient Name:</label>
                <input
                  type="text"
                  id="patientName"
                  name="patientName"
                  value={testimonialData.patientName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="testimonial">Testimonial:</label>
                <textarea
                  id="testimonial"
                  name="testimonial"
                  value={testimonialData.testimonial}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="flec">
                <div className="form-group">
                  <label htmlFor="profileImage">Profile Image:</label>
                  <input
                    type="file"
                    id="profileImage"
                    name="profileImage"
                    onChange={handleFileInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="additionalImages">Additional Images:</label>
                  <input
                    type="file"
                    id="additionalImages"
                    name="additionalImages"
                    multiple
                    onChange={handleAdditionalImagesChange}
                  />
                </div>
              </div>
              <div className="flec">
                <div className="form-group">
                  <label htmlFor="date">Date:</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={testimonialData.date}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="rating">Rating:</label>
                  <input
                    type="number"
                    id="rating"
                    name="rating"
                    value={testimonialData.rating}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="diseases">Diseases:</label>
                <select
                  id="diseases"
                  name="diseases"
                  value={testimonialData.diseases}
                  onChange={handleInputChange}
                >
                  <option value="">Select a Disease</option>
                  {diseases.map((disease) => (
                    <option key={disease._id} value={disease._id}>
                      {disease.name}
                    </option>
                  ))}
                </select>
              </div>
              <button type="button">Create Testimonial</button>
              <button type="button" onClick={closeModal}>
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
