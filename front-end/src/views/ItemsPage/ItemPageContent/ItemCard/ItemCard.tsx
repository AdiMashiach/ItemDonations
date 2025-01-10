import {
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Item } from "../../../../Data/items";
import { ItemCategoery } from "../../../../enums";
import { Routes } from "../../../../router";
import "./ItemCard.scss";

type ItemCardProps = {
  item: Item;
  selectedCategory: ItemCategoery;
};

const ItemCard = ({ item, selectedCategory }: ItemCardProps) => {
  const navigate = useNavigate();

  const onCardClick = () => {
    switch (selectedCategory) {
      case ItemCategoery.HOME:
        navigate(Routes.ITEM_FOR_GIVING, { state: { item: item } });
        break;
      case ItemCategoery.MY_ITEMS:
        navigate(Routes.ITEM_OVERVIEW, { state: { item: item } });
        break;
      case ItemCategoery.TO_SHIP_ITEMS:
        navigate(Routes.ITEM_SHIPMENT, { state: { item: item } });
    }
  };

  return (
    <CardActionArea className="item-card" onClick={onCardClick}>
      <CardMedia
        className="item-card__image"
        component="img"
        image={item.image}
      />
      <CardContent className="item-card__content">
        <Typography className="item-card__content--description">
          {item.name}
        </Typography>
      </CardContent>
    </CardActionArea>
  );
};

export default ItemCard;
