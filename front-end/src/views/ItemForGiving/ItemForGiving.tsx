import { Box, Typography } from "@mui/material";
import ItemDisplayerTitle from "../../components/ItemDisplayerTitle/ItemDisplayerTitle";
import ItemForGivingButtons from "./ItemForGivingButtons/ItemForGivingButtons";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Namespaces } from "../../i18n/i18n.constants";
import "./ItemForGiving.scss";
import ShareWhatsApp from "../../components/ShareWhatsapp/ShareWhatsapp";
import { Item } from "../../types";

type ItemForGivingProps = {
  item: Item;
};

const ItemForGiving = () => {
  const translations = {
    tField: useTranslation(Namespaces.field).t,
    tMessage: useTranslation(Namespaces.message).t
  }

  const location = useLocation();
  const { item } = location.state as ItemForGivingProps;

  return (
    <>
      <ItemDisplayerTitle title={item?.name ?? ""} />
      <Box className="item-overview">
        <Box className="item-overview__buttons">
          <ItemForGivingButtons item={item ?? ({} as Item)} />
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
      <ShareWhatsApp intro={translations.tMessage('askingForItem')} item={item} />
    </>
  );
};

export default ItemForGiving;
