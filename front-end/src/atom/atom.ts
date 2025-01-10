import { atom } from "recoil";
import { User } from "../Data/users";

export const loggedUser = atom<User>({
  key: "loggedUser",
  default: (() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : {};
  })(),
});

export const userLocation = atom<string>({
  key: "userLocation",
  default: "",
});
