import { useState } from "react";
import Side from "./Side";
import {
  ReceiptLong,
  Inventory,
  Assistant,
  People,
  PieChart,
  PendingActions,
  LocalShipping,
  BusinessCenter,
  AlternateEmail,
  Folder,
  LogoutOutlined,
} from "@mui/icons-material";
import { FormattedMessage } from "react-intl";
import MenuHambuger from "./MenuHambuger";
const SideItemData = [
  {
    id: 1,
    title: <FormattedMessage id="Sidebar.option1" />,
    url: "/dashboard/History",
    icon: <ReceiptLong className="scale-75 lg:block" />,
  },
  {
    id: 2,
    title: <FormattedMessage id="Sidebar.option2" />,
    url: "/dashboard/consignment",
    icon: <Inventory className="scale-75 lg:block" />,
  },
];
export default function SideBar({ toggleCollapseMobile }) {
  const [dropdown, Setdropdown] = useState(false);
  return (
    <Side
      menuItems={SideItemData}
      toggleCollapseMobile={toggleCollapseMobile}
    />
  );
}
