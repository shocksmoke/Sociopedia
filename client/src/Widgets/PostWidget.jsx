import { Button, IconButton, TextField, Typography } from "@mui/material";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ShareIcon from "@mui/icons-material/Share";
import { FlexBox } from "../components/FlexBox";
import { useState } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

export default function PostWidget({
  postId,
  description,
  likes,
  comments,
  picturePath,
}) {
  let user = useSelector((state) => state.user);
  let token = useSelector((state) => state.token);
  const [likeCount, setLikeCount] = useState(Object.keys(likes).length);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState(comments);
  

  const [isLike, setisLike] = useState(likes[user._id]);

  const handleLike = async () => {
    let uri = "http://localhost:4000/post/like";
    let payload = {
      userId: user._id,
      postId: postId,
    };

    const response = await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    likes = (await response.json()).likes;

    console.log(likes);

    setisLike(likes[user._id]);
    setLikeCount(Object.keys(likes).length);
  };

  const handleComment = async () => {
    let uri = "http://localhost:4000/post/comment";
    let payload = {
      comment: comment,
      postId: postId,
    };

    const response = await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    setCommentList((await response.json()).comments);
    setComment("");
  };

  return (
    <Box>
      <Typography>{description}</Typography>
      <img
        src={`http://localhost:4000/assets/${picturePath}`}
        width="400px"
      ></img>
      <FlexBox>
        <FlexBox>
          <IconButton onClick={handleLike}>
            {isLike ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <Typography> {likeCount}</Typography>
          <IconButton
            onClick={() => {
              setShowComment(!showComment);
            }}
          >
            <ChatBubbleIcon />
          </IconButton>
        </FlexBox>
        <FlexBox>
          <IconButton>
            <ShareIcon />
          </IconButton>
        </FlexBox>
      </FlexBox>
      {showComment ? (
        <Box>
          <TextField
          value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          >
          </TextField>
          <Button onClick={handleComment}>Post</Button>
          <FlexBox flexDirection={"column"}>
            {commentList.map((comment) => {
              return <Typography>{comment}</Typography>;
            })}
          </FlexBox>
        </Box>
      ) : null}
    </Box>
  );
}
