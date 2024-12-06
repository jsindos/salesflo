import routeIcon from "@iconify/icons-lucide/route";

import { Button, maskClassesFn } from "@/components/daisyui";

import { Icon } from "@/components/Icon";
import { IEcommerceFullOrder } from "@/types/apps/ecommerce";

const OrderDeliveryPartner = ({ image, name, email }: IEcommerceFullOrder["deliveryPartner"]) => {
    return (
        <div className="flex items-center gap-3">
            <img
                src={image}
                height={40}
                width={40}
                className={`size-10 bg-base-content/10 ${maskClassesFn({ variant: "squircle" })}`}
                alt="Avatar"
            />
            <div className="grow">
                <p className="text-sm font-medium">{name}</p>
                <p className="text-sm text-base-content/80">{email}</p>
            </div>
            <div className="inline-flex gap-2">
                <Button
                    color="ghost"
                    size="sm"
                    className="hover:bg-primary/20 hover:text-primary"
                    startIcon={<Icon icon={routeIcon} fontSize={16} className="" />}>
                    Track
                </Button>
            </div>
        </div>
    );
};

export { OrderDeliveryPartner };
