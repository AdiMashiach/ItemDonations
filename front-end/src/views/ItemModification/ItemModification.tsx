import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useCities } from "../../api/citiesService";
import { addItem, modifyItem } from "../../api/itemService";
import { loggedUser } from "../../atom/atom";
import Drawer from "../../components/Drawer/Drawer";
import ItemDisplayerTitle from "../../components/ItemDisplayerTitle/ItemDisplayerTitle";
import PhotoUploader from "../../components/PhotoUploader/PhotoUploader";
import TextField from "../../components/TextField/TextField";
import TitledComponent from "../../components/TitledComponent/TitledComponent";
import items, { Item } from "../../Data/items";
import { ItemStatus } from "../../enums";
import { Namespaces } from "../../i18n/i18n.constants";
import itemDetailsSchema, {
  ItemDetailsSchema,
} from "../../RHFSchemas/ItemDetailsSchema";
import { Routes } from "../../router";
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

  const currentUser = useRecoilValue(loggedUser);

  const { control, handleSubmit, setValue, watch } = useForm<ItemDetailsSchema>(
    {
      resolver: zodResolver(itemDetailsSchema),
      defaultValues: {
        itemDescription: item?.description ?? "",
        itemImage: item?.image ?? "",
        itemLocation: item?.location ?? "",
        itemName: item?.name ?? "",
      },
    }
  );

  const handleSave = (data: { image: string }) => {
    setValue("itemImage", data.image);
  };

  const getNextItemID = () => {
    const sortedArray = items.sort((itemA, itemB) =>
      itemB.id.localeCompare(itemA.id)
    );

    return (+sortedArray[0].id + 1).toString();
  };

  const onSaveButton = handleSubmit(() => {
    const modifiedItem: Item = {
      id: getNextItemID(),
      description: watch().itemDescription,
      image: watch().itemImage,
      name: watch().itemName,
      location: watch().itemLocation,
      itemStatus: ItemStatus.MY_ITEM,
      publisherMail: currentUser.email,
      timePublished: new Date(),
    };
    if (isNew) {
      addItem(modifiedItem);
      navigate(Routes.SUCCESS, {
        state: {
          headerText: translations.tTitle("itemPublished"),
          subHeaderText: translations.tTitle("funToHavePeopleLikeYou"),
        },
      });
    } else {
      modifyItem(item ?? ({} as Item), modifiedItem);

      navigate(Routes.ITEM_OVERVIEW, {
        state: { item: modifiedItem },
      });
    }
  });

  const { data: cities } = useCities();

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
          <Drawer
            drawerItems={cities?.map((city) => city.name) ?? []}
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
