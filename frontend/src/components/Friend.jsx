// import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { setfriends } from "../state/state";
import { IconButton } from "@material-ui/core";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends || []);
  // console.log("friends", friends);
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend._id === friendId);
  // const isFriend=false
  const patchFriend = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/users/${_id}/${friendId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        // Handle server errors here, e.g., log the response status and error messages.
        console.error(`Server returned an error: ${response.status}`);
        return;
      }
      const data = await response.json();
      console.log(data, "data");
      dispatch(setfriends({ friends: data }));
    } catch (error) {
      console.log("An error happen while updation of friend");
    }
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <div
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <h5
            style={{ color: palette.neutral.dark }}
            className={`text-[${palette.neutral.dark}] font-medium hover:text-[${main}] hover:cursor-pointer`}
          >
            {name}
          </h5>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </div>
      </FlexBetween>
      <IconButton
        onClick={() => patchFriend()}
        style={{ backgroundColor: primaryLight, padding: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined style={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined style={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;
