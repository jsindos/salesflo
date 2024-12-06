import { ApexOptions } from "apexcharts";
import { useMemo } from "react";
import ApexChart from "react-apexcharts";

import { useGlobalContext } from "@/contexts/global";
import { dateHelper, numberHelper } from "@/helpers";

const generateDataSeriesBetweenTwoDates = (records: number[]) => {
    let startingDate = dateHelper.minusMonths(5);
    let currentIndex = 0;
    const data = [];

    while (startingDate <= new Date()) {
        data.push({
            x: startingDate.getTime(),
            y: records[currentIndex],
        });
        startingDate.setDate(startingDate.getDate() + 1);
        currentIndex++;
    }

    return data;
};

const generateSetOfRandomNumber = () => {
    const records = [50];
    const maxVariation = 20;
    let currentIndex = 1;
    let generateValue = 0;
    while (currentIndex <= 155) {
        generateValue = numberHelper.generateRandomIntegerAround(records[currentIndex - 1], maxVariation);
        while (generateValue < 50) {
            generateValue = numberHelper.generateRandomIntegerAround(records[currentIndex - 1], maxVariation);
        }
        while (generateValue < 50) {
            generateValue = numberHelper.generateRandomIntegerAround(records[currentIndex - 1], maxVariation);
        }
        records.push(generateValue);
        currentIndex++;
    }
    return records;
};

const AreaSelectionChart = () => {
    const { state, primaryColor } = useGlobalContext();

    const seriesDataRecords = useMemo(() => generateSetOfRandomNumber(), []);

    const chartOption = useMemo((): { resultChart: ApexOptions; targetChart: ApexOptions } => {
        return {
            resultChart: {
                theme: {
                    mode: state.theme.mode,
                },
                series: [
                    {
                        name: "Visitors",
                        data: generateDataSeriesBetweenTwoDates(seriesDataRecords),
                    },
                ],
                chart: {
                    id: "result-chart",
                    background: "transparent",
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
                },
                colors: ["#FDA403"],
                stroke: {
                    width: 2,
                    curve: "smooth",
                },
                dataLabels: {
                    enabled: false,
                },
                fill: {
                    opacity: 0.6,
                    type: "solid",
                },
                xaxis: {
                    type: "datetime",
                },
            },
            targetChart: {
                series: [
                    {
                        name: "Visitors",
                        data: generateDataSeriesBetweenTwoDates(seriesDataRecords),
                    },
                ],
                theme: {
                    mode: state.theme.mode,
                },
                chart: {
                    background: "transparent",
                    toolbar: {
                        show: true,
                        tools: {
                            download: true,
                            selection: true,
                            zoom: false,
                            zoomin: false,
                            zoomout: false,
                            pan: false,
                            reset: false,
                        },
                        autoSelected: "selection",
                    },
                    brush: {
                        enabled: true,
                        target: "result-chart",
                    },
                    selection: {
                        enabled: true,
                        fill: {
                            color: "#FDA403",
                            opacity: 0.3,
                        },
                        stroke: {
                            width: 2,
                            color: "#FDA403",
                            opacity: 0.8,
                            dashArray: 3,
                        },
                        xaxis: {
                            min: dateHelper.minusDays(15).getTime(),
                            max: new Date().getTime(),
                        },
                    },
                },
                colors: [primaryColor],
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    width: 2,
                    curve: "smooth",
                },
                fill: {
                    opacity: 0.6,
                    type: "solid",
                },
                xaxis: {
                    type: "datetime",
                },
                yaxis: {
                    title: { text: "Website Traffic", style: { fontWeight: "500", fontSize: "12px" } },
                },
            },
        };
    }, [state.theme]);

    return (
        <div>
            <ApexChart
                options={chartOption.resultChart}
                type={"area"}
                height={190}
                series={chartOption.resultChart.series}
            />
            <ApexChart
                options={chartOption.targetChart}
                type={"area"}
                height={190}
                series={chartOption.targetChart.series}
            />
        </div>
    );
};

export default AreaSelectionChart;
