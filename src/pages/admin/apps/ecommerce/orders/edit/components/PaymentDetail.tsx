import arrowLeftRightIcon from "@iconify/icons-lucide/arrow-left-right";
import creditCardIcon from "@iconify/icons-lucide/credit-card";

import { Badge, Button, Card, CardBody } from "@/components/daisyui";

import { Icon } from "@/components/Icon";
import { cn, dateHelper } from "@/helpers";
import { IEcommerceFullOrder } from "@/types/apps/ecommerce";

const OrderPaymentDetail = ({ status, expiryDate, cardNumber }: IEcommerceFullOrder["payment"]) => {
    return (
        <Card className="bg-base-100">
            <CardBody>
                <p className="rounded-box bg-base-content/5 px-3 py-2 text-base font-medium">Payment Information</p>
                <div className="mt-2 flex gap-3">
                    <Icon icon={creditCardIcon} className="text-base-content/80" fontSize={24} />
                    <div className="grow">
                        <p className="font-medium">Ends with {cardNumber}</p>
                        <p className="text-sm text-base-content/80">
                            Expired at {dateHelper.formatted(expiryDate, { format: "MM/YY" })}
                        </p>
                    </div>
                    <Badge
                        className={cn("font-medium capitalize", {
                            "bg-success/20 text-success": status == "paid",
                            "bg-error/20 text-error": status == "unpaid",
                        })}>
                        {status}
                    </Badge>
                </div>
                <div className="text-end">
                    <Button
                        color="ghost"
                        size="sm"
                        className="hover:bg-primary/20 hover:text-primary"
                        startIcon={<Icon icon={arrowLeftRightIcon} fontSize={16} />}>
                        Transactions
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
};

export { OrderPaymentDetail };
