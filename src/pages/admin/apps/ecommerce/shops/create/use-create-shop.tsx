import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { createEcommerceShop } from "@/api/apps/ecommerce";
import { createHookedContext } from "@/hooks/create-hooked-context";
import { useToast } from "@/hooks/use-toast";
import { routes } from "@/lib/routes";
import { IEcommerceSeller } from "@/types/apps/ecommerce";

import { ShopSchemaType, shopSchema } from "../helper";

type HookProp = {
    sellers: IEcommerceSeller[];
};

const useHook = ({ sellers }: HookProp) => {
    const toaster = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const { control, handleSubmit, setError } = useForm<ShopSchemaType>({
        resolver: zodResolver(shopSchema),
        defaultValues: {
            name: "",
            email: "",
            mobileNumber: "",
            description: "",
            address: "",
            city: "",
            state: "",
            postalCode: "",
            verified: false,
        },
    });

    const setErrors = (errors: Record<string, any>) => {
        Object.entries(errors).forEach(([key, value]: any[]) => setError(key, { message: value }));
    };

    const onSubmit = handleSubmit(async (data) => {
        setIsLoading(true);
        const response = await createEcommerceShop(data);
        if (response.status == "success") {
            toaster.success("Shop has been created");
            navigate(routes.apps.ecommerce.shops.index);
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
        isLoading,
        sellers,
        handleCancel,
    };
};

const [useCreateEcommerceShop, CreateEcommerceShopProvider] = createHookedContext(useHook);
export { useCreateEcommerceShop, CreateEcommerceShopProvider };
