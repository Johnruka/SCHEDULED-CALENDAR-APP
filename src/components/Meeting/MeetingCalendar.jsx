import React, { useState } from "react";
import MeetingForm from "./MeetingForm";
import Footer from "../shared/Footer"
import Navbar from "../shared/Navbar";

const MeetingCalendar = () => {
    
    const [MeetingList, setMeetingList] = useState([]);
    
    const addToMeetingList = (Meetings) => {
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

  const removeFromMeetingList = (MeetingList) => {
    const updatedMeetingList = MeetingList.map((item) =>
      item.id === foodId ? { ...item, count: item.count - 1 } : item
    );
    const finalMeetingList= updatedMeetingList.filter((item) => item.count > 0);
    setMeetingList(finalMeetingList);

  };

  return (

    
    <div className={'container mt-5 '}>
      <h1 className={`text-center`}>
        Schedule a new Meeting
      </h1>

      
      <Navbar 
       Navbar= {Navbar}
      />


      <MeetingForm
        meetings={Meetings()}
        createMeeting={createMeeting()}
       
      />
      <MeetingList
        MeetingList = {MeetingList()}
        addToMeetingList={addToMeetingList()}
        removeFromMeetingList={removeFromMeetingList()}
      />
      <Footer 
       Footer= {Footer}
      />
      
    </div>
  );
}; 
  


export default MeetingCalendar;
