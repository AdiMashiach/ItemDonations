import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { postItem, updateItem } from "../../api/itemService";
import { cities as citiesAtom, loggedUser } from "../../atom/atom";
import CitiesDrawer from "../../components/CititesDrawer/CitiesDrawer";
import ItemDisplayerTitle from "../../components/ItemDisplayerTitle/ItemDisplayerTitle";
import PhotoUploader from "../../components/PhotoUploader/PhotoUploader";
import TextField from "../../components/TextField/TextField";
import TitledComponent from "../../components/TitledComponent/TitledComponent";
import { ItemStatus } from "../../enums";
import { Namespaces } from "../../i18n/i18n.constants";
import itemDetailsSchema, {
  ItemDetailsSchema,
} from "../../RHFSchemas/ItemDetailsSchema";
import { Routes } from "../../router";
import { Item } from "../../types";
import "./ItemModification.scss";

type ItemModificationProps = {
  isNew?: boolean;
  item?: Item;
};

const ItemModification = () => {
  const translations = {
    tAction: useTranslation(Namespaces.action).t,
    tTitle: useTranslation(Namespaces.title).t,
    tField: useTranslation(Namespaces.field).t,
    tPlaceholder: useTranslation(Namespaces.placeholder).t,
  };

  const [isCityDrawerOpen, setIsCityDrawerOpen] = useState(false);

  const location = useLocation();
  const { isNew, item } = (location.state ?? {}) as ItemModificationProps;

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const currentUser = useRecoilValue(loggedUser);
  const cities = useRecoilValue(citiesAtom);
  const { control, handleSubmit, setValue, watch } = useForm<ItemDetailsSchema>(
    {
      resolver: zodResolver(itemDetailsSchema),
      defaultValues: {
        itemDescription: item?.description ?? "",
        itemImage: item?.image ?? "",
        itemLocation: item?.cityId,
        itemName: item?.name ?? "",
      },
    }
  );

  const handleSave = (data: { image: string }) => {
    setValue("itemImage", data.image);
  };

  const mutations = {
    postItem: useMutation(postItem, {
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

  const onSaveButton = handleSubmit(() => {
    const modifiedItem: Item = {
      description: watch().itemDescription,
      image: watch().itemImage,
      name: watch().itemName,
      cityId: watch().itemLocation,
      itemStatus: ItemStatus.TO_DONATE,
      publisherMail: currentUser.email,
    };
    if (isNew) {
      mutations.postItem(modifiedItem);
      navigate(Routes.SUCCESS, {
        state: {
          headerText: translations.tTitle("itemPublished"),
          subHeaderText: translations.tTitle("funToHavePeopleLikeYou"),
        },
      });
    } else {
      mutations.updateItem({ ...modifiedItem, id: item?.id });
      navigate(Routes.ITEMS);
    }
  });

  return (
    <Box className="item-details">
      <ItemDisplayerTitle
        title={
          !isNew ? item?.name ?? "" : translations.tTitle("publishNewItem")
        }
      />
      <Box className="item-details__content">
        <TitledComponent
          title={translations.tField("itemName")}
          required={true}
        >
          <TextField
            control={control}
            name={"itemName"}
            sx={{ width: "90vw" }}
            placeholder={translations.tPlaceholder("enterShortName")}
          />
        </TitledComponent>
        <TitledComponent
          title={translations.tField("itemDescription")}
          required={true}
        >
          <TextField
            control={control}
            name={"itemDescription"}
            sx={{ width: "90vw" }}
            multiline={true}
          />
        </TitledComponent>
        <TitledComponent
          title={translations.tField("itemLocation")}
          required={true}
        >
          <CitiesDrawer<ItemDetailsSchema>
            drawerItems={cities}
            isDrawerOpen={isCityDrawerOpen}
            setIsDrawerOpen={setIsCityDrawerOpen}
            control={control}
            setValue={setValue}
            name={"itemLocation"}
            placeholder={translations.tPlaceholder("cityToPickFrom")}
            title={translations.tTitle("pickUPCity")}
            searchbar
          />
        </TitledComponent>
        <TitledComponent
          title={translations.tField("photoUplaoder")}
          required={true}
        >
          <PhotoUploader onSave={handleSave} image={item?.image} />
        </TitledComponent>
      </Box>
      <Button
        className="item-details__content--save-button"
        onClick={onSaveButton}
      >
        {isNew
          ? translations.tAction("publishItem")
          : translations.tAction("saveChanges")}
      </Button>
    </Box>
  );
};

export default ItemModification;
