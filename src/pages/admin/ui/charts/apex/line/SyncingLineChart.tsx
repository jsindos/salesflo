import { ApexOptions } from "apexcharts";
import React, { useMemo } from "react";
import ApexChart from "react-apexcharts";

import { useGlobalContext } from "@/contexts/global";
import { currencyHelper, dateHelper } from "@/helpers";

const SyncingLineChart = () => {
    const { state, primaryColor } = useGlobalContext();
    const totalOrders = [112, 108, 137, 172, 184, 190, 198, 192, 145, 130, 121, 145, 134, 128, 80];
    const averageOrderValue = [
        101.13, 112.24, 156.29, 167.57, 99.01, 96.48, 91.5, 98.74, 101.28, 150.04, 160.25, 172.14, 143.24, 140.72,
        99.85,
    ];
    const xAxisOption: ApexOptions["xaxis"] = {
        type: "datetime",
        categories: dateHelper.getPastDateTimes(15),
        max: dateHelper.minusDays().getTime(),
    };

    const chartOption = useMemo((): { order: ApexOptions; order_revenue: ApexOptions; order_average: ApexOptions } => {
        return {
            order: {
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
                    id: "order-placed",
                    group: "order",
                },
                theme: {
                    mode: state.theme.mode,
                },
                xaxis: xAxisOption,
                stroke: {
                    width: 2,
                },
                series: [
                    {
                        color: primaryColor,
                        name: "Orders",
                        data: totalOrders,
                    },
                ],
            },
            order_revenue: {
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
                    id: "order-revenue",
                    group: "order",
                },
                theme: {
                    mode: state.theme.mode,
                },
                xaxis: xAxisOption,
                yaxis: {
                    labels: {
                        formatter: (val) => (val / 1000).toFixed(0) + "K",
                    },
                },
                tooltip: {
                    y: {
                        formatter: (val) => currencyHelper.sign + (val / 1000).toFixed(2) + "K",
                    },
                },
                stroke: {
                    width: 2,
                },
                series: [
                    {
                        color: "#FFC700",
                        name: "Revenue",
                        data: totalOrders.map((cur, index) => Number((cur * averageOrderValue[index]).toFixed(2))),
                    },
                ],
            },
            order_average: {
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
                    id: "order-average",
                    group: "order",
                },
                theme: {
                    mode: state.theme.mode,
                },
                xaxis: xAxisOption,
                yaxis: {
                    labels: {
                        formatter: (val) => val.toFixed(0),
                    },
                },
                tooltip: {
                    y: {
                        formatter: (val) => currencyHelper.sign + val,
                    },
                },
                stroke: {
                    width: 2,
                },
                series: [
                    {
                        color: "#FFAD84",
                        name: "Average",
                        data: averageOrderValue,
                    },
                ],
            },
        };
    }, [state.theme]);

    return (
        <div>
            <ApexChart options={chartOption.order} type={"line"} height={120} series={chartOption.order.series} />
            <ApexChart
                options={chartOption.order_revenue}
                type={"line"}
                height={120}
                series={chartOption.order_revenue.series}
            />
            <ApexChart
                options={chartOption.order_average}
                type={"line"}
                height={120}
                series={chartOption.order_average.series}
            />
        </div>
    );
};

export default SyncingLineChart;
