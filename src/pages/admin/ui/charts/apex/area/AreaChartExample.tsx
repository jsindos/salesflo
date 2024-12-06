import { ReactElement } from "react";

import { Card, CardBody, CardTitle } from "@/components/daisyui";

import AreaIrregularTimeSeriesChart from "./AreaIrregularTimeSeriesChart";
import AreaNegativeValueChart from "./AreaNegativeValueChart";
import AreaSelectionChart from "./AreaSelectionChart";
import AreaSplineChart from "./AreaSplineChart";

const ChartExample = ({ title, Chart }: { title: string; Chart: ReactElement }) => (
    <Card className="bg-base-100">
        <CardBody className="gap-3 pb-0">
            <CardTitle>{title}</CardTitle>
            {Chart}
        </CardBody>
    </Card>
);

const AreaChartExample = () => {
    return (
        <>
            <div className="mt-6 grid gap-6 xl:grid-cols-2">
                <ChartExample title={"Spline Area"} Chart={<AreaSplineChart />} />
                <ChartExample title={"Negative Value Area"} Chart={<AreaNegativeValueChart />} />
                <ChartExample title={"Irregular Time Series Area"} Chart={<AreaIrregularTimeSeriesChart />} />
                <ChartExample title={"Selection Area"} Chart={<AreaSelectionChart />} />
            </div>
        </>
    );
};

export default AreaChartExample;
