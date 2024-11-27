import React, { useState } from "react";
import MeetingForm from "./meetingForm";

const MeetingCalendar = () => {
    const [Meetings, setMeetings] = useState([]);
    const [Meetinglist, setMeetinglist] = useState([]);
    
    const addToMeetingList = (Meetings) => {
      const existingItem = Meetings.find((item) => item.id === Meetings.id);

    if (existingItem) {
      const updatedMeetingList = Meetings.map((item) =>
        item.id === Meetings.id ? { ...item, count: item.count + 1 } : item 
      );
      setMeetings(updatedMeetingList);
    } else {
      setMeetings([...Meetings, { ...Meetings, count: 1 }]);
    }
  }; 
  return (
    <div className={'container mt-5 '}>
      <h1 className={`text-center`}>
        Schedule a new Meeting
      </h1>


      <MeetingForm
        meetings={Meetings()}
        createMeeting={createMeeting()}
       
      />
      <MeetingList
        MeetingList = {MeetingList()}
        addToMeetingList={addToMeetingList()}
      />
    </div>
  );
}; 
  


export default MeetingCalendar
