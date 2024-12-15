import React from 'react';
import AlertMessage from '../Meeting/AlertMessage';

import ScheduleMeeting from '../Meeting/ScheduleMeeting';
import MeetingsList from '../Meeting/MeetingList';


import { FaCalendarAlt } from "react-icons/fa";
import { FaCheckCircle } from 'react-icons/fa';

const Meeting = () => {
   

    return (
    <div className='container-fluid bg-light'>
        <div className='row'>
            <div className='col'>
                {showAlert && <AlertMessage icon={<FaCheckCircle />} message={<>Meeting is <b>{alertName}</b> successfully...</>} color={alertColor} />}
          
                </div>
            </div>
            <div className='col-md-9'>
                <div className='my-2 me-4 px-2 py-2 bg-white'>
                    <div className="card mb-1">
                        <div className="card-body">
                            <h5 className="card-title bg-primary ps-1 py-1 rounded text-white"><FaCalendarAlt /> Schedule a New Meeting</h5>
                            <ScheduleMeeting />
                               
                        </div>
                    </div>
                    <div className="card mb-1">
                        <div className="card-body">
                            <h5 className="card-title">Meetings</h5>
                            <MeetingsList 
                              />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
    );
};

export default Meeting;