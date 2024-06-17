import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import React from "react";
import { Doughnut, Line } from "react-chartjs-2";
import { getLast7Days } from "../lib/features";
import { green, greenLight, orange, orangeLight } from "../../constants/color";

ChartJS.register(
  Tooltip,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  ArcElement,
  Legend
);

const labels = getLast7Days();

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },

  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
};

const LineChart = ({ value = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        label: "My First dataset",
        fill: true,
        borderColor: green,
        backgroundColor: greenLight,
      },
      // {
      //   data: [1, 22, 4, 6],
      //   label: "My Second dataset",
      //   fill: true,
      //   borderColor: "rgba(255, 99, 132, 1)",
      //   backgroundColor: "rgba(255, 99, 132, 0.2)",
      // },
    ],
  };

  return <Line data={data} options={lineChartOptions} />;
};

const DoughnutChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  cutout: 120,
};
const DoughnutChart = ({ value = [], labels = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,

        borderColor: [green, orange],
        backgroundColor: [greenLight, orangeLight],
        hoverBackgroundColor: [green, orange],
        offset: 40,
      },
      // {
      //   data: [1, 22, 4, 6],
      //   label: "My Second dataset",
      //   fill: true,
      //   borderColor: "rgba(255, 99, 132, 1)",
      //   backgroundColor: "rgba(255, 99, 132, 0.2)",
      // },
    ],
  };
  return <Doughnut data={data} 
  style={{zIndex: 10}}
  options={DoughnutChartOptions} />;
};

export { DoughnutChart, LineChart };
