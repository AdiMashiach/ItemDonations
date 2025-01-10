import { useQuery } from "react-query";
import { User, users } from "../Data/users";

export const getUser = async (userToFind: User) => {
  return users.find(
    (user) =>
      user.email === userToFind.email && user.password === userToFind.password
  );
};

export const checkUserExist = async (userToFind: User) => {
  return users.find((user) => user.email === userToFind.email);
};

export const addUser = async (userToAdd: User) => {
  users.push(userToAdd);
};

export const getLocation = () => {
  return "חולון";
};

export const useItemOwnerPhoneNumber = (itemOwner: string) => {
  const getItemOwnerPhoneNumber = async () => {
    return users.find((user) => user.email === itemOwner)?.phoneNumber;
  };

  return useQuery({
    queryKey: ["getItemOwnerPhoneNumber", itemOwner],
    queryFn: getItemOwnerPhoneNumber,
  });
};
