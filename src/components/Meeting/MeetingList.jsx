import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa"; // Font Awesome icons for actions

const MeetingList = () => {
  const apiEndPoint = "http://localhost:8080/api/meetings";
  const [meetings, setMeetings] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const confirmRowRef = useRef(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetchAllMeetings();
  }, [reload]);

  const fetchAllMeetings = async () => {
    console.log("Step 1: Starting to fetch meetings...");
    try {
      const response = await axios.get(apiEndPoint, {
        headers: {
          'Authorization': `Basic ${btoa('admin:password')}`
        }
      });
      console.log("Step 2: Response received.", response);
      if (response.status === 200) {
        console.log("Meetings fetched successfully:", response.data);
        setMeetings(response.data);
      } else {
        console.log("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.log("Error occurred during the API call.", error);
    }
    console.log("Step 3: Finished fetching meetings.");
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${apiEndPoint}/${id}`, {
        headers: {
          'Authorization': `Basic ${btoa('admin:password')}`
        }
      });
      if (response.status === 204) {
        console.log("Meeting deleted successfully.");
        setReload(!reload);
        setConfirmDelete(null);
      }
    } catch (error) {
      console.log('Error deleting meeting:', error);
      alert('Error deleting meeting.');
    }
  };

  const handleEditMeeting = (meeting) => {
    console.log("Edit meeting:", meeting);
    // Additional implementational logic for editing the meeting would be added here
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Meetings</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Location</th>
              <th>Level</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting, index) => (
              <React.Fragment key={meeting.id}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{meeting.title}</td>
                  <td>{meeting.date}</td>
                  <td>{meeting.startTime}</td>
                  <td>{meeting.endTime}</td>
                  <td>{meeting.location}</td>
                  <td>
                    <span
                      className={`badge bg-${
                        meeting.level === 'Team'
                          ? 'success'
                          : meeting.level === 'Company'
                          ? 'warning'
                          : meeting.level === 'Department'
                          ? 'danger'
                          : 'secondary'
                      }`}
                    >
                      {meeting.level}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEditMeeting(meeting)}
                      title="Edit Meeting"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => setConfirmDelete(meeting.id)}
                      title="Delete Meeting"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
                {confirmDelete === meeting.id && (
                  <tr ref={confirmRowRef}>
                    <td colSpan="8">
                      <div className="alert alert-warning d-flex align-items-center justify-content-between m-0">
                        <span>Are you sure you want to delete this meeting?</span>
                        <div>
                          <button 
                            className="btn btn-danger btn-sm me-2"
                            onClick={() => handleDelete(meeting.id)}
                          >
                            Yes, Delete
                          </button>
                          <button 
                            className="btn btn-secondary btn-sm"
                            onClick={() => setConfirmDelete(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {meetings.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center">
                  No meetings scheduled
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MeetingList;