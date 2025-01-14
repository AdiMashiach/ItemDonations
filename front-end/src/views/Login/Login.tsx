import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { getUser } from "../../api/userService";
import { loggedUser } from "../../atom/atom";
import FirstTime from "../../components/FirstTime/FirstTime";
import TextField from "../../components/TextField/TextField";
import TitledComponent from "../../components/TitledComponent/TitledComponent";
import { useAuth } from "../../hooks/useAuth";
import { Namespaces } from "../../i18n/i18n.constants";
import loginSchema, { LoginSchema } from "../../RHFSchemas/LoginSchema";
import { Routes } from "../../router";
import "./Login.scss";

const Login = () => {
  const translations = {
    tTitle: useTranslation(Namespaces.title).t,
    tField: useTranslation(Namespaces.field).t,
    tPlaceholder: useTranslation(Namespaces.placeholder).t,
    tAction: useTranslation(Namespaces.action).t,
    tMessage: useTranslation(Namespaces.message).t,
  };

  const { login } = useAuth();

  const navigate = useNavigate();

  const currentUser = useRecoilValue(loggedUser);

  const { control, handleSubmit, setError } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { ...currentUser },
  });

  const loginMutate = useMutation(getUser, {
    onSuccess: (user) => {
      navigate(Routes.ITEMS);
      login(user);
    },
    onError: (error: any) => {
      if (error?.response.data?.code === 1002) {
        setError("password", { message: "invalidPasswordOrEmail" });
      }
    },
  }).mutate;

  const onLoginClick = handleSubmit(async (user) =>
    loginMutate({
      email: user.email,
      password: user.password,
      phoneNumber: "",
    })
  );

  return (
    <Box className="login">
      <Typography className="login__title">
        {translations.tTitle("login")}
      </Typography>
      <Box className="login__inputs">
        <TitledComponent title={translations.tField("email")}>
          <TextField
            control={control}
            name={"email"}
            sx={{ width: "90vw" }}
            placeholder={translations.tPlaceholder("stubMail")}
          />
        </TitledComponent>
        <TitledComponent title={translations.tField("password")}>
          <TextField
            control={control}
            name={"password"}
            type="password"
            placeholder={translations.tPlaceholder("yourPassword")}
            sx={{ width: "90vw" }}
          />
        </TitledComponent>
      </Box>
      <FirstTime alignment="right" />
      <Button className="login__button" onClick={onLoginClick}>
        {translations.tAction("login")}
      </Button>
    </Box>
  );
};

export default Login;
