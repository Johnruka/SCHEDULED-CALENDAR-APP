import React, { useEffect, useState, useRef } from "react";
import axios from "axios";


 const Users = () => {
  const apiEndPoint = "http://localhost:8080/api/Users";

  const [users, setUsers, onUserDeleted, onEditUser] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const confirmRowRef = useRef(null);

  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetchAllUsers();
  }, [reload]);

  const fetchAllUsers = async () => {
    console.log("Step1: Starting to fetch users...");
    await axios
      .get(apiEndPoint)
      .then((response) => {
        console.log("Step2: Response received.", response);
        if (response.status === 200) {
          console.log("response data is: ", response.data);
          setUsers(response.data);
        } else {
          console.log("Unexpected response status:", response.status);
        }
      })
      .catch(() => {
        console.log("Error occured during the API call.");
      });
    console.log("Step3: Finished fetching users.");
  
    const handleClickOutside = (event) => {
        if (confirmRowRef.current && !confirmRowRef.current.contains(event.target)) {
            setConfirmDelete(null);
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    }
    
    };

  const handleDelete = async (id) => {
    try {
      const response = await axios.put(
        `${apiEndPoint}/${id}?status=${newStatus}`
      );
      if (response.status === 204) {
        setReload(!reload);
        setConfirmDelete(null);
        onUserDeleted();
    } else {
        alert('Failed to delete user: ' + result.error);
    }
} catch (error) {
    alert('Error deleting user: ' + error.message);
}
};  
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Users</h2>
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
                                        user.role === 'User' ? 'warning':
                                        user.role === 'Guest' ? 'danger': 'danger'
                                    }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td>
                                    <button 
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => onEditUser(user)}
                                        firstName="Edit User"
                                        
                                    >
                                        EDIT
                                    </button>
                                    <button 
                                        className="btn btn-danger btn-sm"
                                        onClick={() => setConfirmDelete(user.id)}
                                        firstName="Delete User"
                                    >
                                       DELETE
                                    </button>
                                </td>
                            </tr>
                            {confirmDelete === user.id && (
                                <tr ref={confirmRowRef}>
                                    <td colSpan="6">
                                        <div className="alert alert-warning d-flex align-items-center justify-content-between m-0">
                                            <span>Are you sure you want to delete this user?</span>
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
                                No users scheduled
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>

);
}; 


   

export default Users
