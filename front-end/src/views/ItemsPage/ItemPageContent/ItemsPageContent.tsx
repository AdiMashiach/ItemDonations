import { Box } from "@mui/material";
import ItemCard from "./ItemCard/ItemCard";
import "./ItemsPageContent.scss";
import { useEffect } from "react";
import { ItemCategoery } from "../../../enums";
import { Item } from "../../../types";

type ItemPageContentProps = {
  items: Item[];
  selectedCategory: ItemCategoery;
};

const ItemPageContent = ({ items, selectedCategory }: ItemPageContentProps) => {
  useEffect(() => {}, [items]);

  return (
    <Box className="displayed-items">
      {items?.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          selectedCategory={selectedCategory}
        />
      ))}
    </Box>
  );
};

export default ItemPageContent;
