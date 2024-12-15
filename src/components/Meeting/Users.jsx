import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const apiEndPoint = "http://localhost:8080/api/Users";
  

  const [users, setUsers] = useState([]);
  const [reload, setReload ] = useState(false);

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
  };
  const updateUserStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(
        `${apiEndPoint}/${id}?status=${newStatus}`
      );
      if (response.status === 204) {
        setReload(!reload);
        console.log("User status updated successfully.");
      }
    } catch (error) {
      console.log("Error updating user:", error);
    }
  };
  return (

    <div className="container mt-5">
    <h2 className="text-center mb-4">users</h2>
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Email</th>
            <th>Role</th>
            <th>status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
              <span
                    className={`badge ${
                      user.status === "accepted"
                        ? "bg-success"
                        : user.status === "rejected"
                        ? "bg-danger"
                        : "bg-warning"  
                        
                       
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td>
                  {user.status === "pending" && (
                    <>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() =>
                          updateUserStatus(user.id, "accepted")
                        }
                      >
                      Register 
                      </button>
                      <button className="btn btn-sm btn-danger">
                      Reject 
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

   

export default Users
