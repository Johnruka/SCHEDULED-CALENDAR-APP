import { useState, useEffect } from 'react';
import axios from "axios";
import MeetingForm from './MeetingForm';
import MeetingList from './MeetingList';

const ScheduleMeeting = () => {
    const apiEndPoint = "http://localhost:8080/api/meetings";
    
    

  const [meetings, setMeetings,getAllMeetings] = useState([]);
  const [editingMeeting, setEditingMeeting] = useState(null);
   const [reload, setReload] = useState(false);

   const loadMeetings = async () => {
    try {
      const data = await getAllMeetings();
      setMeetings(data);
    } catch (error) {
      console.error('Error loading meetings:', error);
    }
  };

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
  
  }

  const handleEditMeeting =  async (meeting) => {
    const formattedMeeting = {
      ...meeting,
      participants: meeting.participants.join(', ')
    };
    setEditingMeeting(formattedMeeting);
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
  useEffect(() => {
    loadMeetings();
  }, []);

  return (
    <>
      <div className="row mb-4">
        <div className="col-12">
          <h2>ScheduleMeeting</h2>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <MeetingForm
            onMeetingAdded={loadMeetings}
            editingMeeting={editingMeeting}
            onMeetingUpdated={() => {
              setEditingMeeting(null);
            }} 
          />
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <MeetingList 
            meetings={meetings}
            onMeetingDeleted={loadMeetings}
            onEditMeeting={handleEditMeeting}
          />
        </div>
      </div>
    </>
  );
};
export default ScheduleMeeting
