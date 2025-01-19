import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Namespaces } from "../../../i18n/i18n.constants";
import { Routes } from "../../../router";
import "./LoginNavigator.scss";


const LoginNavigator = () => {
    const { t } = useTranslation(Namespaces.firstTime);

    return (
        <Box className="login-navigator">
            {t("haveAnAccount")}
            <Link
                to={Routes.LOGIN}
                style={{ color: "#007bff", textDecoration: "none" }}
            >
                {t("login")}
            </Link>
        </Box>
    );
};

export default LoginNavigator;
