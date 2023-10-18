import React from "react";
import Navbar from "../components/Navbar";
import UserWidget from "../Widgets/UserWidget";
import { FlexBox } from "../components/FlexBox";
import NewPost from "../Widgets/NewPost";
import { Box, useMediaQuery } from "@mui/material";
import PostsWidget from "../Widgets/PostsWidget";
import FriendListWidget from "../Widgets/FriendListWidget";

export default function Home() {
  let isMobile = useMediaQuery("(max-width:800px)");
  return (
    <div>
      <Navbar />
      <Box sx={{ display: isMobile ? "block" : "flex" }}>
        <Box style={{ flexBasis: isMobile ? "none" : "30%" }} margin="10px">
          <UserWidget />
        </Box>
        <Box style={{ flexBasis: isMobile ? "none" : "40%" }} margin="10px">
          <NewPost />
          <PostsWidget />
        </Box>
        <Box style={{ flexBasis: isMobile ? "none" : "26%" }}>

        <FriendListWidget />
        </Box>
      </Box>
    </div>
  );
}
