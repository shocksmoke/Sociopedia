import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../state/reducers";
import Friend from "../components/Friend";
import { Box } from "@mui/material";
import { WidgetWrapper } from "../components/WidgetWrapper";

export default function FriendListWidget() {
  let friends = useSelector((state) => state.friends);
  let user = useSelector((state) => state.user);
  let token = useSelector((state) => state.token);

  let dispatch= useDispatch();

  const getDetails = async () => {
    const response = await fetch(
      `http://localhost:4000/user/friends/${user._id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
      );

      dispatch(setFriends({friends: (await response.json())}));

  };

  useEffect(() => {
    getDetails();
  }, []);

  return <WidgetWrapper>
    {friends.map((friend,index)=>{
        return <Friend key={friend._id} friendId={friend._id}/>
    })}
  </WidgetWrapper>
}
