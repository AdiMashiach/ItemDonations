import { LocationOn, Logout, SearchRounded } from "@mui/icons-material";
import { Box, IconButton, Tab, Tabs, Typography } from "@mui/material";
import clsx from "clsx";
import { isEmpty } from "lodash";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userLocation as userLocationAtom } from "../../../atom/atom";
import { ItemClause } from "../../../enums";
import { useAuth } from "../../../hooks/useAuth";
import { Namespaces } from "../../../i18n/i18n.constants";
import { Routes } from "../../../router";
import { FooterAction } from "../ItemsPageFooter/BottomNavigationActions.utilities";
import ItemPageHeaderSearch from "./ItemPageHeaderSearch/ItemPageHeaderSearch";
import "./ItemsPageHeader.scss";
import tabs from "./Tabs.utilites";
import ConfirmationDrawer from "../../../components/ConfirmationDrawer/ConfirmationDrawer";
import ConfirmationDrawerButtons from "./ConfirmationDrawerButtons/ConfirmationDrawerButtons";

type ItemsPageHeaderProps = {
  selectedClause: ItemClause;
  setSelectedClause: React.Dispatch<React.SetStateAction<ItemClause>>;
  selectedCategory: FooterAction;
  setItemsSearchValue: Dispatch<SetStateAction<string>>;
};

const ItemsPageHeader = ({
  selectedClause,
  setSelectedClause,
  selectedCategory,
  setItemsSearchValue,
}: ItemsPageHeaderProps) => {
  const translations = {
    tTitle: useTranslation(Namespaces.title).t,
    tPlaceholder: useTranslation(Namespaces.placeholder).t,
  };

  const [relevantTabs, setRelevantTabs] = useState(tabs);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isConfirmationDrawerOpen, setIsConfirmationDrawerOpen] =
    useState(false);

  const { logout } = useAuth();

  const navigate = useNavigate();

  const userLocation = useRecoilValue(userLocationAtom);

  const onItemClauseChange = (itemClause: ItemClause) => {
    setSelectedClause(itemClause);
  };

  const onLogoutClick = () => {
    navigate(Routes.LAND_PAGE);
    logout();
  };

  useEffect(() => {
    const filteredTabs = tabs.filter((tab) =>
      tab.relevantCategories.some(
        (relevantCategory) => relevantCategory === selectedCategory.value
      )
    );

    setRelevantTabs(filteredTabs);
  }, [selectedCategory]);

  const toggleSearchBar = () => {
    setIsSearchOpen((prev) => !prev);
    setItemsSearchValue("");
  };

  return (
    <>
      <Box className="header">
        {!isSearchOpen ? (
          <Box className="header__actions">
            <IconButton
              className="header__actions__search"
              onClick={toggleSearchBar}
            >
              <SearchRounded />
            </IconButton>
            <Box className="header__actions__location">
              <LocationOn className="header__actions__location--icon" />
              <Typography className="header__actions__location--text">
                {userLocation}
              </Typography>
            </Box>
            <IconButton
              className="header__actions__logout"
              onClick={onLogoutClick}
            >
              <Logout />
            </IconButton>
          </Box>
        ) : (
          <ItemPageHeaderSearch
            setItemsSearchValue={setItemsSearchValue}
            toggleSearchBar={toggleSearchBar}
          />
        )}
        <Box className="header__description">
          <Typography className="header__description__title">
            {translations.tTitle(selectedCategory.label)}
          </Typography>
          <Typography className="header__description__sub-title">
            {translations.tTitle(selectedCategory.subLabel)}
          </Typography>
          {!isEmpty(relevantTabs) && (
            <Tabs
              className="header__description-clauses"
              value={selectedClause}
              onChange={(_, value) => onItemClauseChange(value)}
            >
              {relevantTabs.map((tab) => (
                <Tab
                  key={tab.tabName}
                  className={clsx(
                    "header__description-clauses--option",
                    selectedClause === tab.tabValue &&
                    "header__description-clauses--active-option"
                  )}
                  label={translations.tTitle(tab.tabName)}
                  value={tab.tabValue}
                />
              ))}
            </Tabs>
          )}
        </Box>
      </Box>
      <ConfirmationDrawer
        title={translations.tTitle("logoutFromTheWebsite")}
        isDrawerOpen={isConfirmationDrawerOpen}
        setIsDrawerOpen={setIsConfirmationDrawerOpen}
        drawerButtons={<ConfirmationDrawerButtons />}
        drawerContent={<></>}
      />
    </>
  );
};

export default ItemsPageHeader;
