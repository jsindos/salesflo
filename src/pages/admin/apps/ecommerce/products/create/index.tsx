import React, { useEffect, useState } from "react";

import { getProductCategories } from "@/api/apps/ecommerce";
import { PageMetaData } from "@/components/PageMetaData";
import { PageTitle } from "@/components/PageTitle";
import { routes } from "@/lib/routes";
import { IEcommerceProductCategory } from "@/types/apps/ecommerce";

import { CreateEcommerceProduct } from "./CreateProduct";
import { CreateEcommerceProductProvider } from "./use-create-product";

const CreateProductPage = () => {
    const [productCategories, setProductCategories] = useState<IEcommerceProductCategory[] | null>(null);

    useEffect(() => {
        getProductCategories().then((rProductCategory) => {
            if (rProductCategory.status === "success") {
                setProductCategories(rProductCategory.data);
            }
        });
    }, []);

    return (
        <div>
            <PageMetaData title={"Create Product"} />

            <PageTitle
                title={"Create Product"}
                breadCrumbItems={[
                    { label: "Products", path: routes.apps.ecommerce.products.index },
                    { label: "Create", active: true },
                ]}
            />
            <div className="mt-6">
                {productCategories && (
                    <CreateEcommerceProductProvider productCategories={productCategories}>
                        <CreateEcommerceProduct />
                    </CreateEcommerceProductProvider>
                )}
            </div>
        </div>
    );
};

export default CreateProductPage;
