import { dummyEcommerceData } from "@/database/apps/ecommerce";
import { IResponse, IResponseValidationError } from "@/types/actions";
import { IEcommerceProduct, IEcommerceProductCategory } from "@/types/apps/ecommerce";

export const getEcommerceProducts = async (): Promise<IResponse<IEcommerceProduct[]>> => {
    return {
        status: "success",
        data: dummyEcommerceData.getProducts(),
        code: 200,
    };
};

export const getEcommerceProduct = async (id: IEcommerceProduct["id"]): Promise<IResponse<IEcommerceProduct>> => {
    const product = dummyEcommerceData.getProductById(id);
    if (product)
        return {
            status: "success",
            data: { ...product, ...dummyEcommerceData.getProductById(id) },
            code: 200,
        };
    return {
        status: "error",
        errors: "Product not found",
        code: 404,
    };
};

export const createEcommerceProduct = async (
    data: Partial<IEcommerceProduct>,
): Promise<IResponse<boolean, IResponseValidationError>> => {
    return {
        status: "success",
        data: true,
        code: 200,
    };
};

export const editEcommerceProduct = async (
    id: IEcommerceProduct["id"],
    data: Partial<IEcommerceProduct>,
): Promise<IResponse<boolean, IResponseValidationError>> => {
    return {
        status: "success",
        data: true,
        code: 200,
    };
};

export const deleteEcommerceProduct = async (
    id: IEcommerceProduct["id"],
): Promise<IResponse<boolean, IResponseValidationError>> => {
    return {
        status: "success",
        data: true,
        code: 200,
    };
};

export const getProductCategories = async (): Promise<IResponse<IEcommerceProductCategory[]>> => {
    return {
        status: "success",
        data: dummyEcommerceData.getProductCategories(),
        code: 200,
    };
};
