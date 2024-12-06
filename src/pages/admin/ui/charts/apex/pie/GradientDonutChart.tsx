import { ApexOptions } from "apexcharts";
import React, { useMemo } from "react";
import ApexChart from "react-apexcharts";

import { useGlobalContext } from "@/contexts/global";

const GradientDonutChart = () => {
    const { state, primaryColor } = useGlobalContext();

    const seriesData = [50, 30, 40, 20, 25, 15, 10];

    const chartOption = useMemo((): ApexOptions => {
        return {
            chart: {
                toolbar: {
                    show: false,
                },
                background: "transparent",
            },
            theme: {
                mode: state.theme.mode,
            },
            title: {
                text: "Marketing Budget",
                style: { fontWeight: "500" },
                align: "right",
            },
            stroke: {
                show: true,
                width: 1,
                colors: [state.theme.mode === "light" ? "#fff" : "#000"],
            },
            fill: {
                type: "gradient",
                gradient: {
                    shade: state.theme.mode,
                    shadeIntensity: state.theme.mode === "light" ? 0.4 : 0.25,
                },
            },
            plotOptions: {
                pie: {
                    startAngle: -45,
                    endAngle: 315,
                    donut: {
                        size: "60%",
                        labels: {
                            show: true,
                            value: {
                                formatter: (value) => "$" + value + "K",
                            },
                            total: {
                                show: true,
                                color: "#FF4560",
                                formatter: () => "$" + seriesData.reduce((acc, cur) => acc + cur, 0) + "K",
                            },
                        },
                    },
                },
            },
            tooltip: {
                enabled: true,
                y: {
                    formatter: (value) => "$" + value + "K",
                },
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200,
                        },
                        legend: {
                            position: "bottom",
                        },
                    },
                },
            ],
            labels: ["Content", "Social Media", "SEO", "Paid Display", "Affiliate", "Magazine", "Promotional Items"],
            colors: [primaryColor, "#FDA403", "#FB6D48", "#A25772", "#8E7AB5", "#FFA299", "#E3C878"],
            series: seriesData,
        };
    }, [state.theme]);

    return <ApexChart options={chartOption} type={"donut"} height={380} series={chartOption.series} />;
};

export default GradientDonutChart;
