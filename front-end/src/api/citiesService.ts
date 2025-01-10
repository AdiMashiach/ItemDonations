import axios from "axios";
import { useQuery } from "react-query";

export const useFetchCities = () => {
  const getCities = async () => {
    const { data: cities } = await axios.get(`localhost:3000/locations`);

    return cities;
  };

  return useQuery({
    queryKey: ["getCities"],
    queryFn: getCities,
  });
};
