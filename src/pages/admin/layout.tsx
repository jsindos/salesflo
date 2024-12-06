import { LayoutContextProvider } from "@/contexts/layout";

import AdminLayout from "./(layout)";

const AdminLayoutWrapper = ({ children }: { children: any }) => {
    return (
        <LayoutContextProvider>
            <AdminLayout>{children}</AdminLayout>
        </LayoutContextProvider>
    );
};

export { AdminLayoutWrapper };
