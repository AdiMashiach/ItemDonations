import React, { useState, ChangeEvent, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import "./PhotoUploader.scss";
import { Cancel } from "@mui/icons-material";

interface PhotoUploaderProps {
  onSave: (data: { image: string }) => void;
  disabled?: boolean;
  image?: string | null;
}

const PhotoUploader = ({
  onSave,
  disabled,
  image = "",
}: PhotoUploaderProps) => {
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    setPhoto(image);
  }, [image]);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setPhoto(imageData);
        onSave({ image: imageData });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box className="photo-uploader">
      {!photo ? (
        <>
          <label className="photo-uploader__upload-button">
            <IconButton
              component="span"
              disabled={disabled}
              className="photo-uploader__icon-button"
            >
              <AddPhotoAlternateIcon className="photo-uploader__icon" />
            </IconButton>
            <input
              disabled={disabled}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="photo-uploader__input"
            />
          </label>
          <Typography variant="body2" className="photo-uploader__helper-text">
            תמונה ברורה תעזור לנו למסור את הפריט :)
          </Typography>
        </>
      ) : (
        <Box className="photo-uploader__image-container">
          <img
            src={photo}
            alt="Uploaded Preview"
            className="photo-uploader__image"
          />
          {!disabled && (
            <IconButton
              onClick={() => setPhoto(null)}
              className="photo-uploader__delete-button"
            >
              <Cancel />
            </IconButton>
          )}
        </Box>
      )}
    </Box>
  );
};

export default PhotoUploader;
