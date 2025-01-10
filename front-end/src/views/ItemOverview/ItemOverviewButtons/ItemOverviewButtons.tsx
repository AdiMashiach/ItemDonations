import { Delete, Done, Edit } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { deleteItem } from "../../../api/itemService";
import { Namespaces } from "../../../i18n/i18n.constants";
import { Routes } from "../../../router";
import "./ItemOverviewButtons.scss";
import { Item } from "../../../types";
import { useMutation, useQueryClient } from "react-query";

type ItemOverviewButtonsProps = {
  item: Item;
  setIsDeleteDrawerOpen: Dispatch<SetStateAction<boolean>>;
};

const ItemOverviewButtons = ({
  item,
  setIsDeleteDrawerOpen,
}: ItemOverviewButtonsProps) => {
  const translations = {
    tAction: useTranslation(Namespaces.action).t,
    tTitle: useTranslation(Namespaces.title).t,
  };

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteItemMutation = useMutation(deleteItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(["getItems"]);
    },
  }).mutate;

  const onClickAction = {
    edit: () => {
      navigate(Routes.ITEM_MODIFICATION, {
        state: { item: item, isNew: false },
      });
    },
    delete: () => {
      setIsDeleteDrawerOpen(true);
    },
    reportGiven: () => {
      deleteItemMutation(item);

      navigate(Routes.SUCCESS, {
        state: {
          headerText: translations.tTitle("itemPublished"),
          subHeaderText: translations.tTitle("funToHavePeopleLikeYou"),
        },
      });
    },
  };

  return (
    <>
      <IconButton className="button" onClick={onClickAction.edit}>
        <Edit className="button__icon" />
        <Typography className="button__text">
          {translations.tAction("edit")}
        </Typography>
      </IconButton>
      <IconButton className="button" onClick={onClickAction.delete}>
        <Delete className="button__icon" />
        <Typography className="button__text">
          {translations.tAction("delete")}
        </Typography>
      </IconButton>
      <IconButton className="button" onClick={onClickAction.reportGiven}>
        <Done className="button__icon" />
        <Typography className="button__text">
          {translations.tAction("reportGiven")}
        </Typography>
      </IconButton>
    </>
  );
};

export default ItemOverviewButtons;
