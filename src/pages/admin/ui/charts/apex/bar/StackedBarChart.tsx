import { ApexOptions } from "apexcharts";
import { useMemo } from "react";
import ApexChart from "react-apexcharts";

import { useGlobalContext } from "@/contexts/global";

const StackedBarChart = () => {
    const { state, primaryColor } = useGlobalContext();

    const chartOption = useMemo((): ApexOptions => {
        return {
            theme: {
                mode: state.theme.mode,
            },
            xaxis: {
                categories: ["Alabama", "Florida", "Georgia", "Nevada", "Texas", "South Carolina"],
                title: {
                    text: "Regional Ratio Of Sale",
                    style: { fontWeight: "500" },
                },
                labels: {
                    formatter: (value) => value + "%",
                },
            },
            grid: {
                show: false,
            },
            yaxis: {},
            tooltip: {
                shared: true,
                intersect: false,
                y: {
                    formatter: (value) => value + "%",
                },
            },
            chart: {
                toolbar: {
                    show: true,
                },
                background: "transparent",
                stacked: true,
                stackType: "100%",
            },
            colors: [primaryColor, "#FB6D48", "#A25772", "#FDA403", "#8E7AB5"],
            fill: {
                type: "solid",
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    barHeight: 28,
                },
            },
            series: [
                {
                    name: "Clothing",
                    data: [12, 34, 20, 27, 22, 14],
                },
                {
                    name: "Electronics",
                    data: [24, 20, 12, 18, 23, 8],
                },
                {
                    name: "Homeware",
                    data: [10, 18, 9, 10, 21, 29],
                },
                {
                    name: "Cosmetics",
                    data: [28, 18, 39, 40, 25, 30],
                },
                {
                    name: "Toys",
                    data: [26, 10, 20, 5, 9, 19],
                },
            ],
        };
    }, [state.theme]);

    return <ApexChart options={chartOption} type={"bar"} height={380} series={chartOption.series} />;
};

export default StackedBarChart;
