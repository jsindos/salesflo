import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

import { RadioProps, Toggle } from "../daisyui";

type FormToggleProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<RadioProps, "name"> & {
    control: Control<TFieldValues>;
    name: TName;
};

const FormToggle = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    control,
    name,
    className,
    ...other
}: FormToggleProps<TFieldValues, TName>) => {
    return (
        <Controller<TFieldValues, TName>
            control={control}
            render={({ field }) => (
                <>
                    <Toggle {...field} {...other} className={className} checked={field.value} />
                </>
            )}
            name={name}
        />
    );
};

export { FormToggle };
