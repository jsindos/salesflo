import { zodResolver } from "@hookform/resolvers/zod";
import { FilePondFile } from "filepond";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { changeEcommerceCustomerPassword, editEcommerceCustomer } from "@/api/apps/ecommerce";
import { createHookedContext } from "@/hooks/create-hooked-context";
import { useToast } from "@/hooks/use-toast";
import { routes } from "@/lib/routes";
import { IEcommerceCustomer } from "@/types/apps/ecommerce";

import {
    ChangeCustomerPasswordSchemaType,
    EditCustomerSchemaType,
    changeCustomerPasswordSchema,
    editCustomerSchema,
} from "../helper";

type HookProp = {
    customer: IEcommerceCustomer;
};

const useHook = ({ customer }: HookProp) => {
    const toaster = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isChangePasswordLoading, setIsChangePasswordLoading] = useState(false);

    const { control, handleSubmit, watch, setValue, setError } = useForm<EditCustomerSchemaType>({
        resolver: zodResolver(editCustomerSchema),
        defaultValues: {
            name: customer.name,
            email: customer.email,
            mobileNumber: customer.mobileNumber,
            gender: customer.gender,
            image: customer.image,
            verified: customer.verified,
            dob: "",
            address: "",
            city: "",
            state: "",
            postalCode: "",
        },
    });

    const {
        control: changePasswordControl,
        handleSubmit: handleSubmitChangePassword,
        reset,
    } = useForm<ChangeCustomerPasswordSchemaType>({
        resolver: zodResolver(changeCustomerPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
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
        const response = await editEcommerceCustomer(customer.id, data);
        if (response.status == "success") {
            toaster.success("Customer has been edited");
            navigate(routes.apps.ecommerce.customers.index);
        } else if (response.status == "error") {
            setErrors(response.errors);
        }
        setIsLoading(false);
    });

    const handleCancel = () => {
        navigate(-1);
    };

    const onSubmitChangePassword = handleSubmitChangePassword(async (data) => {
        setIsChangePasswordLoading(true);
        const response = await changeEcommerceCustomerPassword(customer.id, data.password);
        if (response.status == "success") {
            toaster.success("Password has been changed");
            reset({ password: "", confirmPassword: "" });
        }
        setIsChangePasswordLoading(false);
    });

    return {
        control,
        onSubmit,
        handleCancel,
        handleChangeImage,
        customerImage: watch("image"),
        isLoading,
        changePasswordControl,
        onSubmitChangePassword,
        isChangePasswordLoading,
    };
};

const [useEditEcommerceCustomer, EditEcommerceCustomerProvider] = createHookedContext(useHook);
export { useEditEcommerceCustomer, EditEcommerceCustomerProvider };
