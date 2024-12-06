import airplayIcon from "@iconify/icons-lucide/airplay";
import chevronLeftIcon from "@iconify/icons-lucide/chevron-left";
import chevronRightIcon from "@iconify/icons-lucide/chevron-right";
import eyeIcon from "@iconify/icons-lucide/eye";
import searchIcon from "@iconify/icons-lucide/search";

import { Link } from "react-router-dom";

import {
    Badge,
    Button,
    Card,
    CardBody,
    Checkbox,
    Pagination,
    Table,
    TableBody,
    TableHead,
    TableRow,
} from "@/components/daisyui";

import { Icon } from "@/components/Icon";
import { FormInput, FormSelect } from "@/components/forms";
import { cn, currencyHelper, dateHelper, stringHelper } from "@/helpers";
import { routes } from "@/lib/routes";
import { IEcommerceOrder } from "@/types/apps/ecommerce";

import { useEcommerceOrders } from "./use-orders";

const OrderRow = ({ order }: { order: IEcommerceOrder }) => {
    const { handleSelectOrder, selectedOrderIds } = useEcommerceOrders();
    const { id, itemsCount, amount, customer, paymentStatus, date, status } = order;

    return (
        <>
            <TableRow className="cursor-pointer hover:bg-base-200/40" onClick={() => handleSelectOrder(id)}>
                <Checkbox
                    size={"xs"}
                    checked={selectedOrderIds.includes(id)}
                    aria-label="Single check"
                    onChange={() => {}}
                />
                <div className="font-medium">#{id}</div>
                <div className="flex items-center space-x-3 truncate">
                    <div className="font-medium">{itemsCount} Items</div>
                </div>
                <div className="font-medium">{customer}</div>
                <div className="text-sm font-medium">
                    {currencyHelper.sign}
                    {amount}
                </div>

                <div className="flex items-center gap-2">
                    <Badge
                        className={cn("border-0 font-medium capitalize", {
                            "bg-error/10 text-error": paymentStatus == "unpaid",
                            "bg-success/10 text-success": paymentStatus == "paid",
                        })}>
                        {paymentStatus}
                    </Badge>
                </div>
                <div className="text-sm capitalize">{stringHelper.snackToNormal(status)}</div>
                <div className="text-sm">{dateHelper.formatted(date)}</div>
                <Link to={routes.apps.ecommerce.orders.show(id)} aria-label={"Show order link"}>
                    <Button color="ghost" size="sm" shape={"square"} aria-label={"Show order"}>
                        <Icon icon={eyeIcon} className="text-base-content/70" fontSize={16} />
                    </Button>
                </Link>
            </TableRow>
        </>
    );
};

const OrderTable = () => {
    const { orders, productCategories, filterControl, ordersSelectionStatus, handleSelectAllOrder } =
        useEcommerceOrders();

    return (
        <Card className="mt-5 bg-base-100">
            <CardBody className={"p-0"}>
                <div className="flex items-center justify-between px-5 pt-5">
                    <div className="inline-flex items-center gap-3">
                        <FormInput
                            startIcon={<Icon icon={searchIcon} className="text-base-content/60" fontSize={15} />}
                            size="sm"
                            placeholder="Search along orders"
                            bordered={false}
                            borderOffset={false}
                            control={filterControl}
                            name="search"
                            className="w-full focus:border-transparent focus:outline-0"
                        />
                        <div className="hidden sm:block">
                            <FormSelect
                                control={filterControl}
                                instanceId="category"
                                name={"category"}
                                size="sm"
                                id="category"
                                className="w-full border-0 text-base"
                                options={productCategories.map((product) => ({
                                    label: product.title,
                                    value: product.id,
                                }))}
                                placeholder={"Category"}
                            />
                        </div>
                    </div>
                    <div className="inline-flex items-center gap-3">
                        <Link to={routes.dashboards.ecommerce}>
                            <Button startIcon={<Icon icon={airplayIcon} fontSize={18} />} size={"sm"} color={"primary"}>
                                Dashboard
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="overflow-auto">
                    <Table className="mt-2 rounded-box">
                        <TableHead>
                            <Checkbox
                                size={"xs"}
                                indeterminate={ordersSelectionStatus === "intermediate"}
                                checked={ordersSelectionStatus === "all"}
                                onChange={() => handleSelectAllOrder()}
                                aria-label="Check all"
                            />
                            <span className="text-sm font-medium text-base-content/80">ID</span>
                            <span className="text-sm font-medium text-base-content/80">Name</span>
                            <span className="text-sm font-medium text-base-content/80">Customer</span>
                            <span className="text-sm font-medium text-base-content/80">Price</span>
                            <span className="text-sm font-medium text-base-content/80">Payment</span>
                            <span className="text-sm font-medium text-base-content/80">Status</span>
                            <span className="text-sm font-medium text-base-content/80">Ordered At</span>
                            <span className="text-sm font-medium text-base-content/80">Action</span>
                        </TableHead>

                        <TableBody>
                            {orders.map((order, index) => (
                                <OrderRow order={order} key={index} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-end px-5 pb-5 pt-3">
                    <Pagination>
                        <Button
                            size="sm"
                            aria-label="pagination-prev"
                            className="join-item"
                            startIcon={<Icon icon={chevronLeftIcon} fontSize={16} />}></Button>
                        <Button size="sm" className="join-item" active color="primary" aria-label="pagination-1">
                            1
                        </Button>
                        <Button size="sm" className="join-item" aria-label="pagination-2">
                            2
                        </Button>
                        <Button
                            size="sm"
                            aria-label="pagination-next"
                            className="join-item"
                            startIcon={<Icon icon={chevronRightIcon} fontSize={16} />}></Button>
                    </Pagination>
                </div>
            </CardBody>
        </Card>
    );
};

export { OrderTable };
