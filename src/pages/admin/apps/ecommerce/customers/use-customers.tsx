import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { deleteEcommerceCustomer } from "@/api/apps/ecommerce";
import { arrayHelper } from "@/helpers";
import { createHookedContext } from "@/hooks/create-hooked-context";
import { useToast } from "@/hooks/use-toast";
import { IEcommerceCustomer } from "@/types/apps/ecommerce";

type HookProp = {
    customers: IEcommerceCustomer[];
};

const useHook = ({ customers }: HookProp) => {
    const toaster = useToast();
    const [customerToBeDelete, setCustomerToBeDelete] = useState<IEcommerceCustomer>();
    const customerDeleteConfirmationRef = useRef<HTMLDialogElement | null>(null);
    const [selectedCustomerIds, setSelectedCustomerIds] = useState<IEcommerceCustomer["id"][]>([]);

    const { control: filterControl } = useForm({
        defaultValues: {
            verificationStatus: "default",
            search: "",
        },
    });

    const customersSelectionStatus = useMemo(() => {
        if (selectedCustomerIds.length === 0) return "empty";

        if (customers.length === selectedCustomerIds.length) return "all";

        return "intermediate";
    }, [selectedCustomerIds]);

    const handleSelectCustomer = (id: IEcommerceCustomer["id"]) => {
        setSelectedCustomerIds([...arrayHelper.toggleItem(selectedCustomerIds, id)]);
    };

    const handleSelectAllCustomer = () => {
        if (customersSelectionStatus === "all") {
            setSelectedCustomerIds([]);
        } else {
            setSelectedCustomerIds(customers.map((c) => c.id));
        }
    };

    const showDeleteCustomerConfirmation = (id: IEcommerceCustomer["id"]) => {
        customerDeleteConfirmationRef.current?.showModal();
        setCustomerToBeDelete(customers.find(({ id: cId }) => cId === id));
    };

    const handleDeleteCustomer = async () => {
        if (customerToBeDelete) {
            const response = await deleteEcommerceCustomer(customerToBeDelete.id);
            if (response.status === "success") {
                setCustomerToBeDelete(undefined);
                toaster.success("Customer has been deleted");
            }
        }
    };

    return {
        customers,
        filterControl,
        customerDeleteConfirmationRef,
        customerToBeDelete,
        selectedCustomerIds,
        customersSelectionStatus,
        showDeleteCustomerConfirmation,
        handleSelectCustomer,
        handleSelectAllCustomer,
        handleDeleteCustomer,
    };
};

const [useEcommerceCustomers, EcommerceCustomersProvider] = createHookedContext(useHook);
export { useEcommerceCustomers, EcommerceCustomersProvider };
