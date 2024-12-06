import eyeIcon from "@iconify/icons-lucide/eye";
import eyeOffIcon from "@iconify/icons-lucide/eye-off";

import { ReactNode, useState } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

import { Button, InputProps } from "@/components/daisyui";

import { Icon } from "@/components/Icon";
import { FormInput } from "@/components/forms/FormInput";

type FormInputPasswordProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<InputProps, "name"> & {
    control: Control<TFieldValues>;
    name: TName;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
};

const FormInputPassword = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    ...props
}: FormInputPasswordProps<TFieldValues>) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormInput
            {...props}
            type={showPassword ? "text" : "password"}
            endIcon={
                <Button
                    onClick={() => setShowPassword(!showPassword)}
                    size={"xs"}
                    type={"button"}
                    aria-label="Show/Hide password"
                    shape={"circle"}
                    color={"ghost"}
                    className={"hover:bg-base-content/10"}>
                    {showPassword ? (
                        <Icon icon={eyeOffIcon} className="text-base-content/80" fontSize={18} />
                    ) : (
                        <Icon icon={eyeIcon} className="text-base-content/80" fontSize={16} />
                    )}
                </Button>
            }></FormInput>
    );
};

export { FormInputPassword };
