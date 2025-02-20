import { HTMLAttributes } from "react";

import { cn } from "@/helpers";

import { IComponentBaseProps } from "../types";

export type DropdownMenuProps = HTMLAttributes<HTMLUListElement> & IComponentBaseProps;

const DropdownMenu = ({ dataTheme, className, ...props }: DropdownMenuProps) => {
    const classes = cn("dropdown-content menu p-2 shadow bg-base-100 rounded-box", className);

    return <ul {...props} tabIndex={0} data-theme={dataTheme} className={classes} role="menu" />;
};

export default DropdownMenu;
