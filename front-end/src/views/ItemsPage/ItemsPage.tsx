import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { clone } from "remeda";
import { useItems } from "../../api/itemService";
import { loggedUser, userLocation as UserLocationAtom } from "../../atom/atom";
import { API_KEY } from "../../contants";
import { Item } from "../../Data/items";
import { ItemCategoery, ItemClause, ItemStatus } from "../../enums";
import useGeolocationCity from "../../hooks/useGeolocationCity";
import ItemPageContent from "./ItemPageContent/ItemsPageContent";
import "./ItemsPage.scss";
import ItemsPageFooter from "./ItemsPageFooter/ItemsPageFooter";
import ItemsPageHeader from "./ItemsPageHeader/ItemsPageHeader";
import { FooterAction } from "./ItemsPageFooter/BottomNavigationActions.utilities";
import bottomNavigationActions from "./ItemsPageFooter/BottomNavigationActions.utilities";

const ItemsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<FooterAction>(
    bottomNavigationActions[0]
  );
  const [selectedClause, setSelectedClause] = useState<ItemClause>(
    ItemClause.NEAR_ME
  );
  const [displayedItems, setDisplayedItems] = useState<Item[]>([]);
  const [itemsSearchValue, setItemsSearchValue] = useState("");

  const { data: items, isSuccess: isItemsSuccess } = useItems();

  const currentUser = useRecoilValue(loggedUser);

  const setUserLocation = useSetRecoilState(UserLocationAtom);
  const userLocation = useGeolocationCity(API_KEY).city ?? "";
  setUserLocation(userLocation);

  useEffect(() => {
    if (isItemsSuccess) setDisplayedItems(items);
  }, [items, isItemsSuccess]);

  useEffect(() => {
    let filteredItems = clone(items);

    if (selectedCategory.value === ItemCategoery.MY_ITEMS) {
      filteredItems = filteredItems?.filter(
        (filteredItem) =>
          filteredItem.publisherMail === currentUser.email &&
          filteredItem.itemStatus === ItemStatus.MY_ITEM
      );
    } else if (selectedCategory.value === ItemCategoery.HOME) {
      filteredItems = filteredItems?.filter(
        (filteredItem) => filteredItem.itemStatus === ItemStatus.TO_DONATE
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
        (filteredItem) => filteredItem.location === userLocation
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
    currentUser,
    userLocation,
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
