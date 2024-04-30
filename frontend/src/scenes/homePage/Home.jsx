
import React, { useEffect } from "react";
import NavSec from "../navbar/NavSec";
import { useMediaQuery } from "@material-ui/core";
// import UserWidget from "../Widgets/UserWidget";
import UserWidgets from "../Widgets/UserWidgets";
import { useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import MyPostWidgets from "../Widgets/MyPostWidgets";
import PostsWidget from "../Widgets/PostsWidget";
import FriendListWidget from "../Widgets/FriendListWidget";
const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const { palette } = useTheme();

  const light = palette.background.default;
  const dark = palette.background.alt;

  return (
    <>
      <NavSec />
      <section
        className={`w-full   ${
          isNonMobileScreens ? "flex px-8 py-[6%]" : "block py-[15%]"
        } gap-2 justify-between`}
      >
        <div className={`${isNonMobileScreens ? "flexbas26" : undefined}`}>
          <UserWidgets userId={_id} picturePath={picturePath} />
        </div>
        <div className={`${isNonMobileScreens?"flexbas46 ":"mt-8"} `}>
          
        <MyPostWidgets picturePath={picturePath} />
        <PostsWidget userId={_id}/>
        </div>
        {isNonMobileScreens && (
          <div className={`${isNonMobileScreens ? "flexbas26" : undefined}`}>
            <FriendListWidget userId={_id} />
          </div>
        )}
      </section>
      {/* </section> */}
    </>
  );
};

export default HomePage;
