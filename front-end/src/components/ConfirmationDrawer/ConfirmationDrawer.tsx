import { Box, Drawer as MuiDrawer, Typography } from "@mui/material";
import { ReactNode } from "react";

type DrawerProps = {
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  drawerContent: ReactNode;
  drawerButtons: ReactNode;
};

const ConfirmationDrawer = ({
  isDrawerOpen,
  setIsDrawerOpen,
  title,
  drawerContent,
  drawerButtons,
}: DrawerProps) => {
  const handleOnDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <MuiDrawer
        className="drawer"
        open={isDrawerOpen}
        onClose={handleOnDrawerClose}
        anchor="bottom"
        PaperProps={{
          sx: {
            borderRadius: "1rem",
          },
        }}
      >
        <Box className="drawer__header">
          <Typography>{title}</Typography>
        </Box>
        <Box className="drawer__content">{drawerContent}</Box>
        <Box className="drawer__footer">{drawerButtons}</Box>
      </MuiDrawer>
    </>
  );
};

export default ConfirmationDrawer;
