import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getEcommerceSeller } from "@/api/apps/ecommerce";
import { PageMetaData } from "@/components/PageMetaData";
import { PageTitle } from "@/components/PageTitle";
import { routes } from "@/lib/routes";
import { IEcommerceSeller } from "@/types/apps/ecommerce";

import { EditEcommerceSeller } from "./EditSeller";
import { EditEcommerceSellerProvider } from "./use-edit-seller";

const EditSellerPage = () => {
    let { id } = useParams();

    const [seller, setSeller] = useState<IEcommerceSeller | null>(null);

    useEffect(() => {
        getEcommerceSeller(Number.parseInt(id ?? "1")).then((rSeller) => {
            if (rSeller.status === "success") {
                setSeller(rSeller.data);
            }
        });
    }, []);

    return (
        <div>
            <PageMetaData title={"Edit Seller"} />

            <PageTitle
                title={"Edit Seller"}
                breadCrumbItems={[
                    { label: "Sellers", path: routes.apps.ecommerce.sellers.index },
                    { label: "Edit", active: true },
                ]}
            />
            <div className="mt-5">
                {seller && (
                    <EditEcommerceSellerProvider seller={seller}>
                        <EditEcommerceSeller />
                    </EditEcommerceSellerProvider>
                )}
            </div>
        </div>
    );
};

export default EditSellerPage;
