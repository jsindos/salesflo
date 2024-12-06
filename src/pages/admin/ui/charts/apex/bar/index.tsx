import { PageMetaData } from "@/components/PageMetaData";
import { PageTitle } from "@/components/PageTitle";

import BarChartExample from "./BarChartExample";

const ChartPage = () => {
    return (
        <div>
            <PageMetaData title={"Apex Bar Charts"} />
            <PageTitle
                title={"Bar Charts"}
                breadCrumbItems={[{ label: "Apex Charts" }, { label: "Bar", active: true }]}
            />
            <div className="mt-6">
                <BarChartExample />
            </div>
        </div>
    );
};

export default ChartPage;
