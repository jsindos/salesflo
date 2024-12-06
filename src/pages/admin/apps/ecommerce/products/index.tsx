import { useEffect, useState } from "react";

import { getEcommerceProducts, getProductCategories } from "@/api/apps/ecommerce";
import { PageMetaData } from "@/components/PageMetaData";
import { PageTitle } from "@/components/PageTitle";
import { IEcommerceProduct, IEcommerceProductCategory } from "@/types/apps/ecommerce";

import { EcommerceProductTable } from "./ProductTable";
import { EcommerceProductsProvider } from "./use-products";

const EcommerceProducts = () => {
    const [products, setProducts] = useState<IEcommerceProduct[] | null>(null);
    const [productCategories, setProductCategories] = useState<IEcommerceProductCategory[] | null>(null);

    useEffect(() => {
        Promise.allSettled([getEcommerceProducts(), getProductCategories()]).then(([rOrder, rProductCategory]) => {
            if (rOrder.status === "fulfilled") {
                if (rOrder.value.status === "success") {
                    setProducts(rOrder.value.data);
                }
            }

            if (rProductCategory.status === "fulfilled" && rProductCategory.value.status === "success") {
                setProductCategories(rProductCategory.value.data);
            }
        });
    }, []);

    return (
        <div>
            <PageMetaData title={"Products"} />

            <PageTitle
                title={"Products"}
                breadCrumbItems={[{ label: "Ecommerce" }, { label: "Products", active: true }]}
            />

            <div className="mt-5">
                {products && productCategories && (
                    <EcommerceProductsProvider products={products} productCategories={productCategories}>
                        <EcommerceProductTable />
                    </EcommerceProductsProvider>
                )}
            </div>
        </div>
    );
};

export default EcommerceProducts;
