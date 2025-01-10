import { useQuery } from "react-query";
import { Item, Shipment } from "../types";
import axios from "axios";

export const fetchShipments = async () => {
  const { data: fetchedShipments } = await axios.get(
    `localhost:3000/shipments`
  );

  return fetchedShipments;
};

export const useFetchShipment = (item: Item) => {
  const getShipment = async () => {
    const { data: fetchedShipment } = await axios.get(
      `localhost:3000/shipments?itemId=${item.id}`
    );

    return fetchedShipment;
  };

  return useQuery<Shipment>({
    queryKey: ["getShipment", item],
    queryFn: getShipment,
  });
};

export const postShipment = async (shipment: Shipment) => {
  const { data: postedShipment } = await axios.post(
    `localhost:3000/shipments`,
    shipment
  );

  return postedShipment;
};
