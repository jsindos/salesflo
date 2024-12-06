import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getEcommerceCustomer } from "@/api/apps/ecommerce";
import { PageMetaData } from "@/components/PageMetaData";
import { PageTitle } from "@/components/PageTitle";
import { routes } from "@/lib/routes";
import { IEcommerceCustomer } from "@/types/apps/ecommerce";

import { EditEcommerceCustomer } from "./EditCustomer";
import { EditEcommerceCustomerProvider } from "./use-edit-customer";

const EditCustomerPage = () => {
    let { id } = useParams();

    const [customer, setCustomer] = useState<IEcommerceCustomer | null>(null);

    useEffect(() => {
        getEcommerceCustomer(Number.parseInt(id ?? "1")).then((rCustomer) => {
            if (rCustomer.status === "success") {
                setCustomer(rCustomer.data);
            }
        });
    }, []);

    return (
        <div>
            <PageMetaData title={"Edit Customer"} />

            <PageTitle
                title={"Edit Customer"}
                breadCrumbItems={[
                    { label: "Customers", path: routes.apps.ecommerce.customers.index },
                    { label: "Edit", active: true },
                ]}
            />
            <div className="mt-5">
                {customer && (
                    <EditEcommerceCustomerProvider customer={customer}>
                        <EditEcommerceCustomer />
                    </EditEcommerceCustomerProvider>
                )}
            </div>
        </div>
    );
};

export default EditCustomerPage;
