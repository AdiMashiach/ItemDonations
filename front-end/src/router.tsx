import { createHashRouter } from "react-router-dom";
import ItemModification from "./views/ItemModification/ItemModification";
import ItemOverview from "./views/ItemOverview/ItemOverview";
import ItemShipment from "./views/ItemShipment/ItemShipment";
import ItemsPage from "./views/ItemsPage/ItemsPage";
import LandPage from "./views/LandPage/LandPage";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import AuthProvider from "./components/AuthProvider/AuthProvider";
import ItemForGiving from "./views/ItemForGiving/ItemForGiving";
import SuccessPage from "./views/SuccessPage/SuccessPage";

export enum Routes {
  LAND_PAGE = "/",
  LOGIN = "/login",
  REGISTER = "/register",
  ITEMS = "/items",
  ITEM_MODIFICATION = "/itemModification",
  ITEM_OVERVIEW = "/itemOverview",
  ITEM_SHIPMENT = "/itemShipment",
  ITEM_FOR_GIVING = "/itemForGiving",
  SUCCESS = "/success",
}

const router = createHashRouter([
  {
    path: Routes.LAND_PAGE,
    element: <AuthProvider children={<LandPage />} />,
    index: true,
  },
  {
    path: Routes.LOGIN,
    element: <AuthProvider children={<Login />} />,
  },
  {
    path: Routes.REGISTER,
    element: <AuthProvider children={<Register />} />,
  },
  {
    path: Routes.ITEMS,
    element: <AuthProvider children={<ItemsPage />} />,
  },
  {
    path: Routes.ITEM_MODIFICATION,
    element: <AuthProvider children={<ItemModification />} />,
  },
  {
    path: Routes.ITEM_OVERVIEW,
    element: <AuthProvider children={<ItemOverview />} />,
  },
  {
    path: Routes.ITEM_SHIPMENT,
    element: <AuthProvider children={<ItemShipment />} />,
  },
  {
    path: Routes.ITEM_FOR_GIVING,
    element: <AuthProvider children={<ItemForGiving />} />,
  },
  {
    path: Routes.SUCCESS,
    element: <AuthProvider children={<SuccessPage />} />,
  },
  {
    path: "*",
    element: <AuthProvider children={<LandPage />} />,
  },
]);

export default router;
