import { useQuery } from "react-query";
import { cities } from "../Data/cities";

export const useCities = () => {
  const getCities = async () => {
    return cities;
  };

  return useQuery({
    queryKey: "getCities",
    queryFn: getCities,
  });
};
