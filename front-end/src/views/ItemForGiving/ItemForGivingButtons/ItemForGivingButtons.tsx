import { LocalShipping, Send } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Namespaces } from "../../../i18n/i18n.constants";
import { Routes } from "../../../router";
import "./ItemForGivingButtons.scss";
import { Item } from "../../../types";
import { handleShare } from "../../../hooks/useShare";

type ItemOverviewButtonsProps = {
  item: Item;
};

const ItemForGivingButtons = ({ item }: ItemOverviewButtonsProps) => {
  const translations = {
    tAction: useTranslation(Namespaces.action).t,
    tTitle: useTranslation(Namespaces.title).t
  };

  const navigate = useNavigate();

  const onClickAction = {
    searchShipment: () => {
      navigate(Routes.ITEM_SHIPMENT, {
        state: { item: item },
      });
    },

    share: () => {
      handleShare({
        title: 'translations.tTitle("shareItem")',
        url: window.location.href,
      });
    },
  };

  return (
    <>
      <IconButton className="button" onClick={onClickAction.searchShipment}>
        <LocalShipping className="button__icon" />
        <Typography className="button__text">
          {translations.tAction("searchShipment")}
        </Typography>
      </IconButton>
      <IconButton className="button" onClick={onClickAction.share}>
        <Send className="button__icon" />
        <Typography className="button__text">
          {translations.tAction("share")}
        </Typography>
      </IconButton>
    </>
  );
};

export default ItemForGivingButtons;
