import { PageMetaData } from "@/components/PageMetaData";
import { PageTitle } from "@/components/PageTitle";

import PieChartExample from "./PieChartExample";

const ChartPage = () => {
    return (
        <div>
            <PageMetaData title={"Apex Pie Charts"} />
            <PageTitle
                title={"Pie Charts"}
                breadCrumbItems={[{ label: "Apex Charts" }, { label: "Pie", active: true }]}
            />
            <div className="mt-6">
                <PieChartExample />
            </div>
        </div>
    );
};

export default ChartPage;
