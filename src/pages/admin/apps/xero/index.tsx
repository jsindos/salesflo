import { PageMetaData } from "@/components/PageMetaData";
import { PageTitle } from "@/components/PageTitle";

import { XeroWidget } from "../../dashboards/ecommerce/components/XeroWidget";

const XeroPage = () => {
  return (
    <div>
      <PageMetaData title={"Xero Hub"} />

      <PageTitle title={"Xero Hub"} />
      <div className="mt-6 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
        <XeroWidget />
      </div>
    </div>
  );
};

export default XeroPage;
