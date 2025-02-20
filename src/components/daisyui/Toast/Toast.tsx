import { HTMLAttributes, forwardRef } from "react";

import { cn } from "@/helpers";

import { IComponentBaseProps } from "../types";

const horizontalOptions = {
    start: "toast-start",
    center: "toast-center",
    end: "toast-end",
};

const verticalOptions = {
    top: "toast-top",
    middle: "toast-middle",
    bottom: "toast-bottom",
};

export type ToastProps = HTMLAttributes<HTMLDivElement> & {
    horizontal?: keyof typeof horizontalOptions;
    vertical?: keyof typeof verticalOptions;
    className?: string;
} & IComponentBaseProps;

const Toast = forwardRef<HTMLDivElement, ToastProps>(
    ({ horizontal = "end", vertical = "bottom", className, children, ...props }: ToastProps, ref) => {
        return (
            <div
                {...props}
                className={cn("toast", horizontalOptions[horizontal], verticalOptions[vertical], className)}
                ref={ref}>
                {children}
            </div>
        );
    },
);
Toast.displayName = "Toast";
export default Toast;
