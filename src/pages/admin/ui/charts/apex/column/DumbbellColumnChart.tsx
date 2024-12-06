import { ApexOptions } from "apexcharts";
import { useMemo } from "react";
import ApexChart from "react-apexcharts";

import { useGlobalContext } from "@/contexts/global";

const DumbbellColumnChart = () => {
    const { state, primaryColor } = useGlobalContext();

    const chartOption = useMemo((): ApexOptions => {
        return {
            theme: {
                mode: state.theme.mode,
            },
            xaxis: {
                tickPlacement: "on",
                title: {
                    text: "Average Delivery Time (Days)",
                    style: { fontWeight: "500" },
                },
            },
            yaxis: {
                min: 0,
                max: 10,
            },
            grid: {
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
                yaxis: {
                    lines: {
                        show: false,
                    },
                },
            },
            chart: {
                toolbar: {
                    show: true,
                    tools: {
                        download: true,
                        zoom: false,
                        zoomin: false,
                        zoomout: false,
                        pan: false,
                        reset: false,
                    },
                },
                background: "transparent",
                type: "rangeBar",
            },
            fill: {
                type: "gradient",
                gradient: {
                    type: "vertical",
                    gradientToColors: ["#FB6D48"],
                    inverseColors: true,
                    stops: [0, 100],
                },
            },
            plotOptions: {
                bar: {
                    columnWidth: 3,
                    isDumbbell: true,
                    dumbbellColors: [[primaryColor, "#FB6D48"]],
                },
            },
            labels: ["Min Delivery Days", "Max Delivery Days"],
            legend: {
                show: true,
                showForSingleSeries: true,
                position: "bottom",
                horizontalAlign: "center",
                customLegendItems: ["Min Delivery Days", "Max Delivery Days"],
                markers: {
                    fillColors: [primaryColor, "#FB6D48"],
                },
            },
            series: [
                {
                    data: [
                        {
                            x: "California",
                            y: [2, 4],
                        },
                        {
                            x: "Nevada",
                            y: [2, 5],
                        },
                        {
                            x: "New York",
                            y: [1, 2],
                        },
                        {
                            x: "Arizona",
                            y: [1, 4],
                        },
                        {
                            x: "Vermont",
                            y: [2, 9],
                        },
                        {
                            x: "Texas",
                            y: [3, 6],
                        },
                        {
                            x: "Ohio",
                            y: [4, 7],
                        },
                        {
                            x: "Tennessee",
                            y: [2, 8],
                        },
                    ],
                },
            ],
        };
    }, [state.theme]);

    return <ApexChart options={chartOption} type={"rangeBar"} height={380} series={chartOption.series} />;
};

export default DumbbellColumnChart;
