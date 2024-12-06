import { dummyEcommerceData } from "@/database/apps/ecommerce";
import { IResponse } from "@/types/actions";
import { IEcommerceFullOrder, IEcommerceOrder } from "@/types/apps/ecommerce";

export const getEcommerceOrders = async (): Promise<IResponse<IEcommerceOrder[]>> => {
    return {
        status: "success",
        data: dummyEcommerceData.getOrders(),
        code: 200,
    };
};

export const getEcommerceFullOrder = async (): Promise<IResponse<IEcommerceFullOrder>> => {
    return {
        status: "success",
        data: dummyEcommerceData.getFullOrder(),
        code: 200,
    };
};
