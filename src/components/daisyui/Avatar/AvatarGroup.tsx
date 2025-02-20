import { HTMLAttributes, ReactElement, forwardRef } from "react";

import { cn } from "@/helpers";

import { AvatarProps } from "../Avatar";

export type AvatarGroupProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactElement<AvatarProps>[];
};

const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
    ({ children, className, ...props }, ref): ReactElement => {
        const classes = cn("avatar-group -space-x-6", className);

        return (
            <div aria-label={`Group of ${children.length} avatar photos`} {...props} className={classes} ref={ref}>
                {children}
            </div>
        );
    },
);

AvatarGroup.displayName = "Avatar Group";

export default AvatarGroup;
