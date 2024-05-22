import React from "react";
import { Box } from "@material-ui/core";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover" , borderRadius: "50%",aspectRatio:1/1 }}
        width={size}
        height={size}
        alt="user"
        src={`${image}`}
        
      />
    </Box>
  );
};

export default UserImage;