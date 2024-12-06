import { dummyEcommerceDashboardData } from "@/database/dashboards/ecommerce";
import { IResponse } from "@/types/actions";
import { IEcommerceDashboardData } from "@/types/dashboards/ecommerce";

export const getEcommerceDashboardData = async (): Promise<IResponse<IEcommerceDashboardData>> => {
    return {
        status: "success",
        data: {
            counters: dummyEcommerceDashboardData.getCounters(),
            orders: dummyEcommerceDashboardData.getOrders(),
            recentMessages: dummyEcommerceDashboardData.getRecentMessages(),
            overviewStats: dummyEcommerceDashboardData.getOverviewStats(),
            topCountries: dummyEcommerceDashboardData.getTopCountries(),
            customerInteractions: dummyEcommerceDashboardData.getInteractions(),
        },
        code: 200,
    };
};
