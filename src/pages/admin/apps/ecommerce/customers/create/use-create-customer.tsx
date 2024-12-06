import { zodResolver } from "@hookform/resolvers/zod";
import { FilePondFile } from "filepond";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { createEcommerceCustomer } from "@/api/apps/ecommerce";
import { createHookedContext } from "@/hooks/create-hooked-context";
import { useToast } from "@/hooks/use-toast";
import { routes } from "@/lib/routes";

import { CreateCustomerSchemaType, createCustomerSchema } from "../helper";

const useHook = () => {
    const toaster = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const { control, handleSubmit, setValue, setError, formState } = useForm<CreateCustomerSchemaType>({
        resolver: zodResolver(createCustomerSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
            name: "",
            email: "",
            mobileNumber: "",
            verified: false,
            dob: "",
            address: "",
            city: "",
            state: "",
            postalCode: "",
        },
    });

    const setErrors = (errors: Record<string, any>) => {
        Object.entries(errors).forEach(([key, value]: any[]) => setError(key, { message: value }));
    };

    const handleChangeImage = (fileItems: FilePondFile[]) => {
        if (fileItems.length > 0) {
            const fileItem = fileItems[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    setValue("image", reader.result as string);
                }
            };
            if (fileItem.file.type.match("image.*")) {
                reader.readAsDataURL(fileItem.file);
            }
        } else {
            setValue("image", undefined);
        }
    };

    const onSubmit = handleSubmit(async (data) => {
        setIsLoading(true);
        const response = await createEcommerceCustomer(data);
        if (response.status == "success") {
            toaster.success("Customer has been created");
            navigate(routes.apps.ecommerce.customers.index);
        } else if (response.status == "error") {
            setErrors(response.errors);
        }
        setIsLoading(false);
    });

    const handleCancel = () => {
        navigate(-1);
    };

    return {
        control,
        onSubmit,
        handleCancel,
        handleChangeImage,
        isLoading,
    };
};

const [useCreateEcommerceCustomer, CreateEcommerceCustomerProvider] = createHookedContext(useHook);
export { useCreateEcommerceCustomer, CreateEcommerceCustomerProvider };
