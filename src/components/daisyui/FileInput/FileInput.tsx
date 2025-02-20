import { InputHTMLAttributes, ReactElement, forwardRef } from "react";

import { cn } from "@/helpers";

import { ComponentColor, ComponentSize, IComponentBaseProps } from "../types";

export type FileInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> &
    IComponentBaseProps & {
        size?: ComponentSize;
        color?: ComponentColor;
        bordered?: boolean;
    };

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
    ({ className, size, color, bordered, dataTheme, ...props }, ref): ReactElement => {
        const classes = cn("file-input", className, {
            "file-input-lg": size === "lg",
            "file-input-md": size === "md",
            "file-input-sm": size === "sm",
            "file-input-xs": size === "xs",
            "file-input-primary": color === "primary",
            "file-input-secondary": color === "secondary",
            "file-input-accent": color === "accent",
            "file-input-ghost": color === "ghost",
            "file-input-info": color === "info",
            "file-input-success": color === "success",
            "file-input-warning": color === "warning",
            "file-input-error": color === "error",
            "file-input-bordered": bordered,
        });
        return <input {...props} ref={ref} type="file" data-theme={dataTheme} className={classes} />;
    },
);

FileInput.displayName = "FileInput";

export default FileInput;
