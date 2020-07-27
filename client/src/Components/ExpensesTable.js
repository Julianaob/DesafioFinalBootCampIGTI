import React from 'react';
import { formatNumber } from '../helpers/FormatHelper';
import Action from './Action';
import css from './Css/LabelValues.module.css';

const colorGreen = 'rgb(22, 160, 153)';
const colorRed = 'rgb(192, 57, 17)';
const colorGrey = 'rgb(166, 183, 194)';

export default function ExpensesTable({ currentExpenses, onEdit, onDelete }) {
  const {
    actionStyle,
    earningStyle,
    expenseStyle,
    summuryStyle,
    centerStyle,
  } = styles;

  const handleActionClick = (type, id) => {
    if (type === 'edit') {
      onEdit(id);
      return;
    }

    if (type === 'delete') {
      onDelete(id);
      return;
    }
  };

  return (
    <div>
      <table className="highlight">
        <thead>
          <tr style={summuryStyle}>
            <th style={centerStyle}>Dia</th>
            <th style={centerStyle}>Categoria</th>
            <th style={centerStyle}>Descrição</th>
            <th style={centerStyle}>Valor</th>
            <th style={centerStyle}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentExpenses.map((item, index) => {
            return (
              <tr key={index}>
                <td className={`${css.classBold}`}>{item.day}</td>
                <td
                  style={item.type == '+' ? earningStyle : expenseStyle}
                  className={css.classBold}
                >
                  {item.category}
                </td>
                <td
                  style={item.type == '+' ? earningStyle : expenseStyle}
                  className={css.classBold}
                >
                  {item.description}
                </td>
                <td
                  style={item.type == '+' ? earningStyle : expenseStyle}
                  className={`${css.classBold}`}
                >
                  {formatNumber(item.value)}
                </td>
                <td className={`${css.classBold}`}>
                  <Action
                    type="edit"
                    onActionClick={handleActionClick}
                    id={item.id}
                  />
                  <Action
                    type="delete"
                    onActionClick={handleActionClick}
                    id={item.id}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
const styles = {
  actionStyle: {
    fontSize: '1.2rem',
    cursor: 'pointer',
    marginRight: '10px',
  },
  earningStyle: {
    color: colorGreen,
    fontSize: 19,
  },

  expenseStyle: {
    color: colorRed,
    fontSize: 19,
  },
  summuryStyle: {
    backgroundColor: colorGrey,
  },
  centerStyle: { textAlign: 'center', fontSize: 21 },
};
