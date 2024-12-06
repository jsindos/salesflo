import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { deleteEcommerceProduct } from "@/api/apps/ecommerce";
import { arrayHelper } from "@/helpers";
import { createHookedContext } from "@/hooks/create-hooked-context";
import { useToast } from "@/hooks/use-toast";
import { IEcommerceProduct, IEcommerceProductCategory } from "@/types/apps/ecommerce";

type HookProp = {
    products: IEcommerceProduct[];
    productCategories: IEcommerceProductCategory[];
};

const useHook = ({ products, productCategories }: HookProp) => {
    const toaster = useToast();
    const [productToBeDelete, setProductToBeDelete] = useState<IEcommerceProduct>();
    const productDeleteConfirmationRef = useRef<HTMLDialogElement | null>(null);
    const [selectedProductIds, setSelectedProductIds] = useState<IEcommerceProduct["id"][]>([]);

    const { control: filterControl } = useForm({
        defaultValues: {
            category: "default",
            search: "",
        },
    });

    const productsSelectionStatus = useMemo(() => {
        if (selectedProductIds.length === 0) return "empty";

        if (products.length === selectedProductIds.length) return "all";

        return "intermediate";
    }, [selectedProductIds]);

    const handleSelectProduct = (id: IEcommerceProduct["id"]) => {
        setSelectedProductIds([...arrayHelper.toggleItem(selectedProductIds, id)]);
    };

    const handleSelectAllProduct = () => {
        if (productsSelectionStatus === "all") {
            setSelectedProductIds([]);
        } else {
            setSelectedProductIds(products.map((p) => p.id));
        }
    };

    const showDeleteProductConfirmation = (id: IEcommerceProduct["id"]) => {
        productDeleteConfirmationRef.current?.showModal();
        setProductToBeDelete(products.find((p) => id === p.id));
    };

    const handleDeleteProduct = async () => {
        if (productToBeDelete) {
            const response = await deleteEcommerceProduct(productToBeDelete.id);
            if (response.status === "success") {
                setProductToBeDelete(undefined);
                toaster.success("Product has been deleted");
            }
        }
    };

    return {
        products,
        productCategories,
        handleDeleteProduct,
        filterControl,
        productDeleteConfirmationRef,
        productToBeDelete,
        showDeleteProductConfirmation,
        handleSelectProduct,
        selectedProductIds,
        handleSelectAllProduct,
        productsSelectionStatus,
    };
};

const [useEcommerceProducts, EcommerceProductsProvider] = createHookedContext(useHook);
export { useEcommerceProducts, EcommerceProductsProvider };
