import { useEffect, useState } from "react";

import { getEcommerceShops } from "@/api/apps/ecommerce/shop";
import { PageMetaData } from "@/components/PageMetaData";
import { PageTitle } from "@/components/PageTitle";
import { IEcommerceShop } from "@/types/apps/ecommerce";

import { EcommerceShopTable } from "./ShopTable";
import { EcommerceShopsProvider } from "./use-shops";

const EcommerceShops = () => {
    const [shops, setShops] = useState<IEcommerceShop[] | null>(null);
    useEffect(() => {
        getEcommerceShops().then((rShop) => {
            if (rShop.status === "success") {
                setShops(rShop.data);
            }
        });
    }, []);

    return (
        <div>
            <PageMetaData title={"Shops"} />

            <PageTitle title={"Shops"} breadCrumbItems={[{ label: "Ecommerce" }, { label: "Shops", active: true }]} />

            <div className="mt-5">
                {shops && (
                    <EcommerceShopsProvider shops={shops}>
                        <EcommerceShopTable />
                    </EcommerceShopsProvider>
                )}
            </div>
        </div>
    );
};

export default EcommerceShops;
