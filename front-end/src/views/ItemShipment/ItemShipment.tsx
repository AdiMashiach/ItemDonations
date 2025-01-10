import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { isDefined } from "remeda";
import { modifyItem } from "../../api/itemService";
import { createShipment, useShipment } from "../../api/shipmentService";
import Drawer from "../../components/Drawer/Drawer";
import ItemDisplayerTitle from "../../components/ItemDisplayerTitle/ItemDisplayerTitle";
import TextField from "../../components/TextField/TextField";
import TitledComponent from "../../components/TitledComponent/TitledComponent";
import { cities } from "../../Data/cities";
import { Item } from "../../Data/items";
import { ItemStatus } from "../../enums";
import { Namespaces } from "../../i18n/i18n.constants";
import shipmentDetailsSchema, {
  ShipmentDetailsSchema,
} from "../../RHFSchemas/ShipmentDetails";
import { Routes } from "../../router";
import "./ItemShipment.scss";
import ShareWhatsApp from "../../components/ShareWhatsapp/ShareWhatsapp";

type ItemShipmentProps = {
  item: Item;
};

const ItemShipment = () => {
  const translations = {
    tTitle: useTranslation(Namespaces.title).t,
    tField: useTranslation(Namespaces.field).t,
    tPlaceholder: useTranslation(Namespaces.placeholder).t,
    tAction: useTranslation(Namespaces.action).t,
  };

  const [isCityDrawerOpen, setIsCityDrawerOpen] = useState(false);

  const location = useLocation();
  const { item } = (location.state ?? {}) as ItemShipmentProps;
  const { data: currentShipment } = useShipment(item.id);

  const navigate = useNavigate();

  const { control, handleSubmit, setValue, watch } =
    useForm<ShipmentDetailsSchema>({
      resolver: zodResolver(shipmentDetailsSchema),
      defaultValues: {
        loadingCity: currentShipment?.loadingCity,
        loadingAddress: currentShipment?.address,
        addressDetails: currentShipment?.addressDetails,
      },
    });

  const onPublishShipmentRequestClick = handleSubmit(() => {
    createShipment({
      address: watch().loadingAddress ?? "",
      addressDetails: watch().addressDetails ?? "",
      itemId: item.id,
      loadingCity: watch().loadingCity,
    });

    modifyItem(item, {
      ...item,
      itemStatus: ItemStatus.TO_SHIP,
    });

    navigate(Routes.SUCCESS, {
      state: {
        headerText: translations.tTitle("itemPublished"),
        subHeaderText: translations.tTitle("funToHavePeopleLikeYou"),
      },
    });
  });

  return (
    <>
      <ItemDisplayerTitle title={translations.tTitle("searchShipment")} />
      <Box className="shipment">
        <Box className="shipment__item">
          <img
            src={item?.image}
            alt="Uploaded Preview"
            className="shipment__item--image"
          />
          <Typography className="shipment__item--name">{item.name}</Typography>
        </Box>
        <Box className="shipment__titles">
          <Typography className="shipment__titles--first">
            {translations.tTitle("publishShipmentRequest")}
          </Typography>
          <Typography className="shipment__titles--second">
            {translations.tTitle("oneOfTheShippersWillContactYou")}
          </Typography>
        </Box>
        <Box className="shipment__fields">
          <TitledComponent title={translations.tField("loadingDest")} required>
            <Drawer
              drawerItems={cities?.map((city) => city.name) ?? []}
              isDrawerOpen={isCityDrawerOpen}
              setIsDrawerOpen={setIsCityDrawerOpen}
              control={control}
              setValue={setValue}
              name={"loadingCity"}
              placeholder={translations.tPlaceholder("cityToPickFrom")}
              title={translations.tTitle("pickUPCity")}
              searchbar
              disabled={isDefined(currentShipment)}
            />
          </TitledComponent>
          <TitledComponent title={translations.tField("address")}>
            <TextField
              control={control}
              name={"loadingAddress"}
              sx={{ width: "90vw" }}
              placeholder={translations.tPlaceholder("notNecessaryButHelpful")}
              disabled={isDefined(currentShipment)}
              type="text"
            />
          </TitledComponent>
          <TitledComponent title={translations.tField("youMayExplain")}>
            <TextField
              control={control}
              name={"addressDetails"}
              placeholder={translations.tPlaceholder(
                "notNecessaryButSometimes"
              )}
              type="text"
              multiline
              sx={{ width: "90vw" }}
              disabled={isDefined(currentShipment)}
              multilineRows={5}
            />
          </TitledComponent>
        </Box>
        {!isDefined(currentShipment) ? (
          <Button
            className="shipment__button"
            onClick={onPublishShipmentRequestClick}
          >
            {translations.tAction("publishShipment")}
          </Button>
        ) : (
          <ShareWhatsApp itemOwner={item.publisherMail} />
        )}
      </Box>
    </>
  );
};

export default ItemShipment;
