import { useEffect, useMemo } from "react";

import { createHookedContext } from "@/hooks/create-hooked-context";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { ILayoutState } from "@/types/layout/admin";

const INIT_STATE: ILayoutState = {
    leftbar: {
        hide: false,
        type: "full",
    },
};

const useHook = () => {
    const [state, setState] = useLocalStorage<ILayoutState>("__NEXUS_ADMIN_LAYOUT__", INIT_STATE);

    const htmlRef = useMemo(() => {
        return typeof window !== "undefined" && document.querySelector("html");
    }, []);

    const updateState = (newState: Partial<ILayoutState>) => {
        setState({ ...state, ...newState });
    };

    useEffect(() => {
        const resizeFn = () => {
            const type = window.innerWidth < 1023 ? "mobile" : "full";
            updateState({
                leftbar: {
                    ...state.leftbar,
                    type,
                    hide: type == "mobile" ? true : state.leftbar.hide,
                },
            });
        };
        if (typeof window !== "undefined") {
            window.addEventListener("resize", resizeFn);
            resizeFn();
        }

        return () => window.removeEventListener("resize", resizeFn);
    }, []);

    useEffect(() => {
        if (htmlRef) {
            if (state.leftbar.hide) {
                htmlRef.setAttribute("data-leftbar-hide", "");
            } else {
                htmlRef.removeAttribute("data-leftbar-hide");
            }
            htmlRef.setAttribute("data-leftbar-type", state.leftbar.type);
        }
    }, [htmlRef, state]);

    const hideLeftbar = (hide: boolean = true) => {
        updateState({
            leftbar: {
                ...state.leftbar,
                hide: hide,
            },
        });
    };

    const hideMobileLeftbar = (hide: boolean = true) => {
        if (state.leftbar.type == "mobile")
            updateState({
                leftbar: {
                    ...state.leftbar,
                    hide: hide,
                },
            });
    };

    const reset = () => {
        setState(INIT_STATE);
    };

    return {
        state,
        hideLeftbar,
        hideMobileLeftbar,
        reset,
    };
};

const [useLayoutContext, LayoutContextProvider] = createHookedContext(useHook);

export { useLayoutContext, LayoutContextProvider };
