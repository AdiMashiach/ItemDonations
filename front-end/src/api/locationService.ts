import axios from "axios";
import { useQuery } from "react-query";

export const useLocation = () => {
    const getLocation = async () => {
        const { data: response } = await axios.get(`http://localhost:3000/api/location`)
        
        return response
    }

    return useQuery({
        queryKey: ['getLocation'],
        queryFn: getLocation
    })
}