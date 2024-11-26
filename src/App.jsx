import React, { useState } from "react";
import ScheduleNewMeeting from "./components/scheduleNewMeeting";

const App = () => {
  const [meetings, setMeetings] = useState([]);

  const addMeeting = (meeting) => {
    setMeetings([...meetings, meeting]);
  };

  return (
    <div className="container my-5">
      <div className="row">
        <ScheduleNewMeeting addMeeting={addMeeting} />
      </div>
    </div>
  );
};

export default App;