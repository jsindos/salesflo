import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { deleteEcommerceSeller } from "@/api/apps/ecommerce";
import { arrayHelper } from "@/helpers";
import { createHookedContext } from "@/hooks/create-hooked-context";
import { useToast } from "@/hooks/use-toast";
import { IEcommerceSeller } from "@/types/apps/ecommerce";

type HookProp = {
    sellers: IEcommerceSeller[];
};

const useHook = ({ sellers }: HookProp) => {
    const toaster = useToast();
    const [sellerToBeDelete, setSellerToBeDelete] = useState<IEcommerceSeller>();
    const sellerDeleteConfirmationRef = useRef<HTMLDialogElement | null>(null);
    const [selectedSellerIds, setSelectedSellerIds] = useState<IEcommerceSeller["id"][]>([]);

    const { control: filterControl } = useForm({
        defaultValues: {
            verificationStatus: "default",
            search: "",
        },
    });

    const sellersSelectionStatus = useMemo(() => {
        if (selectedSellerIds.length === 0) return "empty";

        if (sellers.length === selectedSellerIds.length) return "all";

        return "intermediate";
    }, [selectedSellerIds]);

    const handleSelectSeller = (id: IEcommerceSeller["id"]) => {
        setSelectedSellerIds([...arrayHelper.toggleItem(selectedSellerIds, id)]);
    };

    const handleSelectAllSeller = () => {
        if (sellersSelectionStatus === "all") {
            setSelectedSellerIds([]);
        } else {
            setSelectedSellerIds(sellers.map(({ id }) => id));
        }
    };

    const showDeleteSellerConfirmation = (id: IEcommerceSeller["id"]) => {
        sellerDeleteConfirmationRef.current?.showModal();
        setSellerToBeDelete(sellers.find(({ id: sId }) => sId === id));
    };

    const handleDeleteSeller = async () => {
        if (sellerToBeDelete) {
            const response = await deleteEcommerceSeller(sellerToBeDelete.id);
            if (response.status === "success") {
                setSellerToBeDelete(undefined);
                toaster.success("Seller has been deleted");
            }
        }
    };

    return {
        sellers,
        handleDeleteSeller,
        filterControl,
        sellerDeleteConfirmationRef,
        sellerToBeDelete,
        showDeleteSellerConfirmation,
        handleSelectSeller,
        selectedSellerIds,
        handleSelectAllSeller,
        sellersSelectionStatus,
    };
};

const [useEcommerceSellers, EcommerceSellersProvider] = createHookedContext(useHook);
export { useEcommerceSellers, EcommerceSellersProvider };
