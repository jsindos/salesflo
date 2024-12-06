import { PageMetaData } from "@/components/PageMetaData";
import { PageTitle } from "@/components/PageTitle";

import ChartExample from "./AreaChartExample";

const ChartPage = () => {
    return (
        <div>
            <PageMetaData title={"Apex Area Charts"} />

            <PageTitle
                title={"Area Charts"}
                breadCrumbItems={[{ label: "Apex Charts" }, { label: "Area", active: true }]}
            />

            <div className="mt-6">
                <ChartExample />
            </div>
        </div>
    );
};

export default ChartPage;
