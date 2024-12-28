import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheck, FaTimes } from "react-icons/fa";

const InvitationList = () => {
  const apiEndPoint = "http://localhost:8080/api/invitations";

  const [invitations, setInvitations] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetchAllInvitations();
  }, [reload]);

  const fetchAllInvitations = async () => {
    console.log("Step1: Starting to fetch invitations...");
    try {
      const response = await axios.get(apiEndPoint, {
        headers: {
          'Authorization': `Basic ${btoa('admin:password')}` 
        }
      });
      console.log("Step2: Response received.", response);
      if (response.status === 200) {
        console.log("response data is: ", response.data);
        setInvitations(response.data);
      } else {
        console.log("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.log("Error occurred during the API call.", error);
    }
    console.log("Step3: Finished fetching invitations.");
  };

  const updateInvitationStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(
        `${apiEndPoint}/${id}?status=${newStatus}`,
        {}, 
        {
          headers: {
            'Authorization': `Basic ${btoa('admin:password')}` 
          }
        }
      );
      if (response.status === 204) {
        setReload(!reload);
        console.log("Invitation status updated successfully.");
      }
    } catch (error) {
      console.log("Error updating invitation:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Invitations</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invitations.map((invitation, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{invitation.title}</td>
                <td>{invitation.date}</td>
                <td>{invitation.startTime}</td>
                <td>{invitation.endTime}</td>
                <td>{invitation.location}</td>
                <td>
                  <span
                    className={`badge ${
                      invitation.status === "accepted"
                        ? "bg-success"
                        : invitation.status === "declined"
                        ? "bg-danger"
                        : "bg-warning"
                    }`}
                  >
                    {invitation.status}
                  </span>
                </td>
                <td>
                  {invitation.status === "pending" && (
                    <>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() =>
                          updateInvitationStatus(invitation.id, "accepted")
                        }
                      >
                        <FaCheck />
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() =>
                          updateInvitationStatus(invitation.id, "declined")
                        }
                      >
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

export default InvitationList;