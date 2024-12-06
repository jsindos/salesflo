import { ApexOptions } from "apexcharts";
import { useMemo } from "react";
import ApexChart from "react-apexcharts";

import { useGlobalContext } from "@/contexts/global";

const BarWithMarkerChart = () => {
    const { state, primaryColor } = useGlobalContext();

    const seriesDataWithYaxisAndGoalValue = useMemo(
        () => [
            {
                y: 488,
                goals: {
                    name: "Predicted Sales",
                    value: 680,
                    strokeDashArray: 2,
                },
            },
            {
                y: 680,
                goals: {
                    name: "Predicted Sales",
                    value: 710,
                    strokeDashArray: 2,
                },
            },
            {
                y: 722,
                goals: {
                    name: "Predicted Sales",
                    value: 680,
                },
            },
            {
                y: 539,
                goals: {
                    name: "Predicted Sales",
                    value: 594,
                    strokeDashArray: 2,
                },
            },
            {
                y: 461,
                goals: {
                    name: "Predicted Sales",
                    value: 397,
                },
            },
            {
                y: 322,
                goals: {
                    name: "Predicted Sales",
                    value: 300,
                },
            },
        ],
        [],
    );

    const chartOption = useMemo((): ApexOptions => {
        const currentYear = new Date().getFullYear();
        const seriesWithGoals = seriesDataWithYaxisAndGoalValue.map((data, index) => ({
            ...data,
            x: (currentYear - index).toString(),
            goals: [{ ...data.goals, strokeWidth: 6, strokeColor: "#EB6440" }],
        }));
        return {
            theme: {
                mode: state.theme.mode,
            },
            xaxis: {
                type: "numeric",
                title: { text: "(Million USD)", style: { fontWeight: "500" } },
                labels: {
                    formatter: (value) => value + "M",
                },
            },
            tooltip: {
                y: {
                    formatter: (value) => value + "M",
                },
            },
            grid: {
                show: false,
            },
            chart: {
                toolbar: {
                    show: true,
                },
                background: "transparent",
            },
            colors: [primaryColor],
            fill: {
                type: "solid",
            },
            legend: {
                show: true,
                showForSingleSeries: true,
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    barHeight: 28,
                },
            },
            series: [
                {
                    name: "Total Sales",
                    data: seriesWithGoals,
                },
            ],
        };
    }, [state.theme]);

    return <ApexChart options={chartOption} type={"bar"} height={380} series={chartOption.series} />;
};

export default BarWithMarkerChart;
