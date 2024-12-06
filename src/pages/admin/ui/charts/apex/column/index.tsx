import { PageMetaData } from "@/components/PageMetaData";
import { PageTitle } from "@/components/PageTitle";

import ColumnChartExample from "./ColumnChartExample";

const ChartPage = () => {
    return (
        <div>
            <PageMetaData title={"Apex Column Charts"} />
            <PageTitle
                title={"Column Charts"}
                breadCrumbItems={[{ label: "Apex Charts" }, { label: "Column", active: true }]}
            />
            <div className="mt-6">
                <ColumnChartExample />
            </div>
        </div>
    );
};

export default ChartPage;
