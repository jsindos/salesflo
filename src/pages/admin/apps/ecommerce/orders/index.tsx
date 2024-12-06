import { useEffect, useState } from "react";

import { getEcommerceOrders, getProductCategories } from "@/api/apps/ecommerce";
import { PageMetaData } from "@/components/PageMetaData";
import { PageTitle } from "@/components/PageTitle";
import { IEcommerceOrder, IEcommerceProductCategory } from "@/types/apps/ecommerce";

import { OrderTable } from "./OrderTable";
import { EcommerceOrdersProvider } from "./use-orders";

const EcommerceOrdersPage = () => {
    const [orders, setOrders] = useState<IEcommerceOrder[] | null>(null);
    const [productCategories, setProductCategories] = useState<IEcommerceProductCategory[] | null>(null);

    useEffect(() => {
        Promise.allSettled([getEcommerceOrders(), getProductCategories()]).then(([rOrder, rProductCategory]) => {
            if (rOrder.status === "fulfilled") {
                if (rOrder.value.status === "success") {
                    setOrders(rOrder.value.data);
                }
            }

            if (rProductCategory.status === "fulfilled" && rProductCategory.value.status === "success") {
                setProductCategories(rProductCategory.value.data);
            }
        });
    }, []);

    return (
        <div>
            <PageMetaData title={"Orders"} />

            <PageTitle title={"Orders"} breadCrumbItems={[{ label: "Ecommerce" }, { label: "Orders", active: true }]} />
            <div className="mt-5">
                {orders && productCategories && (
                    <EcommerceOrdersProvider orders={orders} productCategories={productCategories}>
                        <OrderTable />
                    </EcommerceOrdersProvider>
                )}
            </div>
        </div>
    );
};

export default EcommerceOrdersPage;
