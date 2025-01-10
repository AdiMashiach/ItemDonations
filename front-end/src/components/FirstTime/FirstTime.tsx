import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./FirstTime.scss";
import { useTranslation } from "react-i18next";
import { Namespaces } from "../../i18n/i18n.constants";
import { Routes } from "../../router";

type FirstTimeProps = {
  alignment: "left" | "right" | "center";
};

const FirstTime = ({ alignment }: FirstTimeProps) => {
  const { t } = useTranslation(Namespaces.firstTime);

  return (
    <Typography className="first-time" sx={{ textAlign: alignment }}>
      {t("firstTime")}
      <Link
        to={Routes.REGISTER}
        style={{ color: "#007bff", textDecoration: "none" }}
      >
        {t("signUp")}
      </Link>
    </Typography>
  );
};

export default FirstTime;
