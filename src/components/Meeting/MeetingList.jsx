import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheck, FaTimes } from "react-icons/fa";


 const MeetingList = () => {
  const apiEndPoint = "http://localhost:8080/api/meetings";

  const [meetings, setMeetings] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetchAllMeetings();
  }, [reload]);

  const fetchAllMeetings = async () => {
    console.log("Step1: Starting to fetch meetings...");
    await axios
      .get(apiEndPoint)
      .then((response) => {
        console.log("Step2: Response received.", response);
        if (response.status === 200) {
          console.log("response data is: ", response.data);
          setMeetings(response.data);
        } else {
          console.log("Unexpected response status:", response.status);
        }
      })
      .catch((error) => {
        console.log("Error occured during the API call.");
      });
    console.log("Step3: Finished fetching meetings.");
  };

   const updateMeetingStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(
        `${apiEndPoint}/${id}?status=${newStatus}`
      );
      if (response.status === 204) {
        setReload(!reload);
        console.log("Meeting status updated successfully.");
      }
    } catch (error) {
      console.log("Error updating meeting:", error);
    }
  };
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Meetings</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Meetings</th>
              <th>Date</th>
              <th>Time</th>
              <th>Level</th>
              <th>Location</th>
              <th>status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{meeting.title}</td>
                <td>{meeting.date}</td>
                <td>{meeting.time}</td>
                <td>{meeting.level}</td>
                <td>{meeting.location}</td>
                <td>
                <span
                    className={`badge ${
                      meeting.status === "accepted"
                        ? "bg-success"
                        : meeting.status === "declined"
                        ? "bg-danger"
                        : "bg-warning"
                    }`}
                  >
                    {meeting.status}
                  </span>
                </td>
                <td>
                  {meeting.status === "pending" && (
                    <>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() =>
                          updateMeetingStatus(meeting.id, "accepted")
                        }
                      >
                        <FaCheck />
                      </button>
                      <button className="btn btn-sm btn-danger">
                        <FaTimes />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MeetingList;