import { Cancel } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { Namespaces } from "../../../../i18n/i18n.constants";
import "./ItemPageHeaderSearch.scss";

type ItemPageHeaderSearchProps = {
  setItemsSearchValue: Dispatch<SetStateAction<string>>;
  toggleSearchBar: () => void;
};

const ItemPageHeaderSearch = ({
  setItemsSearchValue,
  toggleSearchBar,
}: ItemPageHeaderSearchProps) => {
  const translations = {
    tPlaceholder: useTranslation(Namespaces.placeholder).t,
  };

  return (
    <TextField
      className="search--input"
      placeholder={translations.tPlaceholder("searchItems")}
      onChange={(e) => setItemsSearchValue(e.target.value)}
      InputProps={{
        sx: {
          borderRadius: "2rem",
          height: "2.5rem",
          backgroundColor: "#f1f1f599",
          paddingInlineStart: "2rem",
        },
        endAdornment: (
          <IconButton onClick={toggleSearchBar}>
            <Cancel />
          </IconButton>
        ),
      }}
    />
  );
};

export default ItemPageHeaderSearch;
