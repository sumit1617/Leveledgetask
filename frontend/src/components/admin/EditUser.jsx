import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditUser.css"; // Import the CSS file
import { BACKEND_URL } from "../../config/config";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = Cookies.get("token");

        const response = await axios.get(`${BACKEND_URL}/admin/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        if (response.data.success) {
          setUser(response.data.user);
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user:", error.response || error.message);
        toast.error("Failed to fetch user: " + error.message);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("token");

      const response = await axios.put(
        `${BACKEND_URL}/admin/user/${id}`,
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("User updated successfully!");
        setTimeout(() => {
          navigate("/admin/users");
        }, 2000); // Delay of 2000ms before navigating
      } else {
        throw new Error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error.response || error.message);
      toast.error("Failed to update user: " + error.message);
    }
  };

  return (
    <div className="edit-user-page">
      <ToastContainer />
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Role:
          <select name="role" value={user.role} onChange={handleChange}>
            <option value="user">user</option>
            <option value="admin">admin</option>
            <option value="manager">manager</option>
          </select>
        </label>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default EditUser;
