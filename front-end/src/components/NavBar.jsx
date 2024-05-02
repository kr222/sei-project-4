import React, { useContext } from "react";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import CottageIcon from "@mui/icons-material/Cottage";

import { Link, NavLink, useNavigate } from "react-router-dom";

import UserContext from "../context/user";

const NavBar = () => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);

  const logout = () => {
    console.log(`logging out`);
    sessionStorage.clear("access");
    sessionStorage.clear("role");
    userCtx.setAccessToken(undefined);
    userCtx.setRefreshToken(undefined);
    userCtx.setUsername(undefined);
    userCtx.setUserId(undefined);
    userCtx.setRole(undefined);
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            component={Link}
            to="/"
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <CottageIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Project 4
          </Typography>
          {userCtx.role === "admin" && (
            <Button component={NavLink} to="admin" color="inherit">
              Admin
            </Button>
          )}
          {(userCtx.role === "staff" || userCtx.role === "admin") && (
            <Button component={NavLink} to="staff" color="inherit">
              Staff
            </Button>
          )}
          {userCtx.role === undefined && (
            <Button component={NavLink} to="signin" color="inherit">
              Login
            </Button>
          )}
          {userCtx.role !== undefined && (
            <Button color="inherit" onClick={() => logout()}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
