import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { clone } from "remeda";
import { useFetchCities } from "../../api/citiesService";
import { useFetchedItems } from "../../api/itemService";
import {
  cities as citiesAtom,
  loggedUser,
  userLocation as userLocationAtom,
} from "../../atom/atom";
import { API_KEY } from "../../contants";
import { ItemCategoery, ItemClause, ItemStatus } from "../../enums";
import useGeolocationCity from "../../hooks/useGeolocationCity";
import { Item } from "../../types";
import ItemPageContent from "./ItemPageContent/ItemsPageContent";
import "./ItemsPage.scss";
import bottomNavigationActions, { FooterAction } from "./ItemsPageFooter/BottomNavigationActions.utilities";
import ItemsPageFooter from "./ItemsPageFooter/ItemsPageFooter";
import ItemsPageHeader from "./ItemsPageHeader/ItemsPageHeader";

const ItemsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<FooterAction>(
    bottomNavigationActions[0]
  );
  const [selectedClause, setSelectedClause] = useState<ItemClause>(
    ItemClause.NEAR_ME
  );
  const [displayedItems, setDisplayedItems] = useState<Item[]>([]);
  const [itemsSearchValue, setItemsSearchValue] = useState("");

  const { data: items, isSuccess: isItemsSuccess } = useFetchedItems();
  const { data: cities, isSuccess: isCitiesSuccess } = useFetchCities();

  const currentUser = useRecoilValue(loggedUser);
  const setAtomCities = useSetRecoilState(citiesAtom);

  const setUserLocation = useSetRecoilState(userLocationAtom);
  const userLocation = useGeolocationCity(API_KEY).city ?? "";
  setUserLocation(userLocation);

  useEffect(() => {
    if (isItemsSuccess) setDisplayedItems(items);
  }, [items, isItemsSuccess]);

  useEffect(() => {
    if (isCitiesSuccess) setAtomCities(cities);
  }, [cities, isCitiesSuccess, setAtomCities]);

  useEffect(() => {
    let filteredItems = clone(items);

    if (selectedCategory.value === ItemCategoery.MY_ITEMS) {
      filteredItems = filteredItems?.filter(
        (filteredItem) =>
          filteredItem.publisherMail === currentUser.email
      );
    } else if (selectedCategory.value === ItemCategoery.HOME) {
      filteredItems = filteredItems?.filter(
        (filteredItem) =>
          filteredItem.itemStatus === ItemStatus.TO_DONATE &&
          filteredItem.publisherMail !== currentUser.email
      );
    } else {
      filteredItems = filteredItems?.filter(
        (filteredItem) => filteredItem.itemStatus === ItemStatus.TO_SHIP
      );
    }

    if (
      selectedClause === ItemClause.NEAR_ME &&
      selectedCategory.value !== ItemCategoery.MY_ITEMS
    ) {
      filteredItems = filteredItems?.filter(
        (filteredItem) => filteredItem.cityId === userLocation
      );
    }

    setDisplayedItems(
      filteredItems?.filter((item) => item.name.includes(itemsSearchValue)) ??
      []
    );
  }, [
    selectedClause,
    selectedCategory,
    items,
    userLocation,
    currentUser,
    itemsSearchValue,
    setItemsSearchValue,
  ]);

  return (
    <Box className="items">
      <ItemsPageHeader
        selectedClause={selectedClause}
        setSelectedClause={setSelectedClause}
        selectedCategory={selectedCategory}
        setItemsSearchValue={setItemsSearchValue}
      />
      <ItemPageContent
        items={displayedItems}
        selectedCategory={selectedCategory.value}
      />
      <ItemsPageFooter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </Box>
  );
};

export default ItemsPage;
