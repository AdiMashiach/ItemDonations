import { atom } from "recoil";
import { City, User } from "../types";

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

export const cities = atom<City[]>({
  key: "cities",
  default: [],
});
