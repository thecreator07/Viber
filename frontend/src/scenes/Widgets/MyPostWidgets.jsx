import React, { useState } from "react";
import UserImage from "../../components/UserImage";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useMediaQuery, useTheme } from "@mui/material";
import Dropzone from "react-dropzone";
import {
  AttachFileOutlined,
  DeleteOutline,
  EditOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import { ButtonBase, IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state/state";
// import WebCam from "../../components/WebCam";
// import AllCamera from "../../components/WebCam/AllCamera";
// import Camera from "../../components/WebCam/Camera";
// import WebCam from "../../components/WebCam";

const MyPostWidgets = ({ picturePath }) => {
  const [post, setPost] = useState("");
  // const [Isclip, setIsclip] = useState(false);
  // const [clip, setclip] = useState(null);
  const [isImage, setIsImage] = useState(true);
  const [image, setImage] = useState(null);

  const { palette } = useTheme();
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const isNonMobileScreens = useMediaQuery("(min-width:1000px");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);

  const handlePost = async () => {
    const postData = new FormData();
    postData.append("userId", user._id);
    postData.append("description", post);
    // postData.append("clip", clip);
    // postData.append("clipPath", clip.name);
    if (image) {
      postData.append("picture", image);
      postData.append("picturePath", image.name);
    }
    console.log(postData);
    const response = await fetch("http://localhost:8000/posts", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: postData,
    });
    console.log("response", response);
    const posts = await response.json();
    console.log("posts", posts);
    dispatch(setPosts({ posts }));
    setImage("");
    setPost("");
  };
  // console.log(clip);
  return (
    <WidgetWrapper>
      <FlexBetween gap={"1.5rem"}>
        <UserImage image={picturePath} />
        <input
          type="text"
          name=""
          value={post}
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          className={`w-full text-slate-200  rounded-[2rem] p-4 bg-[${palette.neutral.light}]`}
        />
      </FlexBetween>
      {isImage && (
        <div className={`border border-[${medium}] rounded-[5px]  mt-4 p-4`}>
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <div
                  className={`w-full hover:cursor-pointer p-4 border border-dashed border-[${palette.primary.main}]`}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p style={{ color: palette.neutral.dark }}>
                      Add Image Here
                    </p>
                  ) : (
                    <FlexBetween>
                      <h1 className="text-xs">{image.name}</h1>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </div>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    style={{ width: "15%" }}
                  >
                    <DeleteOutline />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </div>
      )}
      <hr className="my-5 mx-0" />
      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined style={{ color: mediumMain, cursor: "pointer" }} />
          <h2
            style={{
              color: mediumMain,
              cursor: "pointer",
            }}
          >
            Image
          </h2>
        </FlexBetween>
        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem" style={{ cursor: "pointer" }}>
              <GifBoxOutlined style={{ color: mediumMain }} />
              <h1 className="text-xs" style={{ color: mediumMain }}>
                Clip
              </h1>
            </FlexBetween>
            {/* {Isclip && <WebCam setIsclip={setIsclip} setclip={setclip} />} */}
            <FlexBetween gap="0.25rem">
              <AttachFileOutlined style={{ color: mediumMain }} />
              <h1 className="text-xs" style={{ color: mediumMain }}>
                Attachment
              </h1>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <MicOutlined style={{ color: mediumMain }} />
              <h1 className="text-xs" style={{ color: mediumMain }}>
                Audio
              </h1>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined style={{ color: mediumMain }} />
          </FlexBetween>
        )}

        <ButtonBase
          onClick={handlePost}
          style={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
            padding: "0.25rem 0.5rem",
          }}
        >
          POST
        </ButtonBase>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidgets;
