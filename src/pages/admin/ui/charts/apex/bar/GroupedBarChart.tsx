import { ApexOptions } from "apexcharts";
import { useMemo } from "react";
import ApexChart from "react-apexcharts";

import { useGlobalContext } from "@/contexts/global";

const GroupedBarChart = () => {
    const { state, primaryColor } = useGlobalContext();

    const chartOption = useMemo((): ApexOptions => {
        return {
            theme: {
                mode: state.theme.mode,
            },
            xaxis: {
                categories: ["Atlas", "Phoenix", "Zenith", "Forge"],
                title: {
                    text: "Expense Breakdown",
                    style: { fontWeight: "500" },
                },
                labels: {
                    formatter: (value) => value + "K",
                },
            },
            grid: {
                show: false,
            },
            stroke: {
                show: true,
                width: 1,
                colors: [state.theme.mode === "light" ? "#fff" : "#000"],
            },
            tooltip: {
                shared: true,
                intersect: false,
                y: {
                    formatter: (value) => value + "K",
                },
            },
            chart: {
                toolbar: {
                    show: true,
                },
                background: "transparent",
            },
            colors: [primaryColor, "#FDA403", "#FB6D48", "#8E7AB5"],
            fill: {
                type: "solid",
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    barHeight: 14,
                },
            },
            series: [
                {
                    name: "Labor",
                    data: [122, 215, 180, 210],
                },
                {
                    name: "Material",
                    data: [158, 169, 143, 133],
                },
                {
                    name: "Marketing",
                    data: [146, 98, 123, 111],
                },
                {
                    name: "Travel",
                    data: [59, 42, 71, 28],
                },
            ],
        };
    }, [state.theme]);

    return <ApexChart options={chartOption} type={"bar"} height={380} series={chartOption.series} />;
};

export default GroupedBarChart;
