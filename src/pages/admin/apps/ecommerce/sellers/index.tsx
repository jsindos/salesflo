import { useEffect, useState } from "react";

import { getEcommerceSellers } from "@/api/apps/ecommerce";
import { PageMetaData } from "@/components/PageMetaData";
import { PageTitle } from "@/components/PageTitle";
import { IEcommerceSeller } from "@/types/apps/ecommerce";

import { EcommerceSellerTable } from "./SellerTable";
import { EcommerceSellersProvider } from "./use-sellers";

const EcommerceSellers = () => {
    const [sellers, setSellers] = useState<IEcommerceSeller[] | null>(null);
    useEffect(() => {
        getEcommerceSellers().then((rSeller) => {
            if (rSeller.status === "success") {
                setSellers(rSeller.data);
            }
        });
    }, []);

    return (
        <div>
            <PageMetaData title={"Sellers"} />

            <PageTitle
                title={"Sellers"}
                breadCrumbItems={[{ label: "Ecommerce" }, { label: "Sellers", active: true }]}
            />

            <div className="mt-5">
                {sellers && (
                    <EcommerceSellersProvider sellers={sellers}>
                        <EcommerceSellerTable />
                    </EcommerceSellersProvider>
                )}
            </div>
        </div>
    );
};

export default EcommerceSellers;
