import { Box, Typography } from "@mui/material";
import ItemCard from "./ItemCard/ItemCard";
import "./ItemsPageContent.scss";
import { useEffect } from "react";
import { ItemCategoery } from "../../../enums";
import { Item } from "../../../types";
import { isEmpty } from "lodash";
import { useTranslation } from "react-i18next";
import { Namespaces } from "../../../i18n/i18n.constants";

type ItemPageContentProps = {
  items: Item[];
  selectedCategory: ItemCategoery;
};

const ItemPageContent = ({ items, selectedCategory }: ItemPageContentProps) => {
  const { t } = useTranslation(Namespaces.title);

  useEffect(() => {}, [items]);

  return (
    <>
      {!isEmpty(items) ? (
        <Box className="displayed-items">
          {items?.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              selectedCategory={selectedCategory}
            />
          ))}
        </Box>
      ) : (
        <Box className="no-items">
          <Typography className="no-items--text">{t("noItems")}</Typography>
        </Box>
      )}
    </>
  );
};

export default ItemPageContent;
