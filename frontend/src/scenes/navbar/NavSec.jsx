import React,{useEffect} from  "react";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import { useMediaQuery, useTheme } from "@mui/material";
import { setLogout, setMode } from "../../state/state";

import { TbSearch } from "react-icons/tb";
import { MdDarkMode } from "react-icons/md";
import { BsFillCloudSunFill } from "react-icons/bs";
import { BiMessageDetail } from "react-icons/bi";
import { IoMdNotifications, IoMdHelpCircle } from "react-icons/io";
import { MdOutlineMenuOpen } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { MenuItem, Select } from "@material-ui/core";
const NavSec = () => {
  const [value, setvalue] = React.useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [IsMobileMenuToggled, setIsMobileMenuToggled] = React.useState(true);
  const user = useSelector((state) => state.user);

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;
  useEffect(() => {
    document.body.style.background = background;
  }, [theme.palette.mode]);
  return (
    <>
      <FlexBetween
        backgroundColor={alt}
        className={`w-screen fixed px-2 md:px-4 py-4 z-50 bg-gray-300 `}
      >
        <FlexBetween className="md:gap-7 gap-2">
          <h2
            className="font-bold viber text-xs bg-clip-text"
            onClick={() => navigate("/home")}
          >
            Viber
          </h2>
          {!isNonMobileScreens ? null : (
            <button className="relative">
              <input
                className={` ${
                  theme.palette.mode === "dark"
                    ? "bg-slate-800 text-white"
                    : "bg-slate-100 text-slate-800"
                } rounded-md p-2.5 md:w-64 w-48 hover:outline-1 hover:outline-red-300 shadow-md border-none text-neutral-700 font-normal`}
                type="text"
                placeholder="Search"
                value={value}
                onChange={(e) => setvalue(e.target.value)}
              />

              <TbSearch
                className="absolute top-[25%] right-4 text-green-500"
                size={22}
              />
            </button>
          )}
        </FlexBetween>
        {isNonMobileScreens ? (
          <FlexBetween gap="2rem">
            <button onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <BsFillCloudSunFill className="text-yellow-500" size={25} />
              ) : (
                <MdDarkMode
                  className="text-black bg-clip-text transparent gradcol"
                  size={25}
                />
              )}
            </button>
            <BiMessageDetail
              className={`${
                theme.palette.mode === "dark" ? "text-white" : "text-black"
              }`}
              size={25}
            />
            <IoMdNotifications
              className={`text-black ${
                theme.palette.mode === "dark" ? "text-white" : "text-black"
              }`}
              size={25}
            />
            <IoMdHelpCircle
              className={`text-black ${
                theme.palette.mode === "dark" ? "text-white" : "text-black"
              }`}
              size={25}
            />
            {/* <select
              className="select"
              value={username}
              onChange={handleSelectChange}
              style={{ color: "white", background: "gray" }}
            >
              <option value={username}>{username}</option>
              <option onClick={() => dispatch(setLogout())}>Log Out</option>
            </select> */}
            <Select
              value={fullName}
              style={{
                backgroundColor: neutralLight,
                width: "150px",
                color: theme.palette.mode === "dark" ? "white" : "black",
                borderRadius: "0.25rem",
                padding: "0.25rem 1rem",
              }}
            >
              <MenuItem value={fullName}>
                <span>{fullName}</span>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FlexBetween>
        ) : (
          <button
            className="fixed right-2"
            onClick={() => setIsMobileMenuToggled(!IsMobileMenuToggled)}
          >
            {IsMobileMenuToggled ? (
              <MdOutlineMenuOpen
                style={{
                  color: theme.palette.mode === "dark" ? "white" : "black",
                }}
                size={30}
              />
            ) : (
              <IoCloseSharp
                style={{
                  color: theme.palette.mode === "dark" ? "white" : "black",
                }}
                size={25}
              />
            )}
          </button>
        )}
      </FlexBetween>
      {!isNonMobileScreens && (
        <div
          style={{ backgroundColor: alt }}
          className={`transitioning ${IsMobileMenuToggled?"-right-96 ":" right-0"} w-fit top-10 z-50 flex items-end rounded-bl-md pb-2 pr-2 pl-2 gap-2  flex-col fixed`}
        >
          <button  onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <BsFillCloudSunFill className="text-yellow-500" size={25} />
            ) : (
              <MdDarkMode
                className="text-black bg-clip-text transparent gradcol"
                size={25}
              />
            )}
          </button>
          <BiMessageDetail
            className={`${
              theme.palette.mode === "dark" ? "text-white" : "text-black"
            }`}
            size={25}
          />
          <IoMdNotifications
            className={`${
              theme.palette.mode === "dark" ? "text-white" : "text-black"
            }`}
            size={25}
          />
          <IoMdHelpCircle
            className={`${
              theme.palette.mode === "dark" ? "text-white" : "text-black"
            }`}
            size={25}
          />
          <Select
            value={fullName}
            style={{
              backgroundColor: neutralLight,
              width: "150px",
              color: theme.palette.mode === "dark" ? "white" : "black",
              borderRadius: "0.25rem",
              padding: "0.25rem 1rem",
            }}
          >
            <MenuItem value={fullName}>
              <span>{fullName}</span>
            </MenuItem>
            <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
          </Select>
        </div>
      )}
    </>
  );
};

export default NavSec;
