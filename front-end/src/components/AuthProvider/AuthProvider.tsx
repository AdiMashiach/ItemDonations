import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Routes } from "../../router";
import { isEmpty } from "lodash";

type AuthProviderProps = PropsWithChildren;

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEmpty(user.email)) navigate(Routes.LAND_PAGE);
    else navigate(Routes.ITEMS);
  }, []);

  return user ? children : null;
};

export default AuthProvider;
