import React from 'react'

const MeetingCalendar = () => {
  const [Meeti, setMeetingList] = useState([]); 
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
    <div>
      
    </div>
  )
}

export default MeetingCalendar
