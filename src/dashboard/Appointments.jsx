import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid} from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

// import "../Dashcss/tableRespo.css";

const Appointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "https://musahealthcareapi.onrender.com/appointment/getAllAppointments"
        );
        setAppointments(response.data.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 30 },
    { field: "Name", headerName: "Name", width: 100 },
    { field: "date", headerName: "Date", width: 60 },
    { field: "Time", headerName: "Time", width: 100 },
    { field: "Telephone", headerName: "Telephone", width: 100 },
    { field: "Email", headerName: "Email", width: 180 },
    { field: "description", headerName: "Description", width: 250 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <div className="actionButton">
          <button className="viewButton" onClick={() => handleViewSingleAppointment(params.row._id)}>
            View
          </button>
          <button className="delete-button" onClick={() => handleDelete(params.row._id)}>Delete</button>
        </div>
      ),
    },
  ];

  const handleViewSingleAppointment = (id) => {
    navigate(`/singleappointment/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://musahealthcareapi.onrender.com/appointment/deleteAppointment/${id}`);
      setAppointments(appointments.filter(appointment => appointment._id !== id));
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  return (
    <div className="appointments">
      <h4>All Appointments Here</h4>
      <div className="table-container">
        <DataGrid
          rows={appointments.map((appointment, index) => ({ ...appointment, id: index + 1 }))}
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
    </div>
  );
};

export default Appointments;
