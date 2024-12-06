import { ApexOptions } from "apexcharts";
import { useMemo } from "react";
import ApexChart from "react-apexcharts";

import { useGlobalContext } from "@/contexts/global";
import { dateHelper, numberHelper } from "@/helpers";

const getPreviousMonthDates = () => {
    const prevMonthDate = new Date();
    prevMonthDate.setDate(1);
    return {
        startDate: dateHelper.minusMonths(1, prevMonthDate),
        endDate: new Date(new Date().setDate(0)),
    };
};

const generateDataSetBetweenDates = (startDate: Date, endDate: Date, records: number[]) => {
    let currentDate = new Date(startDate.getTime());
    let currentIndex = 0;
    const data = [];
    while (currentDate <= endDate) {
        data.push({
            x: currentDate.getTime(),
            y: records[currentIndex],
        });
        currentDate.setDate(currentDate.getDate() + 1);
        currentIndex++;
    }
    return data;
};

const generateSetOfRandomNumber = (initialValue: number, delta: number) => {
    const records = [initialValue];
    let currentIndex = 1;
    while (currentIndex <= 31) {
        records.push(numberHelper.generateRandomIntegerAround(records[currentIndex - 1], delta));
        currentIndex++;
    }
    return records;
};

const getDatePlusDays = (date: Date, days: number) => {
    return dateHelper.addDays(days, new Date(date));
};

const AreaIrregularTimeSeriesChart = () => {
    const { state, primaryColor } = useGlobalContext();

    const seriesData = useMemo(() => {
        return {
            product_a: generateSetOfRandomNumber(80, 4),
            product_b: generateSetOfRandomNumber(60, 3),
            product_c: generateSetOfRandomNumber(45, 3),
        };
    }, []);

    const chartOption = useMemo((): ApexOptions => {
        const { startDate, endDate } = getPreviousMonthDates();
        return {
            theme: { mode: state.theme.mode },
            chart: {
                stacked: false,
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
            xaxis: {
                type: "datetime",
                min: startDate.getTime(),
                max: endDate.getTime(),
                labels: {
                    datetimeUTC: false,
                },
            },
            yaxis: {
                min: 30,
            },
            tooltip: {
                x: {
                    format: "dd MMM yyyy",
                },
                y: {
                    formatter: (value, opts) => value + " points",
                },
            },
            colors: [primaryColor, "#FFC700", "#FFAD84"],
            fill: {
                type: "gradient",
                gradient: {
                    shade: state.theme.mode,
                    shadeIntensity: 1,
                    opacityFrom: 0.8,
                    opacityTo: 0.05,
                    stops: [0, 100],
                },
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
                position: "bottom",
                offsetY: 6,
            },
            annotations: {
                yaxis: [
                    {
                        y: 50,
                        borderColor: "#82A0D8",
                        label: {
                            text: "Support",
                            style: {
                                color: "#fff",
                                background: "#5356FF",
                            },
                        },
                    },
                ],
                xaxis: [
                    {
                        x: getDatePlusDays(startDate, 18).getTime(),
                        borderColor: "#82A0D8",
                        label: {
                            text: "Rally",
                            style: {
                                color: "#fff",
                                background: "#5356FF",
                            },
                        },
                    },
                ],
            },
            series: [
                {
                    name: "Product A",
                    data: generateDataSetBetweenDates(startDate, endDate, seriesData.product_a),
                },
                {
                    name: "Product B",
                    data: generateDataSetBetweenDates(
                        getDatePlusDays(startDate, 4),
                        getDatePlusDays(startDate, 20),
                        seriesData.product_b,
                    ),
                },
                {
                    name: "Product C",
                    data: generateDataSetBetweenDates(
                        getDatePlusDays(startDate, 14),
                        getDatePlusDays(startDate, 28),
                        seriesData.product_c,
                    ),
                },
            ],
        };
    }, [state.theme]);

    return <ApexChart options={chartOption} type={"area"} height={380} series={chartOption.series} />;
};

export default AreaIrregularTimeSeriesChart;
