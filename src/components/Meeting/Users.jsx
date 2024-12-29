import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';  

const Users = () => {
  const apiEndPoint = "http://localhost:8080/api/Users";
  const [users, setUsers] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const confirmRowRef = useRef(null);
  const [currentUser, setCurrentUser] = useState(null);  
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();  

  useEffect(() => {
    setCurrentUser({ role: "Admin" }); 

    fetchAllUsers();
  }, [reload]);

  const fetchAllUsers = async () => {
    await axios.get(apiEndPoint, {
      headers: {
        'Authorization': `Basic ${btoa('admin:password')}`
      }
    })
    .then(response => {
      if (response.status === 200) {
        setUsers(response.data);
      } else {
        console.log("Unexpected response status:", response.status);
      }
    })
    .catch(() => {
      console.log("Error occurred during the API call.");
    });

    const handleClickOutside = (event) => {
      if (confirmRowRef.current && !confirmRowRef.current.contains(event.target)) {
        setConfirmDelete(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${apiEndPoint}/${id}`, {
        headers: {
          'Authorization': `Basic ${btoa('admin:password')}`
        }
      });
      if (response.status === 204) {
        setReload(!reload);
        setConfirmDelete(null);
      } else {
        alert('Failed to delete user');
      }
    } catch (error) {
      alert('Error deleting user: ' + error.message);
    }
  };

  const navigateToScheduleMeeting = () => {
    navigate('/scheduleMeeting');  
  }

  const hasPermission = (action) => {
    if (!currentUser) return false;
    const { role } = currentUser;
    if (role === 'Admin') return true;
    if (role === 'User' && (action === 'createMeeting' || action === 'deleteMeeting')) return true;
    if (role === 'Guest' && action === 'view') return true; 
    return false;
  };

  return (
    hasPermission('view') && (
      <div className="container mt-5">
        <h2 className="text-center mb-4">Users</h2>
        {hasPermission('createMeeting') && (
          <button 
            className="btn btn-primary mb-3"
            onClick={navigateToScheduleMeeting}  
          >
            CREATE MEETING
          </button>
        )}
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <React.Fragment key={user.id}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge bg-${
                        user.role === 'Admin' ? 'success' :
                        user.role === 'User' ? 'warning' :
                        'danger'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      {hasPermission('deleteMeeting') && (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => setConfirmDelete(user.id)}
                        >
                          DELETE
                        </button>
                      )}
                    </td>
                  </tr>
                  {confirmDelete === user.id && hasPermission('deleteMeeting') && (
                    <tr ref={confirmRowRef}>
                      <td colSpan="6">
                        <div className="alert alert-warning d-flex align-items-center justify-content-between m-0">
                          <span>Are you sure you want to delete this meeting?</span>
                          <div>
                            <button
                              className="btn btn-danger btn-sm me-2"
                              onClick={() => handleDelete(user.id)}
                            >
                              Yes, Delete
                            </button>
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={() => setConfirmDelete(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  );
};

export default Users;
