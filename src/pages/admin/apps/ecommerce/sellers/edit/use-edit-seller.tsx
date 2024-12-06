import { zodResolver } from "@hookform/resolvers/zod";
import { FilePondFile } from "filepond";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { changeEcommerceSellerPassword, editEcommerceSeller } from "@/api/apps/ecommerce";
import { createHookedContext } from "@/hooks/create-hooked-context";
import { useToast } from "@/hooks/use-toast";
import { routes } from "@/lib/routes";
import { IEcommerceSeller } from "@/types/apps/ecommerce";

import {
    ChangeSellerPasswordSchemaType,
    EditSellerSchemaType,
    changeSellerPasswordSchema,
    editSellerSchema,
} from "../helper";

type HookProp = {
    seller: IEcommerceSeller;
};

const useHook = ({ seller }: HookProp) => {
    const toaster = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isChangePasswordLoading, setIsChangePasswordLoading] = useState(false);

    const { control, handleSubmit, watch, setValue, setError, formState } = useForm<EditSellerSchemaType>({
        resolver: zodResolver(editSellerSchema),
        defaultValues: {
            name: seller.name,
            email: seller.email,
            mobileNumber: seller.mobileNumber,
            gender: seller.gender,
            image: seller.image,
            verified: seller.verified,
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
    } = useForm<ChangeSellerPasswordSchemaType>({
        resolver: zodResolver(changeSellerPasswordSchema),
        defaultValues: { password: "", confirmPassword: "" },
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
        const response = await editEcommerceSeller(seller.id, data);
        if (response.status == "success") {
            toaster.success("Seller has been updated");
            navigate(routes.apps.ecommerce.sellers.index);
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
        const response = await changeEcommerceSellerPassword(seller.id, data.password);
        if (response.status == "success") {
            toaster.success("Password has been changed");
            reset({ password: "", confirmPassword: "" });
        }
        setIsChangePasswordLoading(false);
    });

    return {
        control,
        onSubmit,
        sellerImage: watch("image"),
        isLoading,
        changePasswordControl,
        onSubmitChangePassword,
        isChangePasswordLoading,
        handleChangeImage,
        handleCancel,
    };
};

const [useEditEcommerceSeller, EditEcommerceSellerProvider] = createHookedContext(useHook);
export { useEditEcommerceSeller, EditEcommerceSellerProvider };
