import { useEffect, useMemo, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import SimpleBarCore from "simplebar-core";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

import { Button, Menu, MenuDetails, MenuItem, MenuTitle } from "@/components/daisyui";

import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { cn, menuHelper } from "@/helpers";
import { routes } from "@/lib/routes";
import { IMenuItem } from "@/types/layout/admin";

const ProBadge = ({ url }: { url: string | undefined }) => {
    return <>{url != routes.dashboards.ecommerce && !url?.includes("/docs") && <div className="pro-badge">Pro</div>}</>;
};

const LeftMenuItem = ({ menuItem, activated }: { menuItem: IMenuItem; activated: Set<string> }) => {
    const { icon, isTitle, label, children, url } = menuItem;

    const selected = activated.has(menuItem.key);

    if (isTitle) {
        return <MenuTitle className="font-semibold">{label}</MenuTitle>;
    }

    if (!children) {
        return (
            <MenuItem className="mb-0.5">
                <Link
                    to={url ?? ""}
                    className={cn({
                        active: selected,
                    })}>
                    <div className="flex items-center gap-2">
                        {icon && <Icon icon={icon} fontSize={18} />}
                        {label}
                        <ProBadge url={url} />
                    </div>
                </Link>
            </MenuItem>
        );
    }

    return (
        <MenuItem className="mb-0.5">
            <MenuDetails
                open={selected}
                label={
                    <div className="flex items-center gap-2">
                        {icon && <Icon icon={icon} fontSize={18} />}
                        {label}
                        <ProBadge url={url} />
                    </div>
                }>
                {children.map((item, index) => (
                    <LeftMenuItem menuItem={item} key={index} activated={activated} />
                ))}
            </MenuDetails>
        </MenuItem>
    );
};

const Leftbar = ({ menuItems }: { menuItems: IMenuItem[] }) => {
    const { pathname } = useLocation();
    const scrollRef = useRef<SimpleBarCore | null>(null);

    const activatedParents = useMemo(
        () => new Set(menuHelper.getActivatedItemParentKeys(menuItems, pathname)),
        [pathname],
    );

    useEffect(() => {
        setTimeout(() => {
            const contentElement = scrollRef.current?.getContentElement();
            const scrollElement = scrollRef.current?.getScrollElement();
            if (contentElement) {
                const activatedItem = contentElement.querySelector<HTMLElement>(".active");
                const top = activatedItem?.getBoundingClientRect().top;
                if (activatedItem && scrollElement && top && top !== 0) {
                    scrollElement.scrollTo({ top: scrollElement.scrollTop + top - 300, behavior: "smooth" });
                }
            }
        }, 100);
    }, [activatedParents]);

    return (
        <div className="leftmenu-wrapper">
            <Link to={routes.home} className="flex h-16 items-center justify-center">
                <Logo />
            </Link>
            <SimpleBar ref={scrollRef} className="h-[calc(100vh-64px)] lg:h-[calc(100vh-230px)]">
                <Menu className="mb-6">
                    {menuItems.map((item, index) => (
                        <LeftMenuItem menuItem={item} key={index} activated={activatedParents} />
                    ))}
                </Menu>
            </SimpleBar>

            <div className={"mx-4 hidden rounded bg-base-200 px-3 py-4 lg:block"}>
                <p className="text-center text-base font-medium">Need Premium?</p>
                <p className="mt-3 text-center text-sm">Access all features with single time purchase</p>
                <div className="mt-3 text-center">
                    <Link to={routes.externalLinks.purchase} target={"_blank"}>
                        <Button color={"primary"} size={"sm"}>
                            Purchase
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export { Leftbar };
