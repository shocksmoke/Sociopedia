import React, { useEffect, useState } from "react";
import { IconButton, Input, Typography, useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HelpIcon from "@mui/icons-material/Help";
import { FlexBox } from "./FlexBox";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@emotion/react";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import { setLogout, setMode } from "../state/reducers";
import { useNavigate } from "react-router";
import { InputBase } from "@mui/material";
import Search from "@mui/icons-material/Search";

export default function Navbar() {
  let navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState("option1");
  const [showMobileMenu, setshowMobileMenu] = useState(false);

  let isMobile = useMediaQuery("(max-width: 800px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleClick = () => {
    setshowMobileMenu(!showMobileMenu); // Toggle the state
  };

  const handleLogout = () => {
    dispatch(setLogout());
  };

  return isMobile ? (
    <FlexBox backgroundColor={alt} flexDirection="column">
      <FlexBox style={{ width: "100%" }}>
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          Mobile Sociopedia
        </Typography>
        <FlexBox  backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem">
          <InputBase placeholder="Search..." />
          <IconButton>
            <Search />
          </IconButton>
        </FlexBox>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          startIcon={<MenuIcon />} // Hamburger icon
        ></Button>
      </FlexBox>

      {showMobileMenu ? (
        <FlexBox flexDirection="column" style={{ width: "100%" }}>
          <IconButton>
            <DarkModeIcon />
          </IconButton>
          <IconButton>
            <MessageIcon />
          </IconButton>
          <IconButton>
            <NotificationsIcon />
          </IconButton>
          <IconButton>
            <HelpIcon />
          </IconButton>

          <FormControl>
            <Select
              value={selectedValue}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Select" }}
            >
              <MenuItem value="" disabled>
                Select an option
              </MenuItem>
              <MenuItem value={"option1"}>Option 1</MenuItem>
              <MenuItem value={"option2"}>Option 2</MenuItem>
              <MenuItem value={"option3"}>Option 3</MenuItem>
            </Select>
          </FormControl>
        </FlexBox>
      ) : null}
    </FlexBox>
  ) : (
    <FlexBox>
      <FlexBox>
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          Desktop Sociopedia
        </Typography>
        <FlexBox
          backgroundColor={neutralLight}
          borderRadius="9px"
          gap="3rem"
          padding="0.1rem 1.5rem"
        >
          <InputBase placeholder="Search..." />
          <IconButton>
            <Search />
          </IconButton>
        </FlexBox>
      </FlexBox>
      <FlexBox>
        <IconButton>
          <DarkModeIcon />
        </IconButton>
        <IconButton>
          <MessageIcon />
        </IconButton>
        <IconButton>
          <NotificationsIcon />
        </IconButton>
        <IconButton>
          <HelpIcon />
        </IconButton>

        <FormControl>
          <Select
            value={selectedValue}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Select" }}
          >
            <MenuItem value="" disabled>
              Select an option
            </MenuItem>
            <MenuItem value={"option1"} onClick={handleLogout}>
              Logout
            </MenuItem>
            <MenuItem value={"option2"}>Option 2</MenuItem>
            <MenuItem value={"option3"}>Option 3</MenuItem>
          </Select>
        </FormControl>
      </FlexBox>
    </FlexBox>
  );
}
