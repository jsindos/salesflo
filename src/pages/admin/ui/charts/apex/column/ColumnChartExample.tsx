import { ReactElement } from "react";

import { Card, CardBody } from "@/components/daisyui";

import DumbbellColumnChart from "./DumbbellColumnChart";
import DynamicLoadingColumnChart from "./DynamicLoadingColumnChart";
import RangeColumnChart from "./RangeColumnChart";
import StackedColumnChart from "./StackedColumnChart";

const SingleChart = ({ label, chartComponent }: { label: string; chartComponent: ReactElement }) => (
    <Card className="bg-base-100">
        <CardBody className="gap-3 pb-0">
            <p className="font-medium">{label}</p>
            {chartComponent}
        </CardBody>
    </Card>
);

const ColumnChartExample = () => {
    return (
        <>
            <div className="mt-6 grid gap-6 xl:grid-cols-2">
                <SingleChart label={"Stacked Column"} chartComponent={<StackedColumnChart />} />
                <SingleChart label={"Dumbbell Column"} chartComponent={<DumbbellColumnChart />} />
                <SingleChart label={"Range Column"} chartComponent={<RangeColumnChart />} />
                <SingleChart label={"Dynamic Desaturate Column"} chartComponent={<DynamicLoadingColumnChart />} />
            </div>
        </>
    );
};

export default ColumnChartExample;
