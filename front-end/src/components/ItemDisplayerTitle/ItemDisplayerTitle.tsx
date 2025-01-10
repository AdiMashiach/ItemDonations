import { ChevronRight } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./ItemDisplayerTitle.scss";

type ItemDisplayerTitleProps = {
  title: string;
};

const ItemDisplayerTitle = ({ title }: ItemDisplayerTitleProps) => {
  const navigate = useNavigate();

  const onReturnClick = () => {
    navigate(-1);
  };

  return (
    <Box className="item-displayer-title">
      <IconButton
        className="item-displayer-title__back-button"
        onClick={onReturnClick}
      >
        <ChevronRight className="item-dispalyer-title__back-button--icon" />
      </IconButton>
      <Typography className="item-displayer-title__text">{title}</Typography>
    </Box>
  );
};

export default ItemDisplayerTitle;
