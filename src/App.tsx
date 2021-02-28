import React, {createRef, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {Line} from 'react-chartjs-2';

function App() {
  useEffect(() => {})

  const data = {
    labels: ['선수1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        label: '# of Votes',
        data: [50, 65, 25, 30, 43, 80, 90, 95, 100],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  }

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Line data={data} options={options} />
        <p>
          Edit <code>src/App.tsx</code> and save to reload!!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
