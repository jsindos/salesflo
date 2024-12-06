import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { arrayHelper } from "@/helpers";
import { createHookedContext } from "@/hooks/create-hooked-context";
import { IEcommerceOrder, IEcommerceProduct, IEcommerceProductCategory } from "@/types/apps/ecommerce";

type HookProp = {
    orders: IEcommerceOrder[];
    productCategories: IEcommerceProductCategory[];
};

const useHook = ({ orders, productCategories }: HookProp) => {
    const [selectedOrderIds, setSelectedOrderIds] = useState<IEcommerceProduct["id"][]>([]);

    const { control: filterControl } = useForm({
        defaultValues: {
            category: "default",
            search: "",
        },
    });

    const ordersSelectionStatus = useMemo(() => {
        if (selectedOrderIds.length === 0) return "empty";

        if (orders.length === selectedOrderIds.length) return "all";

        return "intermediate";
    }, [selectedOrderIds]);

    const handleSelectOrder = (id: IEcommerceProduct["id"]) => {
        setSelectedOrderIds([...arrayHelper.toggleItem(selectedOrderIds, id)]);
    };

    const handleSelectAllOrder = () => {
        if (ordersSelectionStatus === "all") {
            setSelectedOrderIds([]);
        } else {
            setSelectedOrderIds(orders.map((order) => order.id));
        }
    };

    return {
        orders,
        productCategories,
        filterControl,
        handleSelectOrder,
        selectedOrderIds,
        handleSelectAllOrder,
        ordersSelectionStatus,
    };
};

const [useEcommerceOrders, EcommerceOrdersProvider] = createHookedContext(useHook);
export { useEcommerceOrders, EcommerceOrdersProvider };
