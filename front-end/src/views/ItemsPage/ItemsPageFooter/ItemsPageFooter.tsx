import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ItemCategoery } from "../../../enums";
import { Namespaces } from "../../../i18n/i18n.constants";
import { Routes } from "../../../router";
import bottomNavigationActions, {
  FooterAction,
} from "./BottomNavigationActions.utilities";
import "./ItemsPageFooter.scss";
import { Item } from "../../../types";

type ItemsPageFooterProps = {
  selectedCategory: FooterAction;
  setSelectedCategory: React.Dispatch<React.SetStateAction<FooterAction>>;
};

const ItemsPageFooter = ({
  selectedCategory: displayedItemsClause,
  setSelectedCategory: setDisplayedItemsClause,
}: ItemsPageFooterProps) => {
  const { t } = useTranslation(Namespaces.title);

  const navigate = useNavigate();

  const onNewPostClick = () => {
    navigate(Routes.ITEM_MODIFICATION, {
      state: { item: {} as Item, isNew: true },
    });
  };

  return (
    <>
      <BottomNavigation
        className="footer"
        value={displayedItemsClause}
        onChange={(_, newValue) => {
          setDisplayedItemsClause(newValue);
        }}
        showLabels
      >
        {bottomNavigationActions.map((action) => (
          <BottomNavigationAction
            key={action.value}
            className="footer__button"
            label={t(action.label)}
            value={action}
            icon={action.icon}
            onClick={() => {
              if (action.value === ItemCategoery.NEW_POST) onNewPostClick();
            }}
          />
        ))}
      </BottomNavigation>
    </>
  );
};

export default ItemsPageFooter;
