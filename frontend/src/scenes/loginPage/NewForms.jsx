import { TextField, useMediaQuery, Typography, Box } from "@material-ui/core";
import FlexBetween from "../../components/FlexBetween";
import React from "react";
import Dropzone from "react-dropzone";

const NewForms = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <>
      <form onSubmit={""}>
        <Box className="flex w-full flex-col gap-8 ">
          <FlexBetween
            gap={"30px"}
            style={{ flexDirection: isNonMobile ? "row" : "column" }}
          >
            <TextField
              label="FirstName"
              name="firstName"
              style={{ width: "100%" }}
            />
            <TextField
              label="LastName"
              name="lastName"
              style={{ width: "100%" }}
            />
          </FlexBetween>
          <TextField
            label="Location"
            name="location"
            style={{ width: "100%" }}
          />
          <TextField
            label="Occupation"
            name="occupation"
            style={{ width: "100%" }}
          />

          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) =>
              setFieldValue("picture", acceptedFiles[0])
            }
          >
            {({ getRootProps, getInputProps }) => (
              <Box
                {...getRootProps()}
                style={{
                  border: "2px",
                  padding: "1rem",
                  borderBlockStyle: "dashed",
                  borderBlockEndStyle: "dashed",
                  cursor: "pointer",
                }}
              >
                <input {...getInputProps()} />
                {/* {!values.picture ? (
                  <p>Add Picture Here</p>
                ) : (
                  <FlexBetween>
                    <Typography>{values.picture.name}</Typography>
                    <EditOutlined />
                  </FlexBetween>
                )} */}
              </Box>
            )}
          </Dropzone>
        </Box>
      </form>
    </>
  );
};

export default NewForms;
