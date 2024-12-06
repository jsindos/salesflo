import { PageMetaData } from "@/components/PageMetaData";
import { PageTitle } from "@/components/PageTitle";

import LineChartExample from "./LineChartExample";

const ChartPage = () => {
    return (
        <div>
            <PageMetaData title={"Apex Line Charts"} />
            <PageTitle
                title={"Line Charts"}
                breadCrumbItems={[{ label: "Apex Charts" }, { label: "Line", active: true }]}
            />
            <div className="mt-6">
                <LineChartExample />
            </div>
        </div>
    );
};

export default ChartPage;
