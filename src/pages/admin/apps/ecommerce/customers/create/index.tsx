import React from "react";

import { PageMetaData } from "@/components/PageMetaData";
import { PageTitle } from "@/components/PageTitle";
import { routes } from "@/lib/routes";

import { CreateEcommerceCustomer } from "./CreateCustomer";
import { CreateEcommerceCustomerProvider } from "./use-create-customer";

const CreateCustomerPage = () => {
    return (
        <div>
            <PageMetaData title={"Create Customer"} />

            <PageTitle
                title={"Create Customer"}
                breadCrumbItems={[
                    { label: "Customers", path: routes.apps.ecommerce.customers.index },
                    { label: "Create", active: true },
                ]}
            />
            <div className="mt-5">
                <CreateEcommerceCustomerProvider>
                    <CreateEcommerceCustomer />
                </CreateEcommerceCustomerProvider>
            </div>
        </div>
    );
};

export default CreateCustomerPage;
