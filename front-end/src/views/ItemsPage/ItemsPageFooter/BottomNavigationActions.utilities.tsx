import { AddCircleOutline, LocalShipping, Person2, TravelExplore } from "@mui/icons-material";
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
    icon: <TravelExplore />,
  },
  {
    label: "newPost",
    value: ItemCategoery.NEW_POST,
    icon: <AddCircleOutline />,
  },
  {
    label: "itemsIPosted",
    subLabel: 'hereYouHaveAllTheItemsYouPosted',
    value: ItemCategoery.MY_ITEMS,
    icon: <Person2 />,
  },
  {
    label: "waitingForShipping",
    subLabel: 'canHelpShippingWellFindWhoNeedsYou',
    value: ItemCategoery.TO_SHIP_ITEMS,
    icon: <LocalShipping />,
  },
] as FooterAction[];
