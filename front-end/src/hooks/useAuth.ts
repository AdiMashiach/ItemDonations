import { useRecoilState } from "recoil";
import { loggedUser } from "../atom/atom";
import { User } from "../Data/users";

export const useAuth = () => {
  const [user, setUser] = useRecoilState(loggedUser);

  const login = (userToLogin: User) => {
    setUser(userToLogin);
    localStorage.setItem("user", JSON.stringify(userToLogin));
  };

  const logout = () => {
    setUser({} as User);
    localStorage.removeItem("user");
  };

  return { user, login, logout };
};
