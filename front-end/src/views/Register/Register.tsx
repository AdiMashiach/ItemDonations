import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { postUser } from "../../api/userService";
import TextField from "../../components/TextField/TextField";
import TitledComponent from "../../components/TitledComponent/TitledComponent";
import { ERROR_CODES } from "../../enums";
import { useAuth } from "../../hooks/useAuth";
import { Namespaces } from "../../i18n/i18n.constants";
import registerSchema, {
  RegisterSchema,
} from "../../RHFSchemas/RegisterSchema";
import { Routes } from "../../router";
import "./Register.scss";
import LoginNavigator from "./LoginNavigator/LoginNavigator";

const Register = () => {
  const translations = {
    tTitle: useTranslation(Namespaces.title).t,
    tField: useTranslation(Namespaces.field).t,
    tPlaceholder: useTranslation(Namespaces.placeholder).t,
    tAction: useTranslation(Namespaces.action).t,
    tMessage: useTranslation(Namespaces.message).t,
  };

  const { login } = useAuth();
  const navigate = useNavigate();

  const { control, handleSubmit, setError } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      phoneNumber: "",
    },
  });

  const registerMutation = useMutation(postUser, {
    onSuccess: (postedUser) => {
      navigate(Routes.ITEMS);
      login(postedUser);
    },
    onError: (error: any) => {
      console.log(error);

      if (error.response?.data?.code === ERROR_CODES.USER_ALREADY_EXISTS) {
        setError("email", {
          message: translations.tMessage("UserAlreadyExists"),
        });
      }
    },
  }).mutate;

  const formattedPhoneNumber = (phoneNumber: string) => {
    const digits = phoneNumber.replace(/\D/g, '');

    if (digits.startsWith('972')) {
      return `+${digits}`;
    } else if (digits.startsWith('0')) {
      return `+972${digits.substring(1)}`;
    }
    return `+${digits}`;
  }

  const onRegisterClick = handleSubmit((user) => {
    user.phoneNumber = formattedPhoneNumber(user.phoneNumber);
    registerMutation(user);
  });

  return (
    <Box className="register">
      <Typography className="register__title">
        {translations.tTitle("register")}
      </Typography>
      <Box className="register__inputs">
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
            placeholder={translations.tPlaceholder("yourPassword")}
            sx={{ width: "90vw" }}
            type="password"
          />
        </TitledComponent>
        <TitledComponent title={translations.tField("phoneNumber")}>
          <TextField
            control={control}
            name={"phoneNumber"}
            placeholder={translations.tPlaceholder("phoneNumber")}
            sx={{ width: "90vw" }}
          />
        </TitledComponent>
      </Box>
      <LoginNavigator />
      <Button className="register__button" onClick={onRegisterClick}>
        {translations.tAction("letsGo")}
      </Button>
    </Box>
  );
};

export default Register;
