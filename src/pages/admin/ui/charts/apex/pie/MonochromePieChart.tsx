import { ApexOptions } from "apexcharts";
import React, { useMemo } from "react";
import ApexChart from "react-apexcharts";

import { useGlobalContext } from "@/contexts/global";

const MonochromePieChart = () => {
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
                monochrome: {
                    enabled: true,
                    color: primaryColor,
                    shadeTo: "light",
                    shadeIntensity: 0.8,
                },
            },
            stroke: {
                show: true,
                width: 1,
                colors: [state.theme.mode === "light" ? "#fff" : "#000"],
            },
            title: {
                text: "App Downloads",
                style: { fontWeight: "500" },
                align: "right",
            },
            tooltip: {
                enabled: true,
                y: {
                    formatter: (value) => value + " Downloads",
                },
            },
            labels: ["Android", "iOS", "Windows", "MacOS", "Amazon FireOS"],
            series: [39243, 22187, 6947, 3375, 2688],
        };
    }, [state.theme]);

    return <ApexChart options={chartOption} type={"pie"} height={380} series={chartOption.series} />;
};

export default MonochromePieChart;
