import React from 'react';
import M from 'materialize-css';

import Period from './Components/Period.js';

export default function App() {
  return (
    <div className="container">
      <h3 className="center">
        <b>Bootcamp Full Stack - Desafio Final</b>
      </h3>
      <h4 className="center">Controle Financeiro Pessoal</h4>
      <Period />
    </div>
  );
}
