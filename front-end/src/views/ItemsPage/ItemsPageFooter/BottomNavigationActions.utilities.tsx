import { Circle } from "@mui/icons-material";
import { ItemCategoery } from "../../../enums";

export type FooterAction = {
  label: string;
  subLabel: string;
  value: ItemCategoery;
  icon: JSX.Element;
};

export default [
  {
    label: "itemsForGiving",
    subLabel: 'hereYouFindItemsWaitingToBeTaken',
    value: ItemCategoery.HOME,
    icon: <Circle />,
  },
  {
    label: "newPost",
    value: ItemCategoery.NEW_POST,
    icon: <Circle />,
  },
  {
    label: "itemsIPosted",
    subLabel: 'hereYouHaveAllTheItemsYouPosted',
    value: ItemCategoery.MY_ITEMS,
    icon: <Circle />,
  },
  {
    label: "waitingForShipping",
    subLabel: 'canHelpShippingWellFindWhoNeedsYou',
    value: ItemCategoery.TO_SHIP_ITEMS,
    icon: <Circle />,
  },
] as FooterAction[];
