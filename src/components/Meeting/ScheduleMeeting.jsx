import { useState, useEffect } from 'react';
import axios from "axios";
import MeetingForm from './MeetingForm';


const ScheduleMeeting = () => {
  const apiEndPoint = "http://localhost:8080";
  const [meetings, setMeetings] = useState([]);
  const [editingMeeting, setEditingMeeting] = useState(null);

  const loadMeetings = async () => {
    try {
      const data = await axios.getAllMeetings(apiEndPoint + '/api/meetings');
      setMeetings(data);
    } catch (error) {
      console.error('Error loading meetings:', error);
    }
  };

  useEffect(() => {
    loadMeetings();
  }, []);

  const handleEditMeeting = (meeting) => {
    const formattedMeeting = {
      ...meeting,
      participants: meeting.participants.join(', ')
    };
    setEditingMeeting(formattedMeeting);
  };

  return (
    <>
      <div className="row mb-4">
        <div className="col-12">
          <h2>Meeting Calendar</h2>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <MeetingForm
            meetings={meetings}
            onMeetingAdded={loadMeetings}
            editingMeeting={editingMeeting}
            onEditMeeting={handleEditMeeting}
            onMeetingUpdated={() => {
              loadMeetings();
              setEditingMeeting(null);
            }} 
         />
        </div>
      </div>
    </>
  );
};
export default ScheduleMeeting
