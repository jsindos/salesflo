import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getEcommerceProduct, getProductCategories } from "@/api/apps/ecommerce";
import { PageMetaData } from "@/components/PageMetaData";
import { PageTitle } from "@/components/PageTitle";
import { routes } from "@/lib/routes";
import { IEcommerceProduct, IEcommerceProductCategory } from "@/types/apps/ecommerce";

import { EditEcommerceProduct } from "./EditProduct";
import { EditEcommerceProductProvider } from "./use-edit-product";

const EditProductPage = () => {
    let { id } = useParams();

    const [product, setProduct] = useState<IEcommerceProduct | null>();
    const [productCategories, setProductCategories] = useState<IEcommerceProductCategory[]>([]);

    useEffect(() => {
        Promise.allSettled([getEcommerceProduct(Number.parseInt(id ?? "1")), getProductCategories()]).then(
            ([rProduct, rProductCategory]) => {
                if (rProduct.status === "fulfilled" && rProduct.value.status === "success") {
                    setProduct(rProduct.value.data);
                }
                if (rProductCategory.status === "fulfilled" && rProductCategory.value.status === "success") {
                    setProductCategories(rProductCategory.value.data);
                }
            },
        );
    }, []);

    return (
        <div>
            <PageMetaData title={"Edit Product"} />

            <PageTitle
                title={"Edit Product"}
                breadCrumbItems={[
                    { label: "Products", path: routes.apps.ecommerce.products.index },
                    { label: "Edit", active: true },
                ]}
            />
            <div className="mt-5">
                {product && (
                    <EditEcommerceProductProvider product={product} productCategories={productCategories}>
                        <EditEcommerceProduct />
                    </EditEcommerceProductProvider>
                )}
            </div>
        </div>
    );
};

export default EditProductPage;
