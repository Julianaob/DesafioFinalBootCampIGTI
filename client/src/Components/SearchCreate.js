import React from 'react';
import css from './Css/Style.module.css';

export default function SearchCreate({
  filterText,
  onFilter,
  onNewTransaction,
}) {
  const handleChangeFilterText = (event) => {
    const userText = event.target.value;
    onFilter(userText);
  };

  const handleButtonClick = () => {
    onNewTransaction();
  };

  return (
    <div className={`${css.alinharCampos}`}>
      <div>
        <button
          className="btn waves-light blue lighten-2"
          disabled={filterText.trim() !== ''}
          onClick={handleButtonClick}
        >
          + Novo Lançamento
        </button>

        <input
          type="text"
          placeholder="Filtrar"
          className="input-field"
          value={filterText}
          onChange={handleChangeFilterText}
        ></input>
      </div>
    </div>
  );
}
