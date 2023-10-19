import React, { useState } from "react";
import { FlexBox } from "../components/FlexBox";
import { IconButton, InputBase, TextField, Box, Button } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicIcon from "@mui/icons-material/Mic";
import MovieIcon from "@mui/icons-material/Movie";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../state/reducers";
import { WidgetWrapper } from "../components/WidgetWrapper";
import { useTheme } from "@emotion/react";
import {Typography} from "@mui/material";
import EditOutlined from "@mui/icons-material/EditOutlined";

export default function NewPost() {
  const [isImage, setisImage] = useState(false);
  const [post, setpost] = useState("");
  let file = null;
  let user = useSelector((state) => state.user);
  let token = useSelector((state) => state.token);
  let posts = useSelector((state) => state.posts);
  let dispatch = useDispatch();
  let {palette} = useTheme();

  const handlePost = async () => {
    let formData = new FormData();

    formData.append("userId", user._id);
    formData.append("location", user.location);
    formData.append("description", post);
    formData.append("image", file);

    let uri = "http://localhost:4000/post/createpost";

    let options = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(uri, options);
    const postList = await response.json();
    dispatch(setPosts({ posts: postList }));
  };

  return (
    <WidgetWrapper marginBottom="20px">
      <img
        src={`http://localhost:4000/assets/${user.picturePath}`}
        style={{ height: "60px" }}
      />
      <InputBase
        placeholder="Whats on your mind?"
        value={post}
        onChange={(e) => setpost(e.target.value)}
        sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
      />
      <Box>
        {isImage ? (
          <Dropzone
          multiple={false}
            onDrop={(acceptedFiles) => {
              file = acceptedFiles[0];
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!file ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBox>
                      <Typography>{file.name}</Typography>
                      <EditOutlined />
                    </FlexBox>
                  )}
                </Box>
            )}
          </Dropzone>
        ) : null}
      </Box>

      <Box>
        <FlexBox>
          <IconButton
            onClick={() => {
              setisImage(!isImage);
            }}
          >
            <ImageIcon />
            Image
          </IconButton>
          <IconButton>
            <MovieIcon />
            Clip
          </IconButton>
          <IconButton>
            <AttachFileIcon />
            Attachment
          </IconButton>
          <IconButton>
            <MicIcon />
            Audio
          </IconButton>

          <Button onClick={handlePost}>Post</Button>
        </FlexBox>
      </Box>
    </WidgetWrapper>
  );
}
