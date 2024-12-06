import { zodResolver } from "@hookform/resolvers/zod";
import { FilePondFile } from "filepond";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { createEcommerceProduct } from "@/api/apps/ecommerce";
import { createHookedContext } from "@/hooks/create-hooked-context";
import { useToast } from "@/hooks/use-toast";
import { routes } from "@/lib/routes";
import { IEcommerceProductCategory } from "@/types/apps/ecommerce";

import { ProductSchemaType, calculateDiscountPrice, productSchema } from "../helpers";

type HookProp = {
    productCategories: IEcommerceProductCategory[];
};

const useHook = ({ productCategories }: HookProp) => {
    const toaster = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const { control, handleSubmit, setError, setValue, watch } = useForm<ProductSchemaType>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            description: "",
            costPrice: 0,
            discountPercentage: 0,
            discountPrice: 0,
            salePrice: 0,
            taxPercentage: 0,
            sku: "",
            stock: 0,
            stockAlert: 0,
            stockStatus: false,
            displayAvailability: false,
            weight: 0,
            width: 0,
            height: 0,
            depth: 0,
            freeShipping: false,
            slug: "",
            metaTitle: "",
            metaDescription: "",
        },
    });

    const costPrice = watch("costPrice");
    const salePrice = watch("salePrice");
    const discountPercentage = watch("discountPercentage");

    useEffect(() => {
        setValue(
            "discountPrice",
            calculateDiscountPrice({
                discountPercentage,
                salePrice,
                costPrice,
            }),
        );
    }, [costPrice, salePrice, discountPercentage, setValue]);

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

    const setErrors = (errors: Record<string, any>) => {
        Object.entries(errors).forEach(([key, value]: any[]) => setError(key, { message: value }));
    };

    const onSubmit = handleSubmit(async (data) => {
        setIsLoading(true);
        const response = await createEcommerceProduct(data);
        if (response.status == "success") {
            toaster.success("Product has been created");
            navigate(routes.apps.ecommerce.products.index);
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
        productCategories,
        handleCancel,
        handleChangeImage,
    };
};

const [useCreateEcommerceProduct, CreateEcommerceProductProvider] = createHookedContext(useHook);
export { useCreateEcommerceProduct, CreateEcommerceProductProvider };
