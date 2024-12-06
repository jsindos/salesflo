import { ReactElement } from "react";

import { Card, CardBody } from "@/components/daisyui";

import BarWithMarkerChart from "./BarWithMarkerChart";
import GroupedBarChart from "./GroupedBarChart";
import NegativeValueBarChart from "./NegativeValueBarChart";
import StackedBarChart from "./StackedBarChart";

const SingleChart = ({ label, chartComponent }: { label: string; chartComponent: ReactElement }) => (
    <Card className="bg-base-100">
        <CardBody className="gap-3 pb-0">
            <p className="font-medium">{label}</p>
            {chartComponent}
        </CardBody>
    </Card>
);

const BarChartExample = () => {
    return (
        <>
            <div className="mt-6 grid gap-6 xl:grid-cols-2">
                <SingleChart label={"Bar With Goals"} chartComponent={<BarWithMarkerChart />} />
                <SingleChart label={"Grouped Bar"} chartComponent={<GroupedBarChart />} />
                <SingleChart label={"Stacked Bar"} chartComponent={<StackedBarChart />} />
                <SingleChart label={"Negative Value"} chartComponent={<NegativeValueBarChart />} />
            </div>
        </>
    );
};

export default BarChartExample;
