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
    try {
      const response = await axios.get(apiEndPoint, {
        headers: {
          'Authorization': `Basic ${btoa('admin:password')}`
        }
      });
      if (response.status === 200) {
        setInvitations(response.data);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error during fetching invitations:", error);
    }
  };

  const updateInvitationStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(
        `${apiEndPoint}/${id}/status`,
        null,  // Sending no body data
        {
          params: { status: newStatus },
          headers: {
            'Authorization': `Basic ${btoa('admin:password')}`
          }
        }
      );

      if (response.status === 200) {
        setReload(!reload);
        console.log("Invitation status updated successfully.");
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error updating invitation:", error);
    }
  };

  const formatDate = (date) => {
    try {
      return new Date(date).toLocaleDateString();
    } catch {
      return "-";
    }
  };

  const formatTime = (time) => {
    try {
      return new Date(`1970-01-01T${time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return "-";
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
            {invitations.length > 0 ? (
              invitations.map((invitation, index) => (
                <tr key={invitation.id}>
                  <td>{index + 1}</td>
                  <td>{invitation.title}</td>
                  <td>{formatDate(invitation.date)}</td>
                  <td>{formatTime(invitation.startTime)}</td>
                  <td>{formatTime(invitation.endTime)}</td>
                  <td>{invitation.location}</td>
                  <td>
                    <span className={`badge ${invitation.status === "accepted" ? "bg-success" : invitation.status === "declined" ? "bg-danger" : "bg-warning"}`}>
                      {invitation.status}
                    </span>
                  </td>
                  <td>
                    {invitation.status === "pending" && (
                      <>
                        <button className="btn btn-sm btn-success" onClick={() => updateInvitationStatus(invitation.id, "accepted")}>
                          <FaCheck />
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={() => updateInvitationStatus(invitation.id, "declined")}>
                          <FaTimes />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">No invitations found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvitationList;