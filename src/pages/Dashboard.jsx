import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import useAuthCall from "../hooks/useAuthCall";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Cards from "./Card"
import { useState, useEffect } from "react";
import {toastErrorNotify } from "../helper/ToastNotify";
import bjk from "../assets/movbjk.gif";
import cat from "../assets/cat.gif";
import NewPost from "./NewPost";
import Profile from "./Profile";
import CardDetails from "./CardDetails";

const settings = ["Profile", "New Post", "Logout"];

function Dashboard() {
  const { error, photoURL } = useSelector((state) => state.auth);
  const { logout } = useAuthCall();
  const [controller, setController] = useState(false)
  const [profile, setProfile] = useState(false)
  const [cardController, setCardController] = useState(false)
  const [cardDetails, setCardDetails] = useState(false)
  useEffect(() => {
    error && toastErrorNotify("logout can not be performed");
  }, [error]);

  const [anchorElUser, setAnchorElUser] = React.useState(null);
 

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const check = (e) => {
    e.preventDefault();
    console.log(e.target.innerText);
    const control = e.target.innerText;
    if (control === "Logout") {
      logout();
    }
    if(control === "New Post"){
      console.log(control);
      setController(true)
      setProfile(false)
      setCardController(true)
      setCardDetails(false)
    }
    if(control === "Profile"){
      setProfile(true)
      setCardController(true)
      setController(false)
      setCardDetails(false)
    }
  };

 
  return (
    <>
      <AppBar position="static" >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Avatar className="bjkicon" alt="Remy Sharp" src={bjk} sx={{height:"auto", m:1}} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "flex" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              FireBlogApp
            </Typography>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={photoURL || cat} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={check}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {profile && <Profile setProfile={setProfile} setController={setController} setCardController={setCardController} setCardDetails={setCardDetails}/>}
      {controller && <NewPost setProfile={setProfile} setController={setController} setCardController={setCardController} setCardDetails={setCardDetails} />}
      {cardDetails && <CardDetails cardDetails={cardDetails} setProfile={setProfile} setController={setController} setCardController={setCardController} setCardDetails={setCardDetails} />}
      {!cardController && <Cards setProfile={setProfile} setController={setController} setCardController={setCardController} setCardDetails={setCardDetails}/>}
    </>
  );
}

export default Dashboard;
