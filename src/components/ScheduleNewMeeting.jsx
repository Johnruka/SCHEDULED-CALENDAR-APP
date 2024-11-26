import React, { useEffect, useState } from "react";
import { BsCalendar2Week } from "react-icons/bs";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getMeetingsAPI, addMeetingAPI } from "../service/ScheduleNewMeetingAPI";


const ScheduleNewMeeting = () => {
  const [meetings, setMeetings] = useState([]);
  
  const [inputValue, setInputValue] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [reload, setReload] = useState(false);

  
  useEffect(() => {
    console.log("fetch data from api executed!");
    const apiResponseData = getMeetingsAPI();
    setMeetings(apiResponseData);
  }, [reload]);

  const clickHandler = () => {
    if (inputValue.trim() === "") {
      setErrorMessage("Meeting cannot be empty.");
      return;
    }
    if (inputValue.trim().length < 3) {
      setErrorMessage("Meeting must be at least 3 characters long.");
      return;
    }
    if (inputValue.trim().length > 50) {
      setErrorMessage("Meeting cannot exeed 50 chars.");
      return;
    }

    addTaskAPI(inputValue);
    setReload(!reload);
    
    setErrorMessage('');
    setInputValue('');
  };

  return (
    <div className="col-md-12 mb-4">
      <div className="card">
        <div
          className="card-header"
          style={{
            backgroundColor: "blue",
            border: "2px solid",
            borderRadius: "10px",
            padding: "10px",
            color: "white",
          }}
        >
          <h1>
            <BsCalendar2Week style={{ marginRight: "10px"}}/>
            Schedule a New Meeting
          </h1>
        </div>
        
        <div className="card-body">
          <calendarForm addMeeting={addMeeting} />
        </div>
      </div>
    </div>
  );
};

export default ScheduleNewMeeting
