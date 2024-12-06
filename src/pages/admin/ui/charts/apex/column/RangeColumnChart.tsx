import { ApexOptions } from "apexcharts";
import { useMemo } from "react";
import ApexChart from "react-apexcharts";

import { useGlobalContext } from "@/contexts/global";
import { dateHelper } from "@/helpers";

const RangeColumnChart = () => {
    const { state, primaryColor } = useGlobalContext();

    const xAxisLabel = dateHelper.getPastMonths(5);
    const yAxisUsers = [
        [3, 5],
        [2, 6],
        [4, 6],
        [3, 7],
        [2, 7],
    ];
    const yAxisPremiumSubscriber = [
        [2, 3],
        [2, 4],
        [2, 4],
        [1, 5],
        [1, 3],
    ];

    const chartOption = useMemo((): ApexOptions => {
        return {
            theme: {
                mode: state.theme.mode,
            },
            xaxis: {
                title: {
                    text: "Customer Churn Rate (%)",
                    style: { fontWeight: "500" },
                },
            },
            yaxis: {
                min: 0,
            },
            tooltip: {
                y: {
                    formatter: (val) => val + "%",
                },
            },
            legend: {
                position: "top",
            },
            grid: {
                show: false,
            },
            stroke: {
                show: true,
                width: 1,
                colors: [state.theme.mode === "light" ? "#fff" : "#000"],
            },
            chart: {
                toolbar: {
                    show: true,
                },
                type: "rangeBar",
                background: "transparent",
            },
            colors: [primaryColor, "#FDA403"],
            fill: {
                type: "solid",
            },
            plotOptions: {
                bar: {
                    columnWidth: 40,
                },
            },
            dataLabels: {
                enabled: true,
                formatter: (val, opts) => {
                    const dataValue = opts.w.config.series[opts.seriesIndex].data[opts.dataPointIndex].y;
                    return dataValue[1] - dataValue[0] + "%";
                },
            },
            series: [
                {
                    name: "User",
                    data: xAxisLabel.map((label, index) => ({
                        x: label,
                        y: yAxisUsers[index],
                    })),
                },
                {
                    name: "Premium Subscriber",
                    data: xAxisLabel.map((label, index) => ({
                        x: label,
                        y: yAxisPremiumSubscriber[index],
                    })),
                },
            ],
        };
    }, [state.theme]);

    return <ApexChart options={chartOption} type={"rangeBar"} height={380} series={chartOption.series} />;
};

export default RangeColumnChart;
