import axios from "axios";
import { useQuery } from "react-query";
import { City } from "../types";

export const useFetchCities = () => {
  const getCities = async () => {
    const { data: cities } = await axios.get(`http://localhost:3000/cities`);

    return cities;
  };

  return useQuery<City[]>({
    queryKey: ["getCities"],
    queryFn: getCities,
  });
};
