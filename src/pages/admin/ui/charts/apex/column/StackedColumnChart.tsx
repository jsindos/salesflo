import { ApexOptions } from "apexcharts";
import { useMemo } from "react";
import ApexChart from "react-apexcharts";

import { useGlobalContext } from "@/contexts/global";
import { dateHelper } from "@/helpers";

const StackedColumnChart = () => {
    const { state, primaryColor } = useGlobalContext();

    const chartOption = useMemo((): ApexOptions => {
        return {
            theme: {
                mode: state.theme.mode,
            },
            xaxis: {
                categories: dateHelper.getPastMonths(8),
                title: {
                    text: "Monthly Cart Abandoned Count",
                    style: { fontWeight: "500" },
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
            chart: {
                toolbar: {
                    show: true,
                },
                background: "transparent",
                stacked: true,
            },
            colors: [primaryColor, "#A25772", "#FB6D48", "#FDA403", "#8E7AB5"],
            fill: {
                type: "solid",
            },
            tooltip: {
                shared: true,
                intersect: false,
                inverseOrder: true,
            },
            plotOptions: {
                bar: {
                    columnWidth: 40,
                    borderRadius: 8,
                    dataLabels: {
                        total: {
                            enabled: true,
                            offsetY: -8,
                            style: {
                                color: "#FFA299",
                            },
                        },
                    },
                },
            },
            series: [
                {
                    name: "Cart",
                    data: [847, 723, 848, 573, 842, 973, 874, 942],
                },
                {
                    name: "Checkout",
                    data: [984, 697, 473, 784, 993, 824, 914, 973],
                },
                {
                    name: "Shipping",
                    data: [423, 673, 324, 473, 424, 347, 384, 442],
                },
                {
                    name: "Payment",
                    data: [384, 297, 362, 392, 427, 534, 377, 442],
                },
                {
                    name: "Review",
                    data: [642, 417, 304, 617, 439, 527, 689, 773],
                },
            ],
        };
    }, [state.theme]);

    return <ApexChart options={chartOption} type={"bar"} height={380} series={chartOption.series} />;
};

export default StackedColumnChart;
