import { dummyAuthData } from "@/database/auth";
import { IResponse, IResponseValidationError } from "@/types/actions";
import { IAuthUser } from "@/types/auth";

export const login = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}): Promise<IResponse<IAuthUser, IResponseValidationError>> => {
    const fakeUser = dummyAuthData.findUser({ email, password });
    if (fakeUser) {
        return {
            status: "success",
            code: 200,
            data: fakeUser,
        };
    }
    return {
        status: "error",
        code: 422,
        errors: {
            password: "Password incorrect",
        },
    };
};

export const register = async (_data: {
    username: string;
    email: string;
    password: string;
}): Promise<IResponse<string, IResponseValidationError>> => {
    return {
        status: "success",
        code: 200,
        data: "Registration successfully",
    };
};

export const forgotPassword = async (_data: {
    email: string;
}): Promise<IResponse<string, IResponseValidationError>> => {
    return {
        status: "success",
        code: 200,
        data: "The reset password link has been sent",
    };
};

export const resetPassword = async (_data: {
    password: string;
    confirmPassword: string;
}): Promise<IResponse<string, IResponseValidationError>> => {
    return {
        status: "success",
        code: 200,
        data: "Password has been changed",
    };
};

export const logout = async (): Promise<IResponse<boolean, boolean>> => {
    return { status: "success", data: true, code: 200 };
};
