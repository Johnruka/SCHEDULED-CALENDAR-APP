import React, { useState } from "react";
import MeetingCalendar from "./components/Meeting/MeetingCalendar";

const App = () => {
  const [meetings, setMeetings] = useState([]);

  const addMeeting = 
  (meetings, 
   MeetingList,
  ) => {
    setMeetings([...meetings, MeetingList]);
  };

  return (
    <div className="container my-5">
      <div className="row">
        <MeetingCalendar addMeeting={addMeeting} />
      </div>
    </div>
  );
};

export default App;