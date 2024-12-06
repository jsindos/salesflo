import { useEffect, useState } from "react";

import { getEcommerceDashboardData } from "@/api/dashboards/ecommerce";
import { PageMetaData } from "@/components/PageMetaData";
import { PageTitle } from "@/components/PageTitle";
import { IEcommerceDashboardData } from "@/types/dashboards/ecommerce";

import { EcommerceDashboard } from "./EcommerceDashboard";
import { EcommerceDashboardProvider } from "./use-ecommerce-dashboard";

const EcommerceDashboardPage = () => {
  const [data, setData] = useState<IEcommerceDashboardData | null>(null);

  useEffect(() => {
    getEcommerceDashboardData().then((rData) => {
      if (rData.status === "success") {
        setData(rData.data);
      }
    });
  }, []);

  return (
    <div>
      <PageMetaData title={"Ecommerce Dashboard"} />

      <PageTitle
        title={"Business Overview"}
        breadCrumbItems={[
          { label: "Dashboards" },
          { label: "Ecommerce", active: true },
        ]}
      />
      <div className="mt-6">
        {data && (
          <EcommerceDashboardProvider data={data}>
            <EcommerceDashboard />
          </EcommerceDashboardProvider>
        )}
      </div>
    </div>
  );
};

export default EcommerceDashboardPage;
