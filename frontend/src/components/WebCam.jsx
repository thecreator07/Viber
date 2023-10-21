import { Box, Button, Modal, Typography } from "@material-ui/core";
import React from "react";
import Webcam from "react-webcam";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "environment",
};

const WebCam = ({ setIsclip, setclip }) => {
  const webcamref = React.useRef(null);
  const [base64, setbase64] = React.useState(null);
  const campurePhoto = React.useCallback(async () => {
    const imagesrc = webcamref.current.getScreenshot();
    // console.log(imagesrc)
    setbase64(imagesrc);
    // setclip(imagesrc);
    // console.log(url);
    const binaryData = atob(base64);

    // Create a TypedArray from the binary data
    const arrayBuffer = new ArrayBuffer(binaryData.length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < binaryData.length; i++) {
      view[i] = binaryData.charCodeAt(i);
    }

    // Create a Blob from the binary data
    const blob = new Blob([view], { type: "image/jpeg" }); // Adjust the type as needed

    // Create a URL for the Blob
    const imageUrl = URL.createObjectURL(blob);

    // Set the image source
    // setImageSrc(imageUrl);
    setclip(imageUrl);
    console.log(imageUrl);
  }, [webcamref]);

  const onUserMedia = (e) => {
    console.log(e);
  };
  return (
    <>
      <div className="fixed w-96 h-96 bg-black opacity-90 top-[35%] left-[38%]   flex flex-col bg-slate-900 z-50 ">
        <div className="bg-slate-500 w-full">
          <Webcam
            ref={webcamref}
            // audio={true}
            screenshotFormat="image/png"
            videoConstraints={videoConstraints}
            onUserMedia={onUserMedia}
            mirrored={true}
          />
          <button onClick={campurePhoto} className="cursor-pointer">
            Capture
          </button>
          <button onClick={() => setclip(null)}>Refresh</button>
          {base64 && <img src={base64} alt="" style={{ width: "50%" }} />}
          <button onClick={() => setIsclip(false)}></button>
        </div>

        <div onClick={() => setIsclip(false)} className="text-white">
          close
        </div>
      </div>
    </>
  );
};

export default WebCam;
