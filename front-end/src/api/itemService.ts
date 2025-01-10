import axios from "axios";
import { Item } from "../types";
import { useQuery } from "react-query";

export const useFetchedItems = () => {
  const getItems = async () => {
    const { data: myItems } = await axios.get(`localhost:3000/items`);

    return myItems;
  };

  return useQuery<Item[]>({
    queryKey: ["getItems"],
    queryFn: getItems,
  });
};

export const postItem = async (item: Item) => {
  const { data: postedItem } = await axios.post(`localhost:3000/items`, item);

  return postedItem;
};

export const updateItem = async (item: Item) => {
  const { data: modifiedItem } = await axios.put(
    `localhost:3000/items/${item.id}`,
    item
  );

  return modifiedItem;
};

export const deleteItem = async (item: Item) => {
  const deleteResponse = await axios.delete(`localhost:3000/items/${item.id}`);

  return deleteResponse;
};
