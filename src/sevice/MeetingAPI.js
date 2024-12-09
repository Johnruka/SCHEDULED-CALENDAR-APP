let meeting = [];

export const addMeeting = (meeting) => {
    const newMeeting = {
        id: meetingData.length+1,
        title: meeting.title,
        date: meeting.date,
        time: meeting.time,
        level: meeting.level,
        participants: meeting.participants,
        description: meeting.description
    };
    meeting.push(newMeeting);
    console.log(meeting);

};

export const deleteMeeting = (deleteId) => {
    const foundMeeting = meeting.filter(meeting => meeting.id !== deleteId);
    meeting = foundMeeting;
    console.log(meeting);
};

export const updateMeeting = (id, meeting) => {
    for(let i=0; i<meeting.length; i++) {
        if(meeting[i].id === id) {
            meeting.id = id;
            meeting[i] = meeting;
            break;
        }
    }
    console.log(meeting);
    
 };
    
export const getAllMeetings = () => {
        return meeting;
    };