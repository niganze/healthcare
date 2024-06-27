import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { MdOutlineFilterAlt } from "react-icons/md";
import "../Dashcss/tableRespo.css";


const Message = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          "https://musahealthcareapi.onrender.com/contact/getAllContacts"
        );
        setMessages(response.data.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [loading]);

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(
        `https://musahealthcareapi.onrender.com/contact/deleteContact/${id}`
      );
    } catch (error) {
      console.error("Error deleting message:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (id) => {
    try {
      const response = await axios.get(
        `https://musahealthcareapi.onrender.com/contact/getContactById/${id}`
      );
      setSelectedMessage(response.data.data);
    } catch (error) {
      console.error("Error fetching message details:", error);
    }
  };


  
  const handleWhatsAppReply = () => {
    if (selectedMessage && selectedMessage.telephone) {
      const phoneNumber = selectedMessage.telephone;
      
      // Store the phone number in localStorage
      localStorage.setItem('whatsappPhoneNumber', phoneNumber);
      
      const whatsappUrl = `whatsapp://send?phone=+250${phoneNumber}`;
      window.open(whatsappUrl, "_blank");
    } else {
      console.error("No phone number found to reply via WhatsApp");
    }
  };
  
  



  const handleEmailReply = () => {
    if (selectedMessage && selectedMessage.email) {
      const emailSubject = encodeURIComponent("Reply to your message");
      const emailBody = encodeURIComponent("Your pre-filled message here");
      const emailUrl = `mailto:${selectedMessage.email}?subject=${emailSubject}&body=${emailBody}`;
      window.open(emailUrl);
    } else {
      console.error("No email found to reply via email");
    }
  };

  return (
    <div>
      <h2>Messages</h2>
      {loading && <p>Loading...</p>}
      <div className="datatable">
        <div className="filter-container">
          <p>Filter</p>
          <MdOutlineFilterAlt />
        </div>
        <div>
          <DataGrid
            rows={messages.map((message, index) => ({
              ...message,
              id: index + 1,
            }))} // Add id field for row numbers
            columns={[
              { field: "id", headerName: "No", width: 10 }, // Custom column for row numbers
              { field: "name", headerName: "Name", width: 100 },
              { field: "telephone", headerName: "Telephone", width: 100 },
              { field: "email", headerName: "Email", width: 100 },
              { field: "subject", headerName: "Subject", width: 150 },
              { field: "message", headerName: "Description", width: 300 },
              {
                field: "action",
                headerName: "Action",
                renderCell: (params) => (
                  <div className="actionButton">
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(params.row._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="viewButton"
                      onClick={() => handleView(params.row._id)}
                    >
                      View
                    </button>
                  </div>
                ),
                width: 200,
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
            pageSizeOptions={[5, 10, 25]}
            getRowId={(row) => row._id}
          />
        </div>
      </div>
      {/* Modal */}
      {selectedMessage && (
        <div className="modal">
          <div className="modal-content">
            <h2>Message Details</h2>
            <p><strong>Name:</strong> {selectedMessage.name}</p>
            <p><strong>Email:</strong> {selectedMessage.email}</p>
            <p><strong>Telephone:</strong> {selectedMessage.telephone}</p>
            <p><strong>Subject:</strong> {selectedMessage.subject}</p>
            <p><strong>Message:</strong> {selectedMessage.message}</p>
            <button onClick={handleWhatsAppReply}>Reply via WhatsApp</button>
            <button onClick={handleEmailReply}>Reply via Email</button>
            <button onClick={() => setSelectedMessage(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
