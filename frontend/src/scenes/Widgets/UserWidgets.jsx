import React, { useState, useEffect } from "react";
import WidgetWrapper from "../../components/WidgetWrapper";
import FlexBetween from "../../components/FlexBetween";
import UserImage from "../../components/UserImage";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaTwitter } from "react-icons/fa";
import { AiFillLinkedin } from "react-icons/ai";
import { Box, Divider, Typography } from "@material-ui/core";
import {
  EditOutlined,
  LocationCityOutlined,
  ManageAccountsOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";

const UserWidgets = ({ userId, picturePath }) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const response = await fetch(`http://localhost:8000/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return null;
  }
  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      <FlexBetween
        gap={"0.5rem"}
        pb={"1.1rem"}
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap={"1rem"}>
          <UserImage image={picturePath} />
          <Box>
            <h4
              className={`text-xl hover:text-[${palette.primary.light}] hover:cursor-pointer`}
              style={{ color: dark, fontWeight: 500 }}
            >
              {firstName} {lastName}
            </h4>
            <h1 style={{ color: medium }} className={`text-xs `}>
             friends
            </h1>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined style={{ color: dark }} />
      </FlexBetween>
      <hr className="my-5 mx-0"/>
      <Box p="1rem 0">
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "0.5rem",
          }}
        >
          <LocationCityOutlined fontSize="large" style={{ color: main }} />
          <Typography style={{ color: medium }}>{location}</Typography>
        </Box>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography style={{ color: medium }}>{occupation}</Typography>
        </Box>
      </Box>
      <hr className="my-5 mx-0"/>
      <Box style={{ padding: "1rem 0" }}>
        <FlexBetween style={{ marginBottom: "0.5rem" }}>
          <Typography style={{ color: medium }}>
            Who's viewed your profile
          </Typography>
          <Typography style={{ color: main, fontWeight: "500" }}>
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography style={{ color: medium }}>
            Impressions of your post
          </Typography>
          <Typography style={{ color: main, fontWeight: "500" }}>
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>
      <hr className="my-5 mx-0"/>
      <Box style={{ padding: "1rem 0" }}>
        <h1 className={`font-medium mb-4 text-base `} style={{ color: main }}>
          Social Profiles
        </h1>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <FaTwitter style={{ color: medium }} size={20} />{" "}
            <Box>
              <Typography style={{ color: main, fontWeight: 500 }}>
                {" "}
                Twitter
              </Typography>

              <Typography style={{ color: medium }}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined style={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <AiFillLinkedin style={{ color: medium }} size={20} />{" "}
            <Box>
              <Typography style={{ color: main, fontWeight: 500 }}>
                Linkedin
              </Typography>
              <Typography style={{ color: medium }}>
                Network Platform
              </Typography>
            </Box>
          </FlexBetween>
          <EditOutlined style={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidgets;
