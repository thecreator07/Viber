import { useTheme } from "@mui/material";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setfriends } from "../../state/state";
const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:4000/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setfriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <h5
        style={{
          color: palette.neutral.dark,
          fontSize: "16px",
          fontWeight: "500",
          marginBottom: "1.5rem",
        }}
      >
        Friend List
      </h5>
      <div className="flex flex-col gap-6">
        {Array.isArray(friends) &&
          friends.length > 0 &&
          friends.map((friend) => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
          ))}
        {(!Array.isArray(friends) || friends.length === 0) && (
          <p>No friends to display.</p>
        )}
      </div>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
