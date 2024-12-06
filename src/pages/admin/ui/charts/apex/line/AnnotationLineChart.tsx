import { ApexOptions } from "apexcharts";
import React, { useMemo } from "react";
import ApexChart from "react-apexcharts";

import { useGlobalContext } from "@/contexts/global";
import { currencyHelper, dateHelper } from "@/helpers";

const AnnotationLineChart = () => {
    const { state, primaryColor } = useGlobalContext();

    const xAxisLabels = useMemo(() => {
        let currentMonth = new Date().getMonth();
        let currentYear = new Date().getFullYear();
        const pastMonthWithQuarter = [];
        const totalLabelCount = 8;
        while (pastMonthWithQuarter.length < totalLabelCount) {
            if (pastMonthWithQuarter.length === 0 && new Date().getDate() > totalLabelCount) {
                pastMonthWithQuarter.push(dateHelper.monthNames[currentMonth] + " 1-10");
                if (pastMonthWithQuarter.length === 0 && new Date().getDate() > 20) {
                    pastMonthWithQuarter.push(dateHelper.monthNames[currentMonth] + " 11-20");
                }
            } else if (currentMonth !== new Date().getMonth()) {
                pastMonthWithQuarter.push(
                    dateHelper.monthNames[currentMonth] + ` 21-${new Date(currentYear, currentMonth + 1, 0).getDate()}`,
                );
                if (pastMonthWithQuarter.length !== totalLabelCount) {
                    pastMonthWithQuarter.push(dateHelper.monthNames[currentMonth] + " 11-20");
                }
                if (pastMonthWithQuarter.length !== totalLabelCount) {
                    pastMonthWithQuarter.push(dateHelper.monthNames[currentMonth] + " 1-10");
                }
            }
            currentMonth -= 1;
            if (currentMonth === -1) {
                currentMonth = 11;
                currentYear -= 1;
            }
        }
        return pastMonthWithQuarter.reverse();
    }, []);

    const seriesData = useMemo(() => [114.87, 105.88, 90.58, 135.43, 86.39, 212.99, 196.78, 143.76, 130.25], []);

    const chartOption = useMemo((): ApexOptions => {
        return {
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
            },
            theme: {
                mode: state.theme.mode,
            },
            xaxis: {
                categories: xAxisLabels,
                title: {
                    text: "Sales",
                    style: { fontWeight: "500" },
                },
            },
            yaxis: {
                labels: {
                    formatter: (val) => val.toFixed(0) + "K",
                },
            },
            tooltip: {
                y: {
                    formatter: (val) => currencyHelper.sign + val + "K",
                },
            },
            annotations: {
                yaxis: [
                    {
                        y: 202,
                        strokeDashArray: 0,
                        borderColor: "#FDA403",
                        label: {
                            style: {
                                color: "#fff",
                                background: "#FDA403",
                            },
                            text: "Target",
                            borderWidth: 0,
                        },
                    },
                ],
                xaxis: [
                    {
                        x: xAxisLabels[2],
                        strokeDashArray: 0,
                        borderColor: "#A25772",
                        label: {
                            style: {
                                color: "#fff",
                                background: "#A25772",
                            },
                            text: "Start Of Sale",
                            borderWidth: 0,
                        },
                    },
                    {
                        x: xAxisLabels[4],
                        x2: xAxisLabels[5],
                        strokeDashArray: 0,
                        borderColor: "#8E7AB5",
                        label: {
                            style: {
                                color: "#fff",
                                background: "#8E7AB5",
                            },
                            text: "Festive Season",
                            borderWidth: 0,
                        },
                    },
                ],
                points: [
                    {
                        x: xAxisLabels[6],
                        y: seriesData[6],
                        marker: {
                            size: 6,
                            fillColor: "#FF4560",
                            strokeColor: "FF4560",
                            radius: 3,
                        },
                        label: {
                            borderColor: "#FF4560",
                            offsetY: 36,
                            style: {
                                color: "#fff",
                                background: "#FF4560",
                            },
                            borderWidth: 0,
                            text: "Production Down",
                        },
                    },
                ],
            },
            stroke: {
                curve: "smooth",
                width: 2,
            },
            colors: [primaryColor],
            series: [
                {
                    name: "Sales",
                    data: [114.87, 105.88, 90.58, 135.43, 86.39, 212.99, 196.78, 143.76],
                },
            ],
        };
    }, [state.theme]);

    return <ApexChart options={chartOption} type={"line"} height={380} series={chartOption.series} />;
};

export default AnnotationLineChart;
