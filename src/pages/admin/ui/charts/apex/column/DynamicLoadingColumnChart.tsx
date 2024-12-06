import { ApexOptions } from "apexcharts";
import { useMemo, useState } from "react";
import ApexChart from "react-apexcharts";

import { useGlobalContext } from "@/contexts/global";
import { arrayHelper } from "@/helpers";

const DynamicLoadingColumnChart = () => {
    const { state, primaryColor } = useGlobalContext();
    const [selectedIndexList, setSelectedIndexList] = useState<number[]>([]);

    const seriesOptions = useMemo(
        () => ({
            labels: Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i),
            colors: [primaryColor, "#A25772", "#FB6D48", "#FDA403", "#8E7AB5"],
            data: [
                [987, 1155, 892, 1038],
                [812, 907, 835, 1018],
                [685, 793, 715, 878],
                [603, 689, 648, 821],
                [529, 658, 574, 703],
            ],
        }),
        [primaryColor],
    );

    const dynamicSeries = useMemo<ApexAxisChartSeries>(() => {
        return selectedIndexList.map((value) => {
            return {
                name: seriesOptions.labels[value].toString(),
                color: seriesOptions.colors[value],
                data: seriesOptions.data[value],
            };
        });
    }, [selectedIndexList]);

    const chartOption = useMemo((): ApexOptions => {
        return {
            theme: {
                mode: state.theme.mode,
            },
            xaxis: {
                categories: seriesOptions.labels,
                title: {
                    text: "Yearly Production",
                    style: { fontWeight: "500" },
                    offsetY: 15,
                },
            },
            yaxis: {
                labels: {
                    show: false,
                },
            },
            legend: {
                show: false,
            },
            dataLabels: {
                enabled: true,
                offsetX: 10,
                formatter: (val, opts) => {
                    return opts.w.globals.labels[opts.dataPointIndex];
                },
            },
            states: {
                normal: {
                    filter: {
                        type: "desaturate",
                    },
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => "",
                    },
                    formatter: (val) => {
                        return val.toString() + " Units";
                    },
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
                events: {
                    dataPointSelection: (e, chart, options) =>
                        setSelectedIndexList((prev) => arrayHelper.toggleItem(prev, options.dataPointIndex)),
                },
            },
            colors: seriesOptions.colors,
            fill: {
                type: "solid",
            },
            plotOptions: {
                bar: {
                    distributed: true,
                    horizontal: true,
                    dataLabels: {
                        position: "bottom",
                    },
                },
            },
            series: [
                {
                    data: [4072, 3572, 3071, 2761, 2464],
                },
            ],
        };
    }, [state.theme, dynamicSeries]);

    const dynamicOption = useMemo((): ApexOptions => {
        return {
            theme: {
                mode: state.theme.mode,
            },
            xaxis: {
                categories: ["Q1", "Q2", "Q3", "Q4"],
                title: {
                    text: "Quarterly Production",
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
            yaxis: {
                max: (max) => Math.ceil((max + Math.ceil(max / 10)) / 500) * 500,
            },
            fill: {
                type: "solid",
            },
            plotOptions: {
                bar: {
                    columnWidth: 30,
                    borderRadius: 6,
                    dataLabels: {
                        total: {
                            enabled: true,
                            offsetY: -1,
                            style: {
                                color: "#FFA299",
                            },
                        },
                    },
                },
            },
            tooltip: {
                y: {
                    formatter: (val) => val + " Units",
                },
            },
            legend: {
                show: false,
            },
            series: dynamicSeries,
        };
    }, [state.theme, dynamicSeries]);

    return (
        <div className="flex">
            <div className="flex-1">
                <ApexChart options={chartOption} type={"bar"} height={380} series={chartOption.series} />
            </div>
            {dynamicOption.series && dynamicOption.series.length > 0 && (
                <div className="flex-1">
                    <ApexChart
                        options={dynamicOption}
                        type={"bar"}
                        height={380}
                        width={"100%"}
                        series={dynamicOption.series}
                    />
                </div>
            )}
        </div>
    );
};

export default DynamicLoadingColumnChart;
