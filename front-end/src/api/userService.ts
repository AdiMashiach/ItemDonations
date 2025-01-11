import axios from "axios";
import { User } from "../types";

export const getUser = async (user: User) => {
  console.log('get');
  
  const { data: fetchedUser } = await axios.get(
    `http://localhost:3000/users?email=${user.email}`
  );

  return fetchedUser;
};

export const postUser = async (user: User) => {
  const { data: postedUser } = await axios.post(`http://localhost:3000/users`, user);

  return postedUser;
};
