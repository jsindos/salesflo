import { useCallback } from "react";

import {
    forgotPassword as forgotPasswordAction,
    login as loginAction,
    logout as logoutAction,
    register as registerAction,
    resetPassword as resetPasswordAction,
} from "@/api/auth";
import { createHookedContext } from "@/hooks/create-hooked-context";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { IAuthState } from "@/types/auth";

const useHook = () => {
    const [state, setState] = useLocalStorage<IAuthState>("__NEXUS_ADMIN_AUTH__", {});

    const updateState = (changes: Partial<IAuthState>) => {
        setState({
            ...state,
            ...changes,
        });
    };

    const isLoggedIn = useCallback(() => {
        return state.user != null;
    }, [state.user]);

    const login = async (data: { email: string; password: string }) => {
        const response = await loginAction(data);
        if (response.status == "success") {
            updateState({ user: response.data });
        }
        return response;
    };

    const register = async (data: { username: string; email: string; password: string }) => {
        return registerAction(data);
    };

    const forgotPassword = async (data: { email: string }) => {
        return forgotPasswordAction(data);
    };

    const resetPassword = async (data: { password: string; confirmPassword: string }) => {
        return resetPasswordAction(data);
    };

    const logout = async () => {
        const response = await logoutAction();
        if (response.status == "success") {
            updateState({
                user: undefined,
            });
        }
        return true;
    };

    return {
        state,
        isLoggedIn,
        login,
        register,
        forgotPassword,
        resetPassword,
        logout,
    };
};

const [useAuthContext, AuthContextProvider] = createHookedContext(useHook);

export { useAuthContext, AuthContextProvider };
