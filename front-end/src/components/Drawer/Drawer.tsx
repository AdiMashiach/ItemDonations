import {
  Box,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer as MuiDrawer,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";
import { RHF } from "../../utilities/RHFTypes";
import "./Drawer.scss";
import DrawerButton from "./DrawerButton";
import { Search } from "@mui/icons-material";

type DrawerProps<T extends FieldValues> = {
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: UseFormSetValue<T>;
  drawerItems: string[];
  placeholder: string;
  disabled?: boolean;
  title?: string;
  searchbar?: boolean;
} & RHF<T>;

const Drawer = <T extends FieldValues>({
  isDrawerOpen,
  setIsDrawerOpen,
  setValue,
  control,
  name,
  disabled,
  drawerItems,
  placeholder,
  title,
  searchbar,
}: DrawerProps<T>) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleOnDrawerClose = (drawerItem: PathValue<T, Path<T>>) => {
    if (typeof drawerItem === "string") {
      setValue(name, drawerItem);
    }

    setIsDrawerOpen(false);
  };

  const filteredItems = drawerItems.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <DrawerButton
        control={control}
        name={name}
        placeholder={placeholder}
        isDrawerOpen={isDrawerOpen}
        disabled={disabled}
        setIsDrawerOpen={setIsDrawerOpen}
      />
      <MuiDrawer
        className="drawer"
        open={isDrawerOpen}
        onClose={handleOnDrawerClose}
        anchor="bottom"
        PaperProps={{
          sx: {
            borderRadius: '1rem'
          }
        }}
      >
        <Box className="drawer-header">
          {title && (
            <Typography className="drawer-header__title">{title}</Typography>
          )}
          {searchbar && (
            <Box className="drawer-header__search-bar">
              <TextField
                fullWidth
                placeholder={title}
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="drawer-header__search-bar--input"
                InputProps={{
                  sx: {
                    borderRadius: "1.2rem",
                    paddingRight: "1rem",
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          )}
        </Box>
        <List className="drawer-list">
          {filteredItems.map((drawerItem) => (
            <ListItem
              className="drawer-list__item"
              key={drawerItem}
              disablePadding
              onClick={() =>
                handleOnDrawerClose(drawerItem as PathValue<T, Path<T>>)
              }
            >
              <ListItemButton className="drawer-list__item--button">
                <ListItemText
                  className="drawer-list__item--text"
                  primary={drawerItem}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </MuiDrawer>
    </>
  );
};

export default Drawer;
