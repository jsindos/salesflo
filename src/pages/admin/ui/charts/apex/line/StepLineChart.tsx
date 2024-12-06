import { ApexOptions } from "apexcharts";
import React, { useMemo } from "react";
import ApexChart from "react-apexcharts";

import { useGlobalContext } from "@/contexts/global";
import { dateHelper } from "@/helpers";

const StepLineChart = () => {
    const { state, primaryColor } = useGlobalContext();

    const xAxisLabels = useMemo(() => {
        let currentMonth = new Date().getMonth();
        const pastMonthWithQuarter = [];
        while (pastMonthWithQuarter.length < 10) {
            if (pastMonthWithQuarter.length === 0 && new Date().getDate() > 15) {
                pastMonthWithQuarter.push(dateHelper.monthNames[currentMonth] + "-1");
            } else if (currentMonth !== new Date().getMonth()) {
                pastMonthWithQuarter.push(dateHelper.monthNames[currentMonth] + "-2");
                if (pastMonthWithQuarter.length !== 10) {
                    pastMonthWithQuarter.push(dateHelper.monthNames[currentMonth] + "-1");
                }
            }
            currentMonth -= 1;
            if (currentMonth === -1) {
                currentMonth = 11;
            }
        }

        return pastMonthWithQuarter.reverse();
    }, []);

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
                    text: "Customer Support Ticket Volume",
                    style: { fontWeight: "500" },
                },
            },
            tooltip: {
                y: {
                    formatter: (val) => val + " Tickets",
                },
            },
            stroke: {
                curve: "stepline",
                width: 2,
            },
            colors: [primaryColor],
            series: [
                {
                    name: "Volume",
                    data: [144, 154, 121, 112, 143, 233, 223, 166, 166, 158],
                },
            ],
        };
    }, [state.theme]);

    return <ApexChart options={chartOption} type={"line"} height={380} series={chartOption.series} />;
};

export default StepLineChart;
