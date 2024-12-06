import { ReactNode } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

import { Input, InputProps } from "@/components/daisyui";

import { cn } from "@/helpers";

type FormInputProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<InputProps, "name"> & {
    control: Control<TFieldValues>;
    name: TName;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    wrapperClassName?: string;
};

const FormInput = <
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
}: FormInputProps<TFieldValues, TName>) => {
    return (
        <Controller<TFieldValues, TName>
            control={control}
            render={({ field, fieldState }) => (
                <>
                    <div
                        className={cn(
                            "form-control flex flex-row items-center rounded-box border border-base-content/20",
                            wrapperClassName,
                            {
                                "border-error/60": fieldState.invalid,
                                "ps-3": startIcon,
                                "pe-3": endIcon,
                                "bg-base-content/10": other.disabled,
                            },
                        )}>
                        {startIcon}
                        <Input
                            {...field}
                            {...other}
                            onChange={(event) =>
                                field.onChange(
                                    other.type === "number" && event.target.value.length > 0
                                        ? event.target.valueAsNumber
                                        : event.target.value,
                                )
                            }
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

export { FormInput };
