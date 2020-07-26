import React, { useState, useEffect } from 'react';
import css from './Css/LabelValues.module.css';
import { formatNumber } from '../helpers/FormatHelper.js';

const colorGreen = '#16a099';
const colorRed = '#c03911';
const colorBlack = '#000000';

export default function LabelValues({ labelValues }) {
  const {
    countTransactions,
    totalEarnings,
    totalExpenses,
    balance,
  } = labelValues;

  const { containerStyle, earningStyle, expenseStyle, postingsStyle } = styles;
  const balanceStyle = balance >= 0 ? earningStyle : expenseStyle;
  return (
    <div className={css.alinharCampos}>
      <div className={`${'row'} ${css.divLabels} `}>
        <div className="input-field col s3">
          <label style={postingsStyle} className={css.classBold}>
            Lançamentos: {countTransactions}
          </label>
        </div>
        <div className="input-field col s3">
          <label style={earningStyle} className={`${css.classBold}  `}>
            Receitas: {formatNumber(totalEarnings)}
          </label>
        </div>
        <div className="input-field col s3">
          <label style={expenseStyle} className={`${css.classBold}`}>
            Despesas: {formatNumber(totalExpenses)}
          </label>
        </div>
        <div className="input-field col s3">
          <label style={balanceStyle} className={`${css.classBold}`}>
            Saldo: {formatNumber(balance)}
          </label>
        </div>
      </div>
    </div>
  );
}
const styles = {
  containerStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: '5px',
    margin: '10px',
    border: '1px solid lightgrey',
    borderRadius: '4px',
  },

  earningStyle: {
    color: colorGreen,
  },

  expenseStyle: {
    color: colorRed,
  },
  postingsStyle: {
    color: colorBlack,
  },
};
