import { InputHTMLAttributes, ReactElement, forwardRef } from "react";

import { cn } from "@/helpers";

import { ComponentColor, ComponentSize, IComponentBaseProps } from "../types";

export type ToggleProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> &
    IComponentBaseProps & {
        color?: ComponentColor;
        size?: ComponentSize;
    };

const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
    ({ color, size, dataTheme, className, ...props }, ref): ReactElement => {
        const classes = cn("toggle", className, {
            "toggle-lg": size === "lg",
            "toggle-md": size === "md",
            "toggle-sm": size === "sm",
            "toggle-xs": size === "xs",
            "toggle-primary": color === "primary",
            "toggle-secondary": color === "secondary",
            "toggle-accent": color === "accent",
            "toggle-info": color === "info",
            "toggle-success": color === "success",
            "toggle-warning": color === "warning",
            "toggle-error": color === "error",
        });

        return <input {...props} ref={ref} type="checkbox" data-theme={dataTheme} className={classes} />;
    },
);

Toggle.displayName = "Toggle";

export default Toggle;
