import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, InputBase } from "@mui/material";
import { AiFillHome } from "react-icons/ai";
import { PiWarningCircleFill } from "react-icons/pi";
import { IoIosContact } from "react-icons/io";
import { FaMessage } from "react-icons/fa6";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { userContext } from "../../App";
import { styled, alpha } from "@mui/material/styles";
import { CiSearch } from "react-icons/ci";

import "./nav.css";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto"
  }
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch"
    }
  }
}));
const handleSearchChange = (event) => {
  console.log("Performing search for:", searchTerm);
};
const Nav = () => {
  const {
    dashBoard,
    setDashBoard,
    filteredJobs,
    logout,
    isLoggedIn,
    userPersonal,
    searchTerm,
    setSearchTerm
  } = useContext(userContext);

  return (
    <>
      {isLoggedIn && (
        <AppBar position="static" color="inherit" className="marg">
          <Toolbar>
            <img
              src="https://i.ibb.co/tDmLH5H/logo.png"
              alt="Logo"
              className="logo"
            />

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" className="nav-link">
                <AiFillHome className="home" />
              </Link>
            </Typography>
            <Search>
              <SearchIconWrapper>
                <CiSearch />
              </SearchIconWrapper>
              <SearchInput
                placeholder="Search"
                inputProps={{ "aria-label": "search" }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Search>

            <Button color="inherit" to="/newJob"></Button>
            <Button color="inherit">
              <Link to="about">
                <PiWarningCircleFill className="con" />
              </Link>
            </Button>
            <Button color="inherit">
              <Link to="/job">
                <FaMessage className="con" />
              </Link>
            </Button>
            <Button color="inherit">
              <Link to="/login">
                {userPersonal.photo ? (
                  <img
                    src={userPersonal.photo}
                    className="rounded-circle mr-2"
                    width="20"
                    height="20"
                    alt="User"
                  />
                ) : (
                  <IoIosContact className="con" />
                )}
              </Link>
            </Button>
            <Button
              onClick={() => {
                logout();
              }}
            >
              {" "}
              <RiLogoutCircleRLine />
            </Button>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
};

export default Nav;
