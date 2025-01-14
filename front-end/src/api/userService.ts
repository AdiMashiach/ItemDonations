import axios from "axios";
import { User } from "../types";

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
