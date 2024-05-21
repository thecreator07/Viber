import * as React from "react";
import * as yup from "yup";
import { Formik } from "formik";
// import ButtonBase from "@material-ui/core/ButtonBase"; // const registerSchema = yup.object().shape({
import { useMediaQuery, useTheme } from "@mui/material";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import FlexBetween from "../../components/FlexBetween";
import Dropzone from "react-dropzone";
import EditOutlined from "@mui/icons-material/EditOutlined";
// import { Margin, Palette } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../state/state";


const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};
const Forms = () => {
  const [pageType, setPageType] = React.useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { palette } = useTheme();
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const register = async (values, onSubmitProps) => {
    // const user = {
    //   firstName: values.firstName,
    //   lastName: values.lastName,
    //   email: values.email,
    //   password: values.password,
    //   location: values.location,
    //   occupation: values.occupation,
    //   picturePath: values.picture.name, // Assuming this is the picture path
    // };
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch("http://localhost:4000/auth/register", {
      method: "POST",
      body: formData, // Convert user object to JSON string
    });
  
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();
  console.log(savedUser)
    if (savedUser) {
      setPageType("login");
    }
  };
  
  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form className="" onSubmit={handleSubmit}>
          <Box className="flex w-full flex-col gap-8 ">
            {isRegister && (
              <>
                <FlexBetween
                  gap={"30px"}
                  style={{ flexDirection: isNonMobile ? "row" : "column" }}
                >
                  <TextField
                  className="changing"
                    label="firstName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="firstName"
                    error={
                      Boolean(touched.firstName) && Boolean(errors.firstName)
                    }
                    helperText={touched.firstName && errors.firstName}
                    style={{ width: "100%" }}
                    sx={{color:"white"}}
                    placeholderTextColor="white"
                  />
                  <TextField
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                    error={
                      Boolean(touched.lastName) && Boolean(errors.lastName)
                    }
                    helperText={touched.lastName && errors.lastName}
                    style={{ width: "100%" }}
                  />
                </FlexBetween>
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  style={{ width: "100%" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  style={{ width: "100%" }}
                />
                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(acceptedFiles) =>
                    setFieldValue("picture", acceptedFiles[0])
                  }
                >
                  {({ getRootProps, getInputProps }) => (
                    <Box
                      {...getRootProps()}
                      style={{
                        border: "2px",
                        padding: "1rem",
                        borderBlockStyle: "dashed",
                        borderBlockEndStyle: "dashed",
                        cursor: "pointer",
                      }}
                    >
                      <input {...getInputProps()} />
                      {!values.picture ? (
                        <p>Add Picture Here</p>
                      ) : (
                        <FlexBetween>
                          <Typography>{values.picture.name}</Typography>
                          <EditOutlined />
                        </FlexBetween>
                      )}
                    </Box>
                  )}
                </Dropzone>
              </>
            )}
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              style={{ width: "100%" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              style={{ width: "100%" }}
            />
            <Button
              type="submit"
              style={{
                width: "100%",
                Margin: "2rem 0",
                padding: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
              }}
            >
              {isLogin ? "login" : "register"}
            </Button>
          </Box>
          <Typography
            onClick={() => {
              setPageType(isLogin ? "register" : "login");
              resetForm();
            }}
            className={`hover:cursor-pointer `}
            style={{
              textDecoration: "underline",
              color: palette.primary.main,
              marginTop: "10px",
              textAlign: "right",
            }}
          >
            {isLogin
              ? "Don't have an account? Sign Up here."
              : "Already have an account? Login here."}
          </Typography>
        </form>
      )}
    </Formik>
  );
};

export default Forms;
