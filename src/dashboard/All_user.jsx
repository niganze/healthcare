import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { MdOutlineFilterAlt } from "react-icons/md";
import '../Dashcss/tableRespo.css';

const columns = [
  { field: "id", headerName: "ID", width: 30 },
  {
    field: "fullNames",
    headerName: "Names",
    sortable: false,
    width: 200,
    renderCell: (params) => {
      return <span>{params.row.fullNames}</span>;
    },
  },
  { field: "email", headerName: "Email", width: 200 },
  { field: "role", headerName: "Role", width: 120 },
  {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      const handleDelete = async () => {
        try {
          const accessToken = localStorage.getItem("accessToken");

          if (!accessToken) {
            console.error("No access token provided.");
            return;
          }

          await axios.delete(
            `https://musahealthcareapi.onrender.com/auth/deleteUserById/${params.row._id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          // Refetch data after successful delete
          window.location.reload();
        } catch (error) {
          console.error("Error deleting user:", error);
        }
      };

      return (
        <div className="actionButton">
          <button className="delete-button" onClick={handleDelete}>
            Delete
          </button>
          <button className="viewButton">
            Update
          </button>
        </div>
      );
    },
  },
];

function DataTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          console.error("No access token provided.");
          return;
        }

        const response = await axios.get(
          "https://musahealthcareapi.onrender.com/auth/getAllUsers",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const data = response.data;
        if (data.success) {
          setRows(data.data.map((user, index) => ({ ...user, id: index + 1 })));
        } else {
          console.error("Failed to fetch data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="datatable">
      <div className="filter-container">
        <p>Filter</p>
        <MdOutlineFilterAlt />
      </div>
      <div className="table">
        <DataGrid
          rows={rows}
          columns={columns}

          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 8,
              },
            },
          }}

          
          checkboxSelection
          pageSizeOptions={[5,10,25]}
          getRowId={(row) => row._id}
          autoHeight  // This will make the table adjust its height based on the number of rows
        />
      </div>
    </div>
  );
}

export default DataTable;
