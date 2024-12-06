import { useMemo, useState } from "react";

import { arrayHelper } from "@/helpers";
import { createHookedContext } from "@/hooks/create-hooked-context";
import {
    IEcommerceDashboardData,
    IEcommerceDashboardOrder,
    IEcommerceDashboardRevenueDuration,
} from "@/types/dashboards/ecommerce";

const useHook = ({ data }: { data: IEcommerceDashboardData }) => {
    const { orders, counters, recentMessages, topCountries, customerInteractions, overviewStats } = data;
    const [overviewDuration, setOverviewDuration] = useState<IEcommerceDashboardRevenueDuration>("year");
    const [orderTableSelected, setOrderTableSelected] = useState<Array<IEcommerceDashboardOrder["id"]>>([]);

    const onOrderTableSelection = (id: IEcommerceDashboardOrder["id"]) => {
        setOrderTableSelected([...arrayHelper.toggleItem(orderTableSelected, id)]);
    };

    const onOrderTableAllSelection = () => {
        if (orderTableSelectionState == "all") {
            setOrderTableSelected([]);
        } else {
            setOrderTableSelected(data.orders.map((order) => order.id));
        }
    };

    const orderTableSelectionState: "none" | "all" | "indeterminate" = useMemo(() => {
        if (orderTableSelected.length == 0) return "none";
        if (orderTableSelected.length == orders.length) {
            return "all";
        }
        return "indeterminate";
    }, [orderTableSelected]);

    const overviewStat = useMemo(() => overviewStats[overviewDuration], [overviewDuration]);

    return {
        orderTableSelected,
        orderTableSelectionState,
        counters,
        orders,
        customerInteractions,
        recentMessages,
        overviewStat,
        overviewDuration,
        topCountries,
        setOverviewDuration,
        onOrderTableSelection,
        onOrderTableAllSelection,
    };
};

const [useEcommerceDashboard, EcommerceDashboardProvider] = createHookedContext(useHook);
export { useEcommerceDashboard, EcommerceDashboardProvider };
