import { ReactNode } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

import { Textarea, TextareaProps } from "@/components/daisyui";

import { cn } from "@/helpers";

type FormTextareaProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<TextareaProps, "name"> & {
    control: Control<TFieldValues>;
    name: TName;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    wrapperClassName?: string;
};

const FormTextarea = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    control,
    name,
    placeholder,
    className,
    startIcon,
    endIcon,
    wrapperClassName,
    ...other
}: FormTextareaProps<TFieldValues, TName>) => {
    return (
        <Controller<TFieldValues, TName>
            control={control}
            render={({ field, fieldState }) => (
                <>
                    <div
                        className={cn(
                            "form-control flex flex-row items-center rounded-box border border-base-content/20 px-3",
                            wrapperClassName,
                            {
                                "border-error/60": fieldState.invalid,
                                "bg-base-content/10": other.disabled,
                            },
                        )}>
                        {startIcon}
                        <Textarea
                            {...field}
                            {...other}
                            placeholder={fieldState.invalid ? " " : placeholder}
                            className={cn(className, "transition-all", {
                                "focus:!-outline-offset-1 focus:outline-red-500": fieldState.invalid,
                            })}
                        />
                        {endIcon}
                    </div>
                    {fieldState.invalid && <span className="mt-1 text-sm text-error">{fieldState.error?.message}</span>}
                </>
            )}
            name={name}
        />
    );
};

export { FormTextarea };
