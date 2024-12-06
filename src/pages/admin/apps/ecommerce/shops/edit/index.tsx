import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getEcommerceSellers, getEcommerceShop } from "@/api/apps/ecommerce";
import { PageMetaData } from "@/components/PageMetaData";
import { PageTitle } from "@/components/PageTitle";
import { routes } from "@/lib/routes";
import { IEcommerceSeller, IEcommerceShop } from "@/types/apps/ecommerce";

import { EditEcommerceShop } from "./EditShop";
import { EditEcommerceShopProvider } from "./use-edit-shop";

const EditShopPage = () => {
    let { id } = useParams();

    const [shop, setShop] = useState<IEcommerceShop | null>();
    const [sellers, setSellers] = useState<IEcommerceSeller[]>([]);

    useEffect(() => {
        Promise.allSettled([getEcommerceShop(Number.parseInt(id ?? "1")), getEcommerceSellers()]).then(
            ([rShop, rSellers]) => {
                if (rShop.status === "fulfilled" && rShop.value.status === "success") {
                    setShop(rShop.value.data);
                }
                if (rSellers.status === "fulfilled" && rSellers.value.status === "success") {
                    setSellers(rSellers.value.data);
                }
            },
        );
    }, []);

    return (
        <div>
            <PageMetaData title={"Edit Shop"} />

            <PageTitle
                title={"Edit Shop"}
                breadCrumbItems={[
                    { label: "Shops", path: routes.apps.ecommerce.shops.index },
                    { label: "Edit", active: true },
                ]}
            />
            <div className="mt-5">
                {shop && (
                    <EditEcommerceShopProvider sellers={sellers} shop={shop}>
                        <EditEcommerceShop />
                    </EditEcommerceShopProvider>
                )}
            </div>
        </div>
    );
};

export default EditShopPage;
