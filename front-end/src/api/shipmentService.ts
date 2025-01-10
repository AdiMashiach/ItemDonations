import { useQuery } from "react-query";
import { Shipment, shipments } from "../Data/shipments";

export const useShipment = (itemID: string) => {
  const getShipment = async () => {
    return shipments.find((shipment) => shipment.itemId === itemID);
  };

  return useQuery({
    queryKey: ["getShipment", itemID],
    queryFn: getShipment,
  });
};

export const createShipment = (shipment: Shipment) => {
  shipments.push(shipment);
};
