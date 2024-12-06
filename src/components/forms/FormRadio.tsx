import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

import { Radio, RadioProps } from "../daisyui";

type FormRadioProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<RadioProps, "name"> & {
    control: Control<TFieldValues>;
    name: TName;
};

const FormRadio = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    control,
    name,
    className,
    value,
    ...other
}: FormRadioProps<TFieldValues, TName>) => {
    return (
        <Controller<TFieldValues, TName>
            control={control}
            render={({ field }) => (
                <>
                    <Radio
                        {...field}
                        {...other}
                        className={className}
                        checked={field.value === value}
                        onChange={() => field.onChange(value)}
                    />
                </>
            )}
            name={name}
        />
    );
};

export { FormRadio };
