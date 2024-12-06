import { Card, CardBody } from "@/components/daisyui";

import { IEcommerceFullOrder } from "@/types/apps/ecommerce";

import { OrderCustomerDetail } from "./components/CustomerDetail";
import { OrderDeliveryAddress } from "./components/DeliveryAddress";
import { OrderDeliveryPartner } from "./components/DeliveryPartner";
import { OrderItems } from "./components/OrderItems";
import { OrderTrack } from "./components/OrderTrack";
import { OrderPaymentDetail } from "./components/PaymentDetail";

const OrderDetail = ({ order }: { order: IEcommerceFullOrder }) => {
    return (
        <div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                <div className="lg:col-span-8 2xl:col-span-9">
                    <OrderItems order={order} />
                    <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2 2xl:grid-cols-3">
                        <div>
                            <OrderPaymentDetail {...order.payment} />
                        </div>
                        <div>
                            <OrderCustomerDetail {...order.customer} />
                        </div>
                        <div>
                            <OrderDeliveryAddress {...order.address} />
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-4 2xl:col-span-3">
                    <Card className="bg-base-100">
                        <CardBody className="gap-0">
                            <p className="rounded-box bg-base-content/5 px-3 py-2 font-medium">Track Order</p>
                            <div className="mt-2">
                                <OrderTrack />
                            </div>
                            <p className="mt-3 rounded-box bg-base-content/5 px-3 py-2 font-medium">Delivery Partner</p>
                            <div className="mt-3">
                                <OrderDeliveryPartner {...order.deliveryPartner} />
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export { OrderDetail };
