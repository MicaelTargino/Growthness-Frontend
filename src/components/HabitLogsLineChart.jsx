import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';  // Import the annotation plugin

// Register the required chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, annotationPlugin);  // Register the annotation plugin

const HabitLogsLineChart = ({ title, label, measure, dateStep = "1", startDateRange = "7", goalValue = 10}) => {
  // Helper function to generate the last 'n' dates in 'dd/mm' format
  const getLastNDates = (n, step) => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < n; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i * step);  // Decrement the date by 'i * step' days
      dates.push(date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' }));  // Format as dd/mm
    }
    
    return dates.reverse(); // Reverse to show the oldest date first
  };

  // Generate the labels for the last 'startDateRange' days
  const labels = getLastNDates(parseInt(startDateRange), parseInt(dateStep));

  let habitData = [15, 2, 15, 30, 20, 10, 40];

  // Ensure habitData is the correct length, matching the labels array
  const habitDataLength = labels.length;
  const dataPoints = habitData.slice(-habitDataLength); // Get the most recent data points

  // If not enough data, fill with placeholders (optional)
  const paddedData = dataPoints.length < habitDataLength 
    ? new Array(habitDataLength - dataPoints.length).fill(null).concat(dataPoints)
    : dataPoints;

  // Define the chart data
  const data = {
    labels: labels,  // Use the generated dynamic dates as labels
    datasets: [
      {
        label: label,
        data: paddedData,  // Use the dynamically padded data
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: `Objetivo (em ${measure})`,
        data: new Array(labels.length).fill(goalValue),  // Repeat the goalValue across all dates
        fill: false,
        backgroundColor: 'rgb(65, 127, 246)',
        borderColor: 'rgb(41, 97, 188)',
      },
    ],
  };

  // Define the chart options, including the annotation for the goal line
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
      // Add annotation plugin options to draw a constant line at the goal value
      annotation: {
        annotations: {
          goalLine: {
            type: 'line',
            yMin: goalValue,  // Set the constant line at the goal value
            yMax: goalValue,  // Ensures the line is straight across
            borderColor: 'rgb(65, 127, 246)',  // Red color for the goal line
            borderWidth: 2,
            label: {
              content: `Goal: ${goalValue}`,
              enabled: true,
              position: 'center',
              backgroundColor: 'rgb(65, 127, 246)',
              color: '#fff',
              font: {
                weight: 'bold',
              },
            },
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default HabitLogsLineChart;
