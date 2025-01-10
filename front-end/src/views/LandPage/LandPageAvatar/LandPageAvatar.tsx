import { Box } from "@mui/material";
import avatar from "../../../images/image.png";
import "./LandPageAvatar.scss";

const LandPageAvatar = () => {
  return (
    <Box className="avatar">
      <Box className="avatar__image" component="img" src={avatar} />
    </Box>
  );
};

export default LandPageAvatar;
