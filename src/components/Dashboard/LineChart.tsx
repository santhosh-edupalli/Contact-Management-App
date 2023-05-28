import React from 'react';
import 'chartjs-adapter-moment';
import moment from 'moment';
import { Line } from 'react-chartjs-2';
import { GraphData } from '../../types';
import { Chart, registerables,ChartOptions } from 'chart.js';

interface Props {
  graphData: GraphData;
}

const LineChart: React.FC<Props> = ({ graphData }) => {
    Chart.register(...registerables);

    const data = {
        labels: Object.keys(graphData.cases),
        datasets: [
        {
            label: 'Cases',
            data: Object.values(graphData.cases),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            pointRadius: 0,
        },
        {
            label: 'Deaths',
            data: Object.values(graphData.deaths),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            pointRadius: 0,
        },
        {
            label: 'Recovered',
            data: Object.values(graphData.recovered),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            pointRadius: 0,
        },
        ],
    };

    const options: ChartOptions<'line'> = {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
              displayFormats: {
                day: 'MMM D',
              },
            },
            ticks:{
                callback: (value) => moment(value).format('MMM D'),
            }
          },
          y: {
            ticks: {
              callback: (value) => value.toLocaleString(),
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
                title: (context) => {
                    const date = context[0].parsed.x || '';
                    return `${moment(date).format('MMM D YYYY')}`
                },
                label: (context) => {
                    const datasetLabel = context.dataset.label || '';
                    const value = context.parsed.y || 0;
                    return `${datasetLabel}: ${value.toLocaleString()}`;
                },
            },
          },
        },
      };
      

  

  return <Line data={data} options={options} />;
};

export default LineChart;
