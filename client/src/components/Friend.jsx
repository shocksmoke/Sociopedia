import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { FlexBox } from "./FlexBox";
import { Typography } from "@mui/material";
import { setFriends } from "../state/reducers";
import { useTheme } from "@emotion/react";

export default function Friend({ friendId }) {
  const [friend, setfriend] = useState(null);
  const [isFriend, setIsFriend] = useState(false);

  let token = useSelector((state) => state.token);
  let user = useSelector((state) => state.user);
  let friends = useSelector((state) => state.friends);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;


  let dispatch = useDispatch();

  const getDetails = async () => {
    const response = await fetch(`http://localhost:4000/user/${friendId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    setfriend(await response.json());


  };

  useEffect(() => {
    getDetails();
  }, []);

  const handleAddRemoveFriend = async () => {
    let uri = "http://localhost:4000/user/addRemoveFriend";
    let payload = {
      userId: user._id,
      friendId: friendId,
    };

    const response = await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    let newFriends = await response.json();

    dispatch(setFriends({ friends: newFriends }));

    setIsFriend(!isFriend);
  };

  if (!friend) return null;

  return (
    <Box>
      <FlexBox>
        <img
          src={`http://localhost:4000/assets/${friend.picturePath}`}
          style={{ height: "60px" }}
        />

        <Box>
          <Typography margin="3px" color={main}>
            {friend.firstName} {friend.lastName}
          </Typography>
          <Typography color={medium}>{friend.location}</Typography>
        </Box>
        <IconButton onClick={handleAddRemoveFriend} sx={{backgroundColor: primaryLight}}>
          {friends.some((friend)=>friend._id==friendId) ? <PersonRemoveIcon /> : <PersonAddIcon />}
        </IconButton>
      </FlexBox>
    </Box>
  );
}
