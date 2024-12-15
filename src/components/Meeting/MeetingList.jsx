import React, { useEffect, useState, useRef } from "react";
import axios from "axios";


 const MeetingList = () => {
  const apiEndPoint = "http://localhost:8080/api/meetings";

  const [meetings, setMeetings, onMeetingDeleted, onEditMeeting] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const confirmRowRef = useRef(null);

  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetchAllMeetings();
  }, [reload]);

  const fetchAllMeetings = async () => {
    console.log("Step1: Starting to fetch meetings...");
    await axios
      .get(apiEndPoint)
      .then((response) => {
        console.log("Step2: Response received.", response);
        if (response.status === 200) {
          console.log("response data is: ", response.data);
          setMeetings(response.data);
        } else {
          console.log("Unexpected response status:", response.status);
        }
      })
      .catch(() => {
        console.log("Error occured during the API call.");
      });
    console.log("Step3: Finished fetching meetings.");
  
    const handleClickOutside = (event) => {
        if (confirmRowRef.current && !confirmRowRef.current.contains(event.target)) {
            setConfirmDelete(null);
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    }
    
    };

  const handleDelete = async (id) => {
    try {
      const response = await axios.put(
        `${apiEndPoint}/${id}?status=${newStatus}`
      );
      if (response.status === 204) {
        setReload(!reload);
        setConfirmDelete(null);
        onMeetingDeleted();
    } else {
        alert('Failed to delete meeting: ' + result.error);
    }
} catch (error) {
    alert('Error deleting meeting: ' + error.message);
}
};  
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Meetings</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Meetings</th>
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
                                    <span className={`badge bg-${
                                        meeting.level === 'Team' ? 'success' :
                                        meeting.level === 'company' ? 'warning':
                                        meeting.level === 'Department' ? 'danger': 'danger'
                                    }`}>
                                        {meeting.level}
                                    </span>
                                </td>
                                <td>
                                    <button 
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => onEditMeeting(meeting)}
                                        title="Edit Meeting"
                                        
                                    >
                                        EDIT
                                    </button>
                                    <button 
                                        className="btn btn-danger btn-sm"
                                        onClick={() => setConfirmDelete(meeting.id)}
                                        title="Delete Meeting"
                                    >
                                       DELETE
                                    </button>
                                </td>
                            </tr>
                            {confirmDelete === meeting.id && (
                                <tr ref={confirmRowRef}>
                                    <td colSpan="6">
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
                            <td colSpan="6" className="text-center">
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