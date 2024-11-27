import React, { useState } from "react";
import MeetingForm from "./meetingForm";

const MeetingCalendar = () => {
    const [Meetings, setMeetings] = useState([]);
    const [MeetingList, setMeetingList] = useState([]);
    
    const addToMeetingList = (MeetingList) => {
      const existingItem = Meetings.find((item) => item.id === Meetings.id);

    if (existingItem) {
      const updatedMeetingList = MeetingList.map((item) =>
        item.id === Meetings.id ? { ...item, count: item.count + 1 } : item 
      );
      setMeetingList(updatedMeetingList);
    } else {
      setMeetingList([...Meetings, { ...Meetings, count: 1 }]);
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
