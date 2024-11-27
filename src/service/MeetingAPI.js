const meetings = [
    {id: 1 , text: "morning meeting"},
    {id: 2 , text: "lecture"}
];

export const getMeetingsAPI = () => {
    
    return meetings;
}


export const addMeetingAPI = (inputMeetingText) => {
    const newMeeting = { id: meetings.length + 1  , text: inputMeetingText};
    meetings.push(newMeeting);
    return newMeeting;
}