import { Box, Button, Typography } from "@mui/material";
import "./SuccessPage.scss";
import success from "../../images/Success.png";
import { useTranslation } from "react-i18next";
import { Namespaces } from "../../i18n/i18n.constants";
import { useLocation, useNavigate } from "react-router-dom";
import { Routes } from "../../router";

type SuccessPageProps = {
  headerText: string;
  subHeaderText: string;
};

const SuccessPage = () => {
  const { t } = useTranslation(Namespaces.action);
  const navigate = useNavigate();

  const location = useLocation();
  const { headerText, subHeaderText } =
    location.state ?? ({} as SuccessPageProps);
  console.log(headerText);

  const onBackToWebsiteClick = () => {
    navigate(Routes.ITEMS);
  };

  return (
    <>
      <Box className="success">
        <img src={success} alt="Uploaded Preview" className="success--image" />
        <Typography className="success--header">{headerText}</Typography>
        <Typography className="success--sub">{subHeaderText}</Typography>
      </Box>
      <Button className="back-to-website" onClick={onBackToWebsiteClick}>
        {t("backToWebsite")}
      </Button>
    </>
  );
};

export default SuccessPage;
