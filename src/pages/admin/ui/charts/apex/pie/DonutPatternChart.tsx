import { ApexOptions } from "apexcharts";
import React, { useMemo } from "react";
import ApexChart from "react-apexcharts";

import { useGlobalContext } from "@/contexts/global";

const DonutPatternChart = () => {
    const { state, primaryColor } = useGlobalContext();

    const seriesData = useMemo(() => [2512, 1003, 2009, 4322, 521], []);

    const chartOption = useMemo((): ApexOptions => {
        return {
            chart: {
                toolbar: {
                    show: false,
                },
                background: "transparent",
                dropShadow: {
                    enabled: true,
                    color: "#111",
                    top: -1,
                    left: 3,
                    blur: 3,
                    opacity: 0.2,
                },
            },
            theme: {
                mode: state.theme.mode,
            },
            title: {
                text: "Inventory",
                style: { fontWeight: "500" },
                align: "right",
                offsetX: -24,
            },
            legend: {
                position: "right",
            },
            stroke: {
                show: true,
                width: 1,
                colors: [state.theme.mode === "light" ? "#fff" : "#000"],
            },
            fill: {
                type: "pattern",
                pattern: {
                    style: ["squares", "verticalLines", "slantedLines", "circles", "horizontalLines"],
                    width: 4,
                    height: 4,
                    strokeWidth: 1,
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
                                formatter: (value) => value + " Units",
                            },
                            total: {
                                show: true,
                                color: "#FF4560",
                                formatter: () => seriesData.reduce((acc, cur) => acc + cur, 0) + " Units",
                            },
                        },
                    },
                },
            },
            tooltip: {
                enabled: true,
                y: {
                    formatter: (value) => value + " Units",
                },
            },
            labels: ["Smartwatch", "Smartphone", "Tablet", "Headphone", "Laptop"],
            colors: [primaryColor, "#FB6D48", "#FDA403", "#A25772", "#8E7AB5"],
            series: seriesData,
        };
    }, [state.theme]);

    return <ApexChart options={chartOption} type={"donut"} height={380} series={chartOption.series} />;
};

export default DonutPatternChart;
