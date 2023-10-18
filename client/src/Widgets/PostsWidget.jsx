import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../state/reducers";
import { Box } from "@mui/material";
import Friend from "../components/Friend";
import PostWidget from "./PostWidget";
import { WidgetWrapper } from "../components/WidgetWrapper";

export default function PostsWidget() {

    let posts= useSelector((state)=>state.posts);
    let token= useSelector((state)=>state.token);
    let dispatch= useDispatch();
    
  
    const getDetails = async () => {
  
      const response = await fetch("http://localhost:4000/post/allposts", {
        method: "GET",
        headers: {
        'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        
      });
  
      let postList = await response.json();
      dispatch(setPosts({posts: postList}));
    };

    useEffect(()=>{
        getDetails();
    },[])

    if(!posts) return null;

  return <WidgetWrapper> {posts.map((post)=>{
    return <Box>
        <Friend friendId={post.userId} />
        <PostWidget
        key={post._id}
        postId={post._id}
        description={post.description}
        likes={post.likes}
        comments={post.comments}
        picturePath={post.picturePath}
         />
    </Box>
  })}
  </WidgetWrapper>
}
