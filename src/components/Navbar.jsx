import React, { useState } from "react";
import { BsArrowDownCircle } from "react-icons/bs";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useStateContext } from "../contexts/ContextProvider";
import { useLogoutMutation } from "../app/services/newsApi";

const Header = () => {
  const { user } = useStateContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const currentSlug = pathname.slice(1);

  const [logout] = useLogoutMutation();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickSignOut = (e) => {
    e.preventDefault();

    logout()
      .unwrap()
      .then(() => {
        localStorage.removeItem("CURRENT_USER");
        navigate(0);
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 border-b-2">
      <div className="relative flex h-16 justify-between">
        <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex items-center">
            <h1 className="font-bold text-xl text-gray-600">News</h1>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link
              to="/"
              className={`${
                currentSlug
                  ? "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  : "border-indigo-500 text-gray-900"
              } inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium`}
            >
              Home
            </Link>
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          {user ? (
            <div>
              <Tooltip title="Account settings">
                <p className="flex items-center" onClick={handleClick}>
                  <span className="mr-2">{user?.name}</span>
                  <BsArrowDownCircle />
                </p>
              </Tooltip>

              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleClose}>
                  <Link
                    to="/"
                    className="block px-4 py-2 text-sm text-gray-700"
                  >
                    Your Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link
                    to="/preferences"
                    className="block px-4 py-2 text-sm text-gray-700"
                  >
                    Preferences
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <div
                    className="block px-4 py-2 text-sm text-gray-700"
                    onClick={onClickSignOut}
                  >
                    Sign out
                  </div>
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
