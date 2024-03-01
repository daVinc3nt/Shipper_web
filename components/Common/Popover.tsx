import React, { ReactNode } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Button } from "@nextui-org/react";
import { FormattedMessage } from "react-intl";
interface Props {
  children: ReactNode;
  icon: any;
}
//reactNode is a dataType of react, its can be JSX,
//component or any fragment

export default function BasicPopover({ children, icon = null }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button
        className="text-xs h-10 md:text-base  border border-gray-600 rounded ml-2 w-24 text-center"
        aria-describedby={id}
        onClick={handleClick}
      >
        {icon}
        <FormattedMessage id="Filter" />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        className="mt-3"
      >
        <div className="bg-[#1a1b23] border border-gray-300 rounded px-4 pb-4">
          {children}
        </div>
      </Popover>
    </div>
  );
}
