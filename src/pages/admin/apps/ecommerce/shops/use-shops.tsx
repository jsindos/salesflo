import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { deleteEcommerceShop } from "@/api/apps/ecommerce";
import { arrayHelper } from "@/helpers";
import { createHookedContext } from "@/hooks/create-hooked-context";
import { useToast } from "@/hooks/use-toast";
import { IEcommerceShop } from "@/types/apps/ecommerce";

type HookProp = {
    shops: IEcommerceShop[];
};

const useHook = ({ shops }: HookProp) => {
    const toaster = useToast();
    const [shopToBeDelete, setShopToBeDelete] = useState<IEcommerceShop>();
    const shopDeleteConfirmationRef = useRef<HTMLDialogElement>(null);
    const [selectedShopIds, setSelectedShopIds] = useState<IEcommerceShop["id"][]>([]);

    const { control: filterControl } = useForm({
        defaultValues: {
            verificationStatus: "default",
            search: "",
        },
    });

    const shopsSelectionStatus = useMemo(() => {
        if (selectedShopIds.length === 0) return "empty";

        if (shops.length === selectedShopIds.length) return "all";

        return "intermediate";
    }, [selectedShopIds]);

    const handleSelectShop = (id: IEcommerceShop["id"]) => {
        setSelectedShopIds([...arrayHelper.toggleItem(selectedShopIds, id)]);
    };

    const handleSelectAllShop = () => {
        if (shopsSelectionStatus === "all") {
            setSelectedShopIds([]);
        } else {
            setSelectedShopIds(shops.map((shop) => shop.id));
        }
    };

    const showDeleteShopConfirmation = (id: IEcommerceShop["id"]) => {
        shopDeleteConfirmationRef.current?.showModal();
        setShopToBeDelete(shops.find((shop) => shop.id === id));
    };

    const handleDeleteShop = async () => {
        if (shopToBeDelete) {
            const response = await deleteEcommerceShop(shopToBeDelete.id);
            if (response.status === "success") {
                setShopToBeDelete(undefined);
                toaster.success("Shop has been deleted");
            }
        }
    };

    return {
        shops,
        handleDeleteShop,
        filterControl,
        shopDeleteConfirmationRef,
        shopToBeDelete,
        showDeleteShopConfirmation,
        handleSelectShop,
        selectedShopIds,
        handleSelectAllShop,
        shopsSelectionStatus,
    };
};

const [useEcommerceShops, EcommerceShopsProvider] = createHookedContext(useHook);
export { useEcommerceShops, EcommerceShopsProvider };
