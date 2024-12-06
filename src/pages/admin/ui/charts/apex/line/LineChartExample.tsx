import { ReactElement } from "react";

import { Card, CardBody } from "@/components/daisyui";

import AnnotationLineChart from "./AnnotationLineChart";
import LabelLineChart from "./LabelLineChart";
import StepLineChart from "./StepLineChart";
import SyncingLineChart from "./SyncingLineChart";

const SingleChart = ({ label, chartComponent }: { label: string; chartComponent: ReactElement }) => (
    <Card className="bg-base-100">
        <CardBody className="gap-3 pb-0">
            <p className="font-medium">{label}</p>
            {chartComponent}
        </CardBody>
    </Card>
);

const LineChartExample = () => {
    return (
        <>
            <div className="mt-6 grid gap-6 xl:grid-cols-2">
                <SingleChart label="Label Line" chartComponent={<LabelLineChart />} />
                <SingleChart label="Step Line" chartComponent={<StepLineChart />} />
                <SingleChart label="Syncing Line" chartComponent={<SyncingLineChart />} />
                <SingleChart label="Annotation Line" chartComponent={<AnnotationLineChart />} />
            </div>
        </>
    );
};

export default LineChartExample;
