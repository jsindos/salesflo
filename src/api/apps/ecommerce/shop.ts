import { dummyEcommerceData } from "@/database/apps/ecommerce";
import { IResponse, IResponseValidationError } from "@/types/actions";
import { IEcommerceCreateShop, IEcommerceShop } from "@/types/apps/ecommerce";

export const getEcommerceShops = async (): Promise<IResponse<IEcommerceShop[]>> => {
    return {
        status: "success",
        data: dummyEcommerceData.getShops(),
        code: 200,
    };
};

export const getEcommerceShop = async (id: IEcommerceShop["id"]): Promise<IResponse<IEcommerceShop>> => {
    const Shop = dummyEcommerceData.getShopById(id);
    if (Shop)
        return {
            status: "success",
            data: { ...Shop },
            code: 200,
        };
    return {
        status: "error",
        errors: "Shop not found",
        code: 404,
    };
};

export const createEcommerceShop = async (
    data: Partial<IEcommerceCreateShop>,
): Promise<IResponse<boolean, IResponseValidationError>> => {
    return {
        status: "success",
        data: true,
        code: 200,
    };
};

export const editEcommerceShop = async (
    id: IEcommerceShop["id"],
    data: Partial<IEcommerceShop>,
): Promise<IResponse<boolean, IResponseValidationError>> => {
    return {
        status: "success",
        data: true,
        code: 200,
    };
};

export const deleteEcommerceShop = async (
    id: IEcommerceShop["id"],
): Promise<IResponse<boolean, IResponseValidationError>> => {
    return {
        status: "success",
        data: true,
        code: 200,
    };
};
