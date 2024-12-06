import { useEffect, useState } from "react";

import { getEcommerceCustomers } from "@/api/apps/ecommerce";
import { PageMetaData } from "@/components/PageMetaData";
import { PageTitle } from "@/components/PageTitle";
import { IEcommerceCustomer } from "@/types/apps/ecommerce";

import { CustomerTable } from "./CustomerTable";
import { EcommerceCustomersProvider } from "./use-customers";

const EcommerceCustomers = () => {
    const [customers, setCustomers] = useState<IEcommerceCustomer[] | null>(null);
    useEffect(() => {
        getEcommerceCustomers().then((rCustomer) => {
            if (rCustomer.status === "success") {
                setCustomers(rCustomer.data);
            }
        });
    }, []);

    return (
        <div>
            <PageMetaData title={"Customers"} />

            <PageTitle
                title={"Customers"}
                breadCrumbItems={[{ label: "Ecommerce" }, { label: "Customers", active: true }]}
            />
            <div className="mt-5">
                {customers && (
                    <EcommerceCustomersProvider customers={customers}>
                        <CustomerTable />
                    </EcommerceCustomersProvider>
                )}
            </div>
        </div>
    );
};

export default EcommerceCustomers;
