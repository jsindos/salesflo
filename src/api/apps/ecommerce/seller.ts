import { dummyEcommerceData } from "@/database/apps/ecommerce";
import { IResponse, IResponseValidationError } from "@/types/actions";
import { IEcommerceCreateSeller, IEcommerceSeller } from "@/types/apps/ecommerce";

export const getEcommerceSellers = async (): Promise<IResponse<IEcommerceSeller[]>> => {
    return {
        status: "success",
        data: dummyEcommerceData.getSellers(),
        code: 200,
    };
};

export const getEcommerceSeller = async (id: IEcommerceSeller["id"]): Promise<IResponse<IEcommerceSeller>> => {
    const seller = dummyEcommerceData.getSellerById(id);
    if (seller)
        return {
            status: "success",
            data: { ...seller },
            code: 200,
        };
    return {
        status: "error",
        errors: "Seller not found",
        code: 404,
    };
};

export const createEcommerceSeller = async (
    data: Partial<IEcommerceCreateSeller>,
): Promise<IResponse<boolean, IResponseValidationError>> => {
    return {
        status: "success",
        data: true,
        code: 200,
    };
};

export const editEcommerceSeller = async (
    id: IEcommerceSeller["id"],
    data: Partial<IEcommerceSeller>,
): Promise<IResponse<boolean, IResponseValidationError>> => {
    return {
        status: "success",
        data: true,
        code: 200,
    };
};

export const deleteEcommerceSeller = async (
    id: IEcommerceSeller["id"],
): Promise<IResponse<boolean, IResponseValidationError>> => {
    return {
        status: "success",
        data: true,
        code: 200,
    };
};

export const changeEcommerceSellerPassword = async (
    id: IEcommerceSeller["id"],
    data: string,
): Promise<IResponse<boolean, IResponseValidationError>> => {
    return {
        status: "success",
        data: true,
        code: 200,
    };
};
