import axios from "axios";
import { User } from "../types";
import { useQuery } from "react-query";

export const getUser = async (user: User) => {
  const { data: fetchedUser } = await axios.post(
    `http://localhost:3000/users/login`,
    { email: user.email, password: user.password }
  );

  return fetchedUser;
};

export const postUser = async (user: User) => {
  const { data: postedUser } = await axios.post(
    `http://localhost:3000/users/register`,
    user
  );

  return postedUser;
};

export const useGetUserPhoneNumber = (email: string) => {
  const getUserPhoneNumber = async () => {
    const { data: phoneNumber } = await axios.get<string>(
      `http://localhost:3000/users/phoneNumber?email=${email}`
    )

    return phoneNumber
  }

  return useQuery({
    queryKey: ['getUserPhoneNumber', email],
    queryFn: getUserPhoneNumber
  })
}