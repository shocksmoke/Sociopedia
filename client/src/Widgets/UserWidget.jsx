import React, { useState } from "react";
import { FlexBox } from "../components/FlexBox";
import { Box, Divider, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import EditIcon from "@mui/icons-material/Edit";
import Edit from "@mui/icons-material/Edit";
import { WidgetWrapper } from "../components/WidgetWrapper";

export default function UserWidget() {
  let user = useSelector((state) => state.user);
  let friends = useSelector((state) => state.friends);

  return (
    <WidgetWrapper>
      <FlexBox>
        <img
          src={`http://localhost:4000/assets/${user.picturePath}`}
          style={{ height: "60px" }}
        />

        <Box>
          <Typography margin="3px">
            {user.firstName} {user.lastName}
          </Typography>
          <Typography>{friends.length} friends</Typography>
        </Box>
        <ManageAccountsIcon />
      </FlexBox>

      <Divider />

      <Box>
        <FlexBox>
          <LocationOnIcon />
          <Typography> {user.location}</Typography>
        </FlexBox>
        <FlexBox>
          <WorkOutlineIcon />
          <Typography> {user.occupation}</Typography>
        </FlexBox>
      </Box>

      <Divider />

      <Box>
        <Typography>Who's viewed your profile? {user.viewedProfile}</Typography>
        <Typography>Impressions of your posts {user.impressions}</Typography>
      </Box>

      <Divider />

      <Box>
        <Typography>Social Profile</Typography>
        <FlexBox>
          <img src="assets/linkedin.png" />
          <Typography>LinkedIn</Typography>
          <EditIcon />
        </FlexBox>
        <FlexBox>
          <img src="assets/twitter.png" />
          <Typography>Twitter</Typography>
          <EditIcon />
        </FlexBox>
      </Box>
    </WidgetWrapper>
  );
}
