import React,{useEffect} from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import Forms from "./Forms";
// import NewForms from "./NewForms";
// import Form from "./Form" 
const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const background = theme.palette.background.default;
  useEffect(() => {
    document.body.style.background = background;
  }, [theme.palette.mode]);
  return (
    <>
      <Box>
        <Box
          width="100%"
          backgroundColor={theme.palette.background.al}
          p="1rem 6%"
          textAlign="center"
        >
          <Typography style={{fontSize:"32px",fontWeight:"bold",}}  color="primary">
            Viber
          </Typography>
        </Box>

        <Box
          width={isNonMobileScreens ? "50%" : "93%"}
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
        >
          <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
            Welcome to Viber, the Social Media for vibiest!
          </Typography>
          {/* <Form /> */}
          <Forms />
          {/* <NewForms/> */}
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
