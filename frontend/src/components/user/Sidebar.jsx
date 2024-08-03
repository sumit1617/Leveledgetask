import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Backdrop,
  Typography,
  Divider,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import AddIcon from "@mui/icons-material/Add"; // Importing AddIcon for the Add Product button
import StoreIcon from "@mui/icons-material/Store"; // Importing StoreIcon for the Products button

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    const name = Cookies.get("name");
    const email = Cookies.get("email");
    const role = Cookies.get("role");
    setUser({ name, email, role });
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("name");
    Cookies.remove("email");
    navigate("/");
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleUserListClick = () => {
    navigate("/admin/users");
  };

  const handleAddProductClick = () => {
    navigate("/manager/product/new");
  };

  const handleProductsClick = () => {
    navigate("/product");
  };

  return (
    <div>
      <IconButton onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <div className="sidebar">
          <div className="profile-section">
            <Avatar style={{ width: 60, height: 60, marginBottom: 10 }}>
              <PersonIcon style={{ width: 40, height: 40 }} />
            </Avatar>
            <Typography variant="body1">
              <strong>Name:</strong> {user.name}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography variant="body1">
              <strong>Role:</strong> {user.role}
            </Typography>
          </div>
          <Divider />
          <List>
            {user.role === "admin" && (
              <ListItem
                button
                onClick={handleUserListClick}
                className="MuiListItem-root"
              >
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="User List" />
              </ListItem>
            )}
            {user.role === "manager" && (
              <ListItem
                button
                onClick={handleAddProductClick}
                className="MuiListItem-root"
              >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Add Product" />
              </ListItem>
            )}
            <ListItem
              button
              onClick={handleProductsClick}
              className="MuiListItem-root"
            >
              <ListItemIcon>
                <StoreIcon />
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItem>
            <ListItem
              button
              onClick={handleLogout}
              className="MuiListItem-root"
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <Backdrop open={open} onClick={toggleDrawer} />
    </div>
  );
};

export default Sidebar;
