import { Box, Typography } from "@mui/material";
import { PropsWithChildren } from "react";
import "./TitledComponent.scss";

type TitledComponentProps = {
  title: string;
  required?: boolean;
} & PropsWithChildren;

const TitledComponent = ({
  title,
  required,
  children,
}: TitledComponentProps) => {
  return (
    <Box className="titled-component">
      <Box className="titled-component__title">
        <Typography className="titled-component__title--text">
          {title}
        </Typography>
        <Typography className="titled-component__title--required">
          {required ? "*" : ""}
        </Typography>
      </Box>
      <Box className="titled-component__content">{children}</Box>
    </Box>
  );
};

export default TitledComponent;
