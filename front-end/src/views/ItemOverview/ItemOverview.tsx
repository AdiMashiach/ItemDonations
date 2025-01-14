import { Box, Button, Drawer, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteItem } from "../../api/itemService";
import ItemDisplayerTitle from "../../components/ItemDisplayerTitle/ItemDisplayerTitle";
import { Namespaces } from "../../i18n/i18n.constants";
import { Routes } from "../../router";
import { Item } from "../../types";
import "./ItemOverview.scss";
import ItemOverviewButtons from "./ItemOverviewButtons/ItemOverviewButtons";

type ItemOverviewProps = {
  item?: Item;
};

const ItemOverview = () => {
  const translations = {
    tField: useTranslation(Namespaces.field).t,
    tAction: useTranslation(Namespaces.action).t,
    tTitle: useTranslation(Namespaces.title).t,
  };
  const [isDeleteDrawerOpen, setIsDeleteDrawerOpen] = useState(false);

  const handleOnDrawerClose = () => {
    setIsDeleteDrawerOpen(false);
  };

  const navigate = useNavigate()
  const location = useLocation();
  const { item } = location.state as ItemOverviewProps;
  const queryClient = useQueryClient();

  const deleteItemMutation = useMutation(deleteItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(["getItems"]);
      navigate(Routes.ITEMS)
    },
  }).mutate;

  return (
    <>
      <ItemDisplayerTitle title={item?.name ?? ""} />
      <Box className="item-overview">
        <Box className="item-overview__buttons">
          <ItemOverviewButtons
            item={item ?? ({} as Item)}
            setIsDeleteDrawerOpen={setIsDeleteDrawerOpen}
            deleteItemMutation={deleteItemMutation}
          />
        </Box>
        <img
          src={item?.image}
          alt="Uploaded Preview"
          className="item-overview__image"
        />
        <Typography className="item-overview__pickup-point">{`${translations.tField(
          "pickUpFrom"
        )}${item?.cityId}`}</Typography>
        <Typography className="item-overview__description">
          {item?.description}
        </Typography>
      </Box>
      <Drawer
        className="drawer"
        open={isDeleteDrawerOpen}
        onClose={handleOnDrawerClose}
        anchor="bottom"
        PaperProps={{
          sx: {
            borderRadius: "1rem",
          },
        }}
      >
        <Typography className="drawer__title">
          {translations.tTitle("deleteItem")}
        </Typography>
        <Box className="drawer__buttons">
          <Button className="drawer__buttons--cancel" onClick={handleOnDrawerClose}>
            {translations.tAction("cancel")}
          </Button>
          <Button className="drawer__buttons--delete" onClick={() => deleteItemMutation(item ?? {} as Item)}>
            {translations.tAction("deleteItem")}
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default ItemOverview;
