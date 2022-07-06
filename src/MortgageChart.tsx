import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Mortgage Simulator',
    },
  },
};

const makeSeries = (repayAmount: number, totalBorrowed: number, interestRate: Number, repaymentFrequency: string): Array<Number> => {
	let balance: Number = totalBorrowed;
	let days = 0;
  const returnData: Array<Number> = [];
  returnData.push(balance);
  
  let repaymentInterval = 30;
  if (repaymentFrequency === 'weekly') { 
    repaymentInterval = 7
  } else if (repaymentFrequency === 'fortnightly') {
    repaymentInterval = 14;
  }

  while (balance > 0) {
    if (days % repaymentInterval === 0) {
      balance = +balance - repayAmount;
    }
    balance = Math.round((+balance + ((+balance * +interestRate / 100) / 365)) * 100) / 100;
    days++;
    if (days % 365 === 0) {
      returnData.push(balance);
    }
    if (days >= 365 * 30) {
      return returnData;
    }
  }
  return returnData;
};

const makeData = (props: Props) => {
  let labels: string[] = [];
  const datasets = [];
  console.log(props.interest);
  for (let i = 0; i < props.scenarios; i++) {
    const series = makeSeries(props.repayments, props.principle, props.interest + i, props.repaymentFrequency);
    labels = series.map((val, index) => ('Year ' + (index + 1)));
    datasets.push({
      label: `${props.interest + i}% Interest Rate`,
      data: series,
      borderColor: i === 0 ? '#3f9c35' : '#77c26e',
      backgroundColor: i === 0 ? '#3f9c35' : '#77c26e',
    });
  }
  return {
    labels,
    datasets,
  };
}

interface Props {
  principle: number;
  repayments: number;
  interest: number;
  repaymentFrequency: string;
  scenarios: number;
}

export default function MortgageChart(props: Props) {
  return (
    <>
      <Line options={options} data={makeData(props)} />
    </>
  );
};