import { Button, TextField, Typography, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { FlexBox } from "./FlexBox";
import * as Yup from "yup";
import { Box } from "@mui/material";
import { Formik, Field, ErrorMessage } from "formik";
import Dropzone from "react-dropzone";
import { useDispatch } from "react-redux";
import { setLogin } from "../state/reducers";
import { useNavigate } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import { useTheme } from "@emotion/react";

export default function Form() {
  const [pageType, setpageType] = useState("login");

  let dispatch = useDispatch();
  let navigate = useNavigate();

  let isLogin = pageType === "login";
  let isMobile = useMediaQuery("(maxWidth:800px)");
  let {palette}= useTheme();

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const registerSchema = Yup.object().shape({
    firstName: Yup.string().required("required"),
    lastName: Yup.string().required("required"),
    location: Yup.string().required("required"),
    occupation: Yup.string().required("required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    image: Yup.string(),
  });

  const handleSubmit = async (values, onSubmitProps) => {
    if (isLogin) {
      let uri = "http://localhost:4000/auth/login";

      const response = await fetch(uri, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let json = await response.json();

      if (json.user) {
        dispatch(setLogin({ user: json.user, token: json.token }));
        onSubmitProps.resetForm();
        navigate("/home");
      } else {
        alert(json.message);
      }
    } else {
      let uri = "http://localhost:4000/auth/register";

      let formData = new FormData();

      for (const key in values) {
        formData.append(key, values[key]);
      }

      const response = await fetch(uri, {
        method: "POST",
        body: formData,
      });

      let json = await response.json();
      onSubmitProps.resetForm();
      setpageType("login");
    }
  };

  return (
    <Box>
      {!isLogin ? (
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            location: "",
            occupation: "",
            email: "",
            password: "",
            image: "",
          }}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: "grid",
                  gap: "30px",
                  gridTemplateColumns: "repeat(4,1fr)",
                  width: isMobile ? "93%" : "50%",
                }}
              >
                <TextField
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  label="firstName"
                  sx={{ gridColumn: "span 2" }}
                />
                {errors.firstName && touched.firstName && errors.firstName}
                <TextField
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  label="lastName"
                  sx={{ gridColumn: "span 2" }}
                />
                {errors.lastName && touched.lastName && errors.lastName}
                <TextField
                  type="text"
                  name="occupation"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.occupation}
                  label="occupation"
                  sx={{ gridColumn: "span 4" }}
                />
                {errors.occupation && touched.occupation && errors.occupation}
                <TextField
                  type="text"
                  name="location"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.location}
                  label="location"
                  sx={{ gridColumn: "span 4" }}
                />
                {errors.location && touched.location && errors.location}
                <Box
                  border="3px solid black"
                  borderRadius="5px"
                  sx={{ gridColumn: "span 4" }}
                >
                  <label>Image</label>
                  <Dropzone
                    onDrop={(acceptedFiles) => {
                      // Update the image field in formik values
                      setFieldValue("image", acceptedFiles[0]);
                    }}
                    accept="image/*" // Set accepted file types
                    multiple={false} // Allow only one file
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box {...getRootProps()}          border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}>
                        <input {...getInputProps()} />
                        {!values.image ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBox>
                            <Typography>{values.image.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBox>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                  {isSubmitting ? (
                    <div className="loading">Uploading...</div>
                  ) : null}
                </Box>
                <TextField
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  label="email"
                  sx={{ gridColumn: "span 4" }}
                />
                {errors.email && touched.email && errors.email}
                <TextField
                  type="text"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  label="password"
                  sx={{ gridColumn: "span 4" }}
                />
                {errors.password && touched.password && errors.password}

              </Box>
              <Button onClick={handleSubmit}>Register</Button>
            </form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <Box>
                <TextField
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  label="email"
                />
                {errors.email && touched.email && errors.email}
                <TextField
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  label="password"
                />
                {errors.password && touched.password && errors.password}
              </Box>

              <Button onClick={handleSubmit}>Login</Button>
            </form>
          )}
        </Formik>
      )}

      <Button
        onClick={() => {
          setpageType(isLogin ? "register" : "login");
        }}
      >
        <Typography>{isLogin ? "New user?" : "Already a user?"}</Typography>
      </Button>
    </Box>
  );
}
