import React, { useState } from 'react';
import { Chart } from 'react-google-charts';

function GraficTransactions({ currentExpenses }) {
  const { category } = currentExpenses;
  const [options, setOptions] = useState({
    title: 'Gráfico das Transações',
  });
  const [data, setData] = useState([
    ['Category', 'Quantidade'],
    ['Mercado', 100],
    ['Receita', 80],
    ['Transporte', 50],
  ]);
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Chart
            width={'500px'}
            height={'300px'}
            chartType="PieChart"
            data={data}
            options={options}
          />
        </div>
      </header>
    </div>
  );
}

export default GraficTransactions;
