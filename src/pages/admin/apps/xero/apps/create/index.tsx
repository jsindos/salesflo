import { PageMetaData } from "@/components/PageMetaData";
import ConnectToXero from "./ConnectToXero";
import { PageTitle } from "@/components/PageTitle";

export default () => {
  return (
    <div>
      <PageMetaData title={"Create Xero App"} />

      <PageTitle title={"Create Xero App"} />
      <div className="mt-6">
        <div className="space-y-4">
          <ConnectToXero />
        </div>
      </div>
    </div>
  );
};
