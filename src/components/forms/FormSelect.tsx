import { ReactNode } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

import SelectElement, { SelectElementProps } from "@/components/plugins/SelectElement";
import { cn } from "@/helpers";

type FormSelectProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    T = unknown,
    IsMulti extends boolean = false,
> = Omit<SelectElementProps<T, IsMulti>, "name" | "ref"> & {
    control: Control<TFieldValues>;
    name: TName;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
};

const FormSelect = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    T = unknown,
    IsMulti extends boolean = false,
>({
    control,
    name,
    placeholder,
    className,
    startIcon,
    options,
    endIcon,
    children,
    ...other
}: FormSelectProps<TFieldValues, TName, T, IsMulti>) => {
    return (
        <Controller<TFieldValues, TName>
            control={control}
            render={({ field, fieldState }) => (
                <div>
                    <div
                        className={cn("form-control flex flex-row items-center", {
                            "border-error/60": fieldState.invalid,
                        })}>
                        {startIcon}
                        {/*@ts-ignore*/}
                        <SelectElement<T, IsMulti>
                            {...field}
                            {...other}
                            placeholder={placeholder}
                            options={options}
                            onChange={(change) => field.onChange(change)}
                            value={other.value || field.value}
                            className={cn(className, "grow transition-all", {
                                invalid: fieldState.invalid,
                            })}>
                            {children}
                        </SelectElement>
                        {endIcon}
                    </div>
                    {fieldState.invalid && <span className="mt-1 text-sm text-error">{fieldState.error?.message}</span>}
                </div>
            )}
            name={name}
        />
    );
};

export { FormSelect };
