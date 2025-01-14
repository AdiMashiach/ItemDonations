import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { updateItem } from "../../api/itemService";
import { postShipment, useFetchShipment } from "../../api/shipmentService";
import { cities as citiesAtom } from "../../atom/atom";
import CitiesDrawer from "../../components/CititesDrawer/CitiesDrawer";
import ItemDisplayerTitle from "../../components/ItemDisplayerTitle/ItemDisplayerTitle";
import ShareWhatsApp from "../../components/ShareWhatsapp/ShareWhatsapp";
import TextField from "../../components/TextField/TextField";
import TitledComponent from "../../components/TitledComponent/TitledComponent";
import { ItemStatus } from "../../enums";
import { Namespaces } from "../../i18n/i18n.constants";
import shipmentDetailsSchema, {
  ShipmentDetailsSchema,
} from "../../RHFSchemas/ShipmentDetailsSchema";
import { Routes } from "../../router";
import { Item } from "../../types";
import "./ItemShipment.scss";

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

  const { data: currentShipment, isSuccess: isShipmentSuccess } = useFetchShipment(item);

  const queryClient = useQueryClient();

  const cities = useRecoilValue(citiesAtom);
  const navigate = useNavigate();

  const { control, handleSubmit, setValue, watch } =
    useForm<ShipmentDetailsSchema>({
      resolver: zodResolver(shipmentDetailsSchema),
      defaultValues: {
        loadingCity: currentShipment?.cityId,
        loadingAddress: currentShipment?.address,
        addressDetails: currentShipment?.addressDetails,
      },
    });

  const mutations = {
    postShipment: useMutation(postShipment, {
      onSuccess: () => {
        queryClient.invalidateQueries(["getItems"]);
      },
    }).mutate,
    updateItem: useMutation(updateItem, {
      onSuccess: () => {
        queryClient.invalidateQueries(["getItems"]);
      },
    }).mutate,
  };

  const onPublishShipmentRequestClick = handleSubmit(() => {
    mutations.postShipment({
      address: watch().loadingAddress ?? "",
      addressDetails: watch().addressDetails ?? "",
      itemId: item.id ?? 0,
      cityId: watch().loadingCity,
    });

    mutations.updateItem({
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

  useEffect(() => { }, [currentShipment, isShipmentSuccess])

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
            <CitiesDrawer
              drawerItems={cities ?? []}
              isDrawerOpen={isCityDrawerOpen}
              setIsDrawerOpen={setIsCityDrawerOpen}
              control={control}
              setValue={setValue}
              name={"loadingCity"}
              placeholder={translations.tPlaceholder("cityToPickFrom")}
              title={translations.tTitle("pickUPCity")}
              searchbar
              disabled={!isEmpty(currentShipment)}
            />
          </TitledComponent>
          <TitledComponent title={translations.tField("address")}>
            <TextField
              control={control}
              name={"loadingAddress"}
              sx={{ width: "90vw" }}
              placeholder={translations.tPlaceholder("notNecessaryButHelpful")}
              disabled={!isEmpty(currentShipment)}
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
              disabled={!isEmpty(currentShipment)}
              multilineRows={5}
            />
          </TitledComponent>
        </Box>
        {isEmpty(currentShipment) ? (
          <Button
            className="shipment__button"
            onClick={onPublishShipmentRequestClick}
          >
            {translations.tAction("publishShipment")}
          </Button>
        ) : (
          <ShareWhatsApp />
        )}
      </Box>
    </>
  );
};

export default ItemShipment;
