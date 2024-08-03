import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = Cookies.get("token");
        const role = Cookies.get("role");

        if (!token) {
          throw new Error("No token found");
        }

        if (role !== "admin") {
          throw new Error("Unauthorized role");
        }

        console.log("Token in frontend:", token); // Log the token to ensure it is being retrieved
        console.log("Role in frontend:", role); // Log the role to ensure it is being retrieved

        const response = await axios.get(
          "https://leveledgetask-backend.vercel.app/api/v1/admin/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true, // Ensure cookies are included
          }
        );

        console.log("Response data:", response.data); // Log the entire response for debugging
        if (response.data.success && Array.isArray(response.data.users)) {
          setUsers(response.data.users);
        } else {
          throw new Error("Unexpected data format");
        }
      } catch (error) {
        console.error("Error response:", error.response || error.message); // More detailed error logging
        toast.error("Failed to fetch users: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/user/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const token = Cookies.get("token");
      await axios.delete(
        `http://leveledgetask-backend.vercel.app/api/v1/admin/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setUsers(users.filter((user) => user._id !== id));
      toast.success("User removed successfully!");
    } catch (error) {
      console.error("Error removing user:", error.response || error.message);
      toast.error("Failed to remove user: " + error.message);
    }
  };

  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "role", headerName: "Role", width: 150 },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => (
        <IconButton onClick={() => handleEdit(params.row.id)} color="primary">
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleDelete(params.row.id)}
          color="secondary"
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  const rows = users.map((user) => ({
    id: user._id, // Data Grid requires an `id` field
    name: user.name,
    email: user.email,
    role: user.role,
  }));

  return (
    <div className="user-list-page">
      <ToastContainer />
      <h1>User List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="data-grid-container">
          <DataGrid rows={rows} columns={columns} pageSize={10} />
        </div>
      )}
    </div>
  );
};

export default Users;
