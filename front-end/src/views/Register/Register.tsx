import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { postUser } from "../../api/userService";
import TextField from "../../components/TextField/TextField";
import TitledComponent from "../../components/TitledComponent/TitledComponent";
import { useAuth } from "../../hooks/useAuth";
import { Namespaces } from "../../i18n/i18n.constants";
import registerSchema, {
  RegisterSchema,
} from "../../RHFSchemas/RegisterSchema";
import { Routes } from "../../router";
import "./Register.scss";

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
      if (error.response?.data?.code === 1001) {
        setError("email", {
          message: translations.tMessage("UserAlreadyExists"),
        });
      }
    },
  }).mutate;

  const onRegisterClick = handleSubmit(async (user) => registerMutation(user));

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
      <Button className="register__button" onClick={onRegisterClick}>
        {translations.tAction("letsGo")}
      </Button>
    </Box>
  );
};

export default Register;
