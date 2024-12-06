import { ApexOptions } from "apexcharts";
import { useMemo } from "react";
import ApexChart from "react-apexcharts";

import { useGlobalContext } from "@/contexts/global";

const NegativeValueBarChart = () => {
    const { state, primaryColor } = useGlobalContext();

    const chartOption = useMemo((): ApexOptions => {
        return {
            theme: {
                mode: state.theme.mode,
            },
            xaxis: {
                categories: [
                    "Smart Watches",
                    "Wireless Headphones",
                    "Earbuds",
                    "Wired Earphones",
                    "Speakers",
                    "Soundbars",
                    "Personalised Products",
                    "Accessories",
                ],
                title: {
                    text: "Product Review Sentiment",
                    style: { fontWeight: "500" },
                },
                labels: {
                    formatter: (value) => Math.abs(Number(value)).toString(),
                },
            },
            dataLabels: {
                formatter: (value) => Math.abs(Number(value)).toString(),
            },
            tooltip: {
                shared: false,
                y: {
                    formatter: (val) => Math.abs(val).toString() + " Reviews",
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
                stacked: true,
            },
            colors: [primaryColor, "#FDA403"],
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
                    name: "Positive",
                    data: [379, 293, 411, 387, 242, 434, 321, 357],
                },
                {
                    name: "Negative",
                    data: [151, 208, 90, 113, 268, 76, 189, 88].map((value) => -value),
                },
            ],
        };
    }, [state.theme]);

    return <ApexChart options={chartOption} type={"bar"} height={380} series={chartOption.series} />;
};

export default NegativeValueBarChart;
