import { ApexOptions } from "apexcharts";
import React, { useMemo } from "react";
import ApexChart from "react-apexcharts";

import { useGlobalContext } from "@/contexts/global";

const SimplePieChart = () => {
    const { state, primaryColor } = useGlobalContext();

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
            stroke: {
                show: true,
                width: 1,
                colors: [state.theme.mode === "light" ? "#fff" : "#000"],
            },
            title: {
                text: "Website Traffic",
                style: { fontWeight: "500" },
                align: "right",
            },
            tooltip: {
                enabled: true,
                y: {
                    formatter: (value) => value + " Visitors",
                },
            },
            labels: ["Search", "Direct", "Referral", "Social", "Webinars", "Advertisement"],
            colors: [primaryColor, "#FDA403", "#FB6D48", "#A25772", "#8E7AB5", "#FFA299"],
            series: [428, 180, 88, 209, 91, 52],
        };
    }, [state.theme]);

    return <ApexChart options={chartOption} type={"pie"} height={380} series={chartOption.series} />;
};

export default SimplePieChart;
