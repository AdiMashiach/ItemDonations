import axios from "axios";
import { Item } from "../types";
import { useQuery } from "react-query";

export const useFetchedItems = () => {
  const getItems = async () => {
    const { data: myItems } = await axios.get(`http://localhost:3000/items`);

    return myItems;
  };

  return useQuery<Item[]>({
    queryKey: ["getItems"],
    queryFn: getItems,
  });
};

export const postItem = async (item: Item) => {
  const { data: postedItem } = await axios.post(`http://localhost:3000/items`, item);

  return postedItem;
};

export const updateItem = async (item: Item) => {
  const { data: modifiedItem } = await axios.put(
    `http://localhost:3000/items/${item.id}`,
    item
  );

  return modifiedItem;
};

export const deleteItem = async (item: Item) => {
  const deleteResponse = await axios.delete(`http://localhost:3000/items/${item.id}`);

  return deleteResponse;
};
