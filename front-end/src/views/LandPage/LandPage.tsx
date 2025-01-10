import { Box, Button, Typography } from "@mui/material";
import FirstTime from "../../components/FirstTime/FirstTime";
import { Namespaces } from "../../i18n/i18n.constants";
import "./LandPage.scss";
import LandPageAvatar from "./LandPageAvatar/LandPageAvatar";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Routes } from "../../router";

const LandPage = () => {
  const translations = {
    tLandPage: useTranslation(Namespaces.landPage).t,
    tAction: useTranslation(Namespaces.action).t,
  };
  const navigate = useNavigate();
  
  const onLoginClick = () => {
    navigate(Routes.LOGIN);
  };

  return (
    <Box className="landing-page">
      <LandPageAvatar />
      <Box className="landing-page__title">
        <Typography className="landing-page__title--main">
          {translations.tLandPage("welcome")}
        </Typography>
        <Typography className="landing-page__title--sub">
          {translations.tLandPage("hereWeDonateItemsForWhomeNeedsThem")}
        </Typography>
      </Box>
      <Box className="landing-page__links">
        <Button className="landing-page__links--login" onClick={onLoginClick}>
          {translations.tAction("login")}
        </Button>
        <FirstTime alignment="center" />
      </Box>
    </Box>
  );
};

export default LandPage;
