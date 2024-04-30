import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Box } from "@material-ui/core";
import UserWidgets from "../Widgets/UserWidgets";
import MyPostWidgets from "../Widgets/MyPostWidgets";
import PostsWidget from "../Widgets/PostsWidget";
import FriendListWidget from "../Widgets/FriendListWidget";
import NavSec from "../navbar/NavSec";

const ProfilePage = () => {
  const [user, setUser] = useState({ userId: "" });
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  console.log("userid", userId);
  
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
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <NavSec />
      <section
        className={`w-full   ${
          isNonMobileScreens ? "flex px-8 py-[6%]" : "block py-[15%]"
        } gap-5 justify-center`}
      >
        <div className={`${isNonMobileScreens ? "flexbas26" : undefined}`}>
          <UserWidgets userId={userId} picturePath={user.picturePath} />
          <div m="2rem 0" />
          <FriendListWidget userId={userId} />
        </div>

        <div className={`${isNonMobileScreens ? "flexbas42 " : "mt-8"} `}>
          <MyPostWidgets picturePath={user.picturePath} />
          <div m="2rem 0" />
          <PostsWidget userId={userId} isProfile />
        </div>
      </section>
    </Box>
  );
};

export default ProfilePage;
