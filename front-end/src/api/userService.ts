import axios from "axios";
import { User } from "../types";

export const getUser = async (user: User) => {
  const { data: fetchedUser } = await axios.get(
    `localhost:3000/users?email=${user.email}`
  );

  return fetchedUser;
};

export const postUser = async (user: User) => {
  const { data: postedUser } = await axios.post(`localhost:3000/users`, user);

  return postedUser;
};
