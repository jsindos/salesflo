import { dummyEcommerceData } from "@/database/apps/ecommerce";
import { IResponse, IResponseValidationError } from "@/types/actions";
import { IEcommerceCreateCustomer, IEcommerceCustomer } from "@/types/apps/ecommerce";

export const getEcommerceCustomers = async (): Promise<IResponse<IEcommerceCustomer[]>> => {
    return {
        status: "success",
        data: dummyEcommerceData.getCustomers(),
        code: 200,
    };
};

export const getEcommerceCustomer = async (id: IEcommerceCustomer["id"]): Promise<IResponse<IEcommerceCustomer>> => {
    const customer = dummyEcommerceData.getCustomerById(id);
    if (customer)
        return {
            status: "success",
            data: { ...customer },
            code: 200,
        };
    return {
        status: "error",
        errors: "Customer not found",
        code: 404,
    };
};

export const createEcommerceCustomer = async (
    data: Partial<IEcommerceCreateCustomer>,
): Promise<IResponse<boolean, IResponseValidationError>> => {
    return {
        status: "success",
        data: true,
        code: 200,
    };
};

export const editEcommerceCustomer = async (
    id: IEcommerceCustomer["id"],
    data: Partial<IEcommerceCustomer>,
): Promise<IResponse<boolean, IResponseValidationError>> => {
    return {
        status: "success",
        data: true,
        code: 200,
    };
};

export const deleteEcommerceCustomer = async (
    id: IEcommerceCustomer["id"],
): Promise<IResponse<boolean, IResponseValidationError>> => {
    return {
        status: "success",
        data: true,
        code: 200,
    };
};

export const changeEcommerceCustomerPassword = async (
    id: IEcommerceCustomer["id"],
    data: string,
): Promise<IResponse<boolean, IResponseValidationError>> => {
    return {
        status: "success",
        data: true,
        code: 200,
    };
};
