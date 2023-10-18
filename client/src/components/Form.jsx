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

export default function Form() {
  const [pageType, setpageType] = useState("login");

  let dispatch = useDispatch();
  let navigate = useNavigate();

  let isLogin = pageType === "login";
  let isMobile = useMediaQuery("(maxWidth:800px)");

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

      if(json.user){

        dispatch(setLogin({ user: json.user, token: json.token }));
        onSubmitProps.resetForm();
        navigate("/home");
      }
      else{
        alert(json.message)
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
      navigate("/");
    }
  };

  return (
    <Box alignItems="center" display="flex" flexDirection="column">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          width: isMobile ? "93%" : "50%",
        }}
      >
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
              <TextField
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  label="firstName"
                />
                {errors.firstName && touched.firstName && errors.firstName}
              <TextField
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  label="lastName"
                />
                {errors.lastName && touched.lastName && errors.lastName}
              <TextField
                  type="text"
                  name="occupation"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.occupation}
                  label="occupation"
                />
                {errors.occupation && touched.occupation && errors.occupation}
              <TextField
                  type="text"
                  name="location"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.location}
                  label="location"
                />
                {errors.location && touched.location && errors.location}
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
                  type="text"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  label="password"
                />
                {errors.password && touched.password && errors.password}

                <Box border="3px solid black" borderRadius="5px">
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
                      <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        <p>
                          Drag 'n' drop an image here, or click to select an
                          image
                        </p>
                      </div>
                    )}
                  </Dropzone>
                  {isSubmitting ? (
                    <div className="loading">Uploading...</div>
                  ) : null}
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
                
              <Button onClick={handleSubmit}>Login</Button>
              </form>
            )}
          </Formik>
        )}
      </Box>

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
