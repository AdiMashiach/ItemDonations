import { ItemCategoery, ItemClause } from "../../../enums";

export default [
  {
    tabName: "nearMe",
    tabValue: ItemClause.NEAR_ME,
    relevantCategories: [ItemCategoery.HOME, ItemCategoery.TO_SHIP_ITEMS],
  },
  {
    tabName: "allItems",
    tabValue: ItemClause.ALL_ITEMS,
    relevantCategories: [ItemCategoery.HOME, ItemCategoery.TO_SHIP_ITEMS],
  },
];
