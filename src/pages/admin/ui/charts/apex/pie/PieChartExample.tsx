import { ReactElement } from "react";

import { Card, CardBody } from "@/components/daisyui";

import DonutPatternChart from "./DonutPatternChart";
import GradientDonutChart from "./GradientDonutChart";
import MonochromePieChart from "./MonochromePieChart";
import SimplePieChart from "./SimplePieChart";

const SingleChart = ({ label, chartComponent }: { label: string; chartComponent: ReactElement }) => (
    <Card className="bg-base-100">
        <CardBody className="gap-3 pb-0">
            <p className="font-medium">{label}</p>
            {chartComponent}
        </CardBody>
    </Card>
);

const PieChartExample = () => {
    return (
        <>
            <div className="mt-6 grid gap-6 xl:grid-cols-2">
                <SingleChart label="Simple Pie" chartComponent={<SimplePieChart />} />
                <SingleChart label="Gradient Donut" chartComponent={<GradientDonutChart />} />
                <SingleChart label="Pattern Donut" chartComponent={<DonutPatternChart />} />
                <SingleChart label="Monochrome Pie" chartComponent={<MonochromePieChart />} />
            </div>
        </>
    );
};

export default PieChartExample;
