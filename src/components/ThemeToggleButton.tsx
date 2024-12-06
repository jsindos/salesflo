import moonIcon from "@iconify/icons-lucide/moon";
import sunIcon from "@iconify/icons-lucide/sun";

import { Button, ButtonProps } from "@/components/daisyui";

import { Icon } from "@/components/Icon";
import { useGlobalContext } from "@/contexts/global";

const ThemeToggleButton = (props: ButtonProps) => {
    const { state, changeThemeMode } = useGlobalContext();

    return (
        <>
            <Button
                {...props}
                onClick={() => changeThemeMode(state.theme.mode == "dark" ? "light" : "dark")}
                aria-label="Theme toggler">
                {state.theme.mode == "dark" && <Icon icon={sunIcon} fontSize={20} />}
                {state.theme.mode == "light" && <Icon icon={moonIcon} fontSize={20} />}
            </Button>
        </>
    );
};

export { ThemeToggleButton };
