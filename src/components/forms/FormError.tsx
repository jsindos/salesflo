import React from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

import { cn } from "@/helpers";

type FormErrorProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
    control: Control<TFieldValues>;
    name: TName;
    className?: string;
};

const FormError = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    control,
    name,
    className,
}: FormErrorProps<TFieldValues, TName>) => {
    return (
        <Controller<TFieldValues, TName>
            control={control}
            render={({ fieldState: { error } }) => (
                <>
                    {error?.message && (
                        <span className={cn("text-sm text-error", className)}>{error?.message.toString()}</span>
                    )}
                </>
            )}
            name={name}
        />
    );
};

export { FormError };
