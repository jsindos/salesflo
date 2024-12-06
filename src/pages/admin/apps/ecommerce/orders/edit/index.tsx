import { useEffect, useState } from "react";

import { getEcommerceFullOrder } from "@/api/apps/ecommerce";
import { PageMetaData } from "@/components/PageMetaData";
import { PageTitle } from "@/components/PageTitle";
import { routes } from "@/lib/routes";
import { IEcommerceFullOrder } from "@/types/apps/ecommerce";

import { OrderDetail } from "./OrderDetail";

const EcommerceOrderPage = () => {
    const [order, setOrder] = useState<IEcommerceFullOrder | null>(null);
    useEffect(() => {
        getEcommerceFullOrder().then((rOrder) => {
            if (rOrder.status === "success") {
                setOrder(rOrder.data);
            }
        });
    }, []);

    return (
        <>
            <PageMetaData title={"Order Detail"} />
            <PageTitle
                title={"Order Detail"}
                breadCrumbItems={[
                    { label: "Orders", path: routes.apps.ecommerce.orders.index },
                    { label: "Detail", active: true },
                ]}
            />
            {order && (
                <div className="mt-5">
                    <OrderDetail order={order} />;
                </div>
            )}
        </>
    );
};

export default EcommerceOrderPage;
