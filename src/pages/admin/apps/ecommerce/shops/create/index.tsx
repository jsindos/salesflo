import React, { useEffect, useState } from "react";

import { getEcommerceSellers } from "@/api/apps/ecommerce";
import { PageMetaData } from "@/components/PageMetaData";
import { PageTitle } from "@/components/PageTitle";
import { routes } from "@/lib/routes";
import { IEcommerceSeller } from "@/types/apps/ecommerce";

import { CreateEcommerceShop } from "./CreateShop";
import { CreateEcommerceShopProvider } from "./use-create-shop";

const EditShopPage = () => {
    const [sellers, setSellers] = useState<IEcommerceSeller[] | null>(null);

    useEffect(() => {
        getEcommerceSellers().then((rSellers) => {
            if (rSellers.status === "success") {
                setSellers(rSellers.data);
            }
        });
    }, []);

    return (
        <div>
            <PageMetaData title={"Create Shop"} />

            <PageTitle
                title={"Create Shop"}
                breadCrumbItems={[
                    { label: "Shops", path: routes.apps.ecommerce.shops.index },
                    { label: "Create", active: true },
                ]}
            />
            <div className="mt-5">
                {sellers && (
                    <CreateEcommerceShopProvider sellers={sellers}>
                        <CreateEcommerceShop />
                    </CreateEcommerceShopProvider>
                )}
            </div>
        </div>
    );
};

export default EditShopPage;
