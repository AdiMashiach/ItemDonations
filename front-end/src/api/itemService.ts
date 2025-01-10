import items, { Item } from "../Data/items";
import { useQuery } from "react-query";

export const useItems = () => {
  const getItems = async () => {
    const fetchItems = await items;

    return fetchItems;
  };

  return useQuery({
    queryKey: ["getItems"],
    queryFn: getItems,
  });
};

export const addItem = (item: Item) => {
  items.push(item);
};

export const modifyItem = (itemToModify: Item, modifiedItem: Item) => {
  const itemIndex = items.findIndex((item) => item.id === itemToModify.id);

  if (itemIndex !== -1) items[itemIndex] = { ...modifiedItem };
};

export const deleteItem = (itemToDelete: Item) => {
  items.filter((item) => item.id !== itemToDelete.id);
};
