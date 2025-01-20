import { Delete, Done, Edit } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { QueryClient, UseMutateFunction, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { Namespaces } from "../../../i18n/i18n.constants";
import { Routes } from "../../../router";
import { Item } from "../../../types";
import "./ItemOverviewButtons.scss";
import { IEmail, sendEmail } from "../../../api/sendGridService";
import { updateItem } from "../../../api/itemService";
import { ItemStatus } from "../../../enums";

type ItemOverviewButtonsProps = {
  item: Item;
  setIsDeleteDrawerOpen: Dispatch<SetStateAction<boolean>>;
  deleteItemMutation: UseMutateFunction<AxiosResponse<any, any>, unknown, Item, unknown>;
};

const ItemOverviewButtons = ({
  item,
  setIsDeleteDrawerOpen,
  deleteItemMutation
}: ItemOverviewButtonsProps) => {
  const translations = {
    tAction: useTranslation(Namespaces.action).t,
    tTitle: useTranslation(Namespaces.title).t,
    tEmail: useTranslation(Namespaces.email).t,
  };

  const navigate = useNavigate();
  const queryClient = new QueryClient();

  const mutations = {
    sendEmailMutation: useMutation(sendEmail).mutate,
    updateItem: useMutation(updateItem, {
      onSuccess: () => {
        queryClient.invalidateQueries(["getItems"]);
      },
    }).mutate
  }
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
      mutations.updateItem({
        ...item,
        itemStatus: ItemStatus.DONATED
      });
      mutations.sendEmailMutation({
        message: translations.tEmail('continueDonatingAndDoingGood'),
        reciever: item.publisherMail,
        subject: translations.tEmail('goodForTheDonation'),
      } as IEmail)
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
