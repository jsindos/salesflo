import { ApexOptions } from "apexcharts";
import { useMemo } from "react";
import ApexChart from "react-apexcharts";

import { useGlobalContext } from "@/contexts/global";
import { currencyHelper, dateHelper } from "@/helpers";

const AreaSplineChart = () => {
    const { state, primaryColor } = useGlobalContext();

    const chartOption = useMemo((): ApexOptions => {
        return {
            theme: {
                mode: state.theme.mode,
            },
            xaxis: {
                categories: dateHelper.getPastMonths(7),
            },
            yaxis: {
                labels: {
                    formatter: function (value) {
                        return currencyHelper.sign + value + "K";
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
            },
            colors: [primaryColor, "#FDA403"],
            fill: {
                type: "solid",
                opacity: 0.6,
            },
            stroke: {
                curve: "smooth",
                width: 2,
            },
            dataLabels: {
                enabled: false,
            },
            legend: {
                show: true,
                position: "top",
            },
            series: [
                {
                    name: "Basic Plan",
                    data: [31, 40, 28, 51, 42, 72, 60],
                },
                {
                    name: "Premium Plan",
                    data: [11, 32, 45, 32, 34, 52, 41],
                },
            ],
        };
    }, [state.theme]);

    return <ApexChart options={chartOption} type={"area"} height={380} series={chartOption.series} />;
};

export default AreaSplineChart;
