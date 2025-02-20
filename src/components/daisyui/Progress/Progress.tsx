import { ProgressHTMLAttributes, ReactElement, forwardRef } from "react";

import { cn } from "@/helpers";

import { ComponentColor, IComponentBaseProps } from "../types";

export type ProgressProps = Omit<ProgressHTMLAttributes<HTMLProgressElement>, "color"> &
    IComponentBaseProps & {
        color?: ComponentColor;
    };

const Progress = forwardRef<HTMLProgressElement, ProgressProps>(
    ({ color, dataTheme, className, ...props }, ref): ReactElement => {
        const classes = cn("progress", className, {
            "progress-accent": color === "accent",
            "progress-error": color === "error",
            "progress-ghost": color === "ghost",
            "progress-info": color === "info",
            "progress-primary": color === "primary",
            "progress-secondary": color === "secondary",
            "progress-success": color === "success",
            "progress-warning": color === "warning",
        });

        return <progress {...props} ref={ref} data-theme={dataTheme} className={classes} />;
    },
);

Progress.displayName = "Progress";

export default Progress;
