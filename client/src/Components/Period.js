import React from 'react';
import { periodHelper, monthsHelper } from '../helpers/PeriodHelper';
import M from 'materialize-css';
import ExpensesTable from './ExpensesTable';
import LabelValues from './LabelValues.js';
import api from '../http-common.js';
import SearchCreate from './SearchCreate';
import ModalCreate from './ModalCreate';
import ModalEdit from './ModalEdit';
import css from './Css/Style.module.css';
import GraficTransactions from './GraficTransactions';

export default function Period() {
  const [currentPeriod, setCurrentPeriod] = React.useState(periodHelper[0]);
  const [currentExpenses, setcurrentExpenses] = React.useState([]);
  const [selectedTransaction, setSelectedTransaction] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = React.useState(false);
  const [filterTransactions, setFilterTransactions] = React.useState([]);
  const [labelValues, setLabelValues] = React.useState([]);
  const [filterText, setFilterText] = React.useState('');

  React.useEffect(() => {
    M.AutoInit();
  }, []);

  const handleInsertTransaction = () => {
    setIsModalOpen(true);
  };

  const updateCurrentExpenses = async (period) => {
    if (period) {
      const result = await api.get(period);
      const ordenatedResult = result.data.sort(function (a, b) {
        return a.day - b.day;
      });
      setcurrentExpenses(ordenatedResult);
    }
  };

  React.useEffect(() => {
    updateCurrentExpenses(currentPeriod);
  }, [currentPeriod]);

  React.useEffect(() => {
    const data = async () => {
      const countTransactions = currentExpenses.length;
      const totalEarnings = currentExpenses
        .filter((transaction) => transaction.type === '+')
        .reduce((totalEarnings, transaction) => {
          return totalEarnings + transaction.value;
        }, 0);

      const totalExpenses = currentExpenses
        .filter((transaction) => transaction.type === '-')
        .reduce((totalExpenses, transaction) => {
          return totalExpenses + transaction.value;
        }, 0);

      const balance = totalEarnings - totalExpenses;

      setLabelValues({
        countTransactions,
        totalEarnings,
        totalExpenses,
        balance,
      });
    };
    data();
  }, [currentExpenses]);

  React.useEffect(() => {
    if (filterText.trim() === '') {
      setFilterTransactions([...currentExpenses]);
    } else {
      const lowerCaseFilter = filterText.toLowerCase();

      const newFilteredTransactions = currentExpenses.filter((transaction) => {
        return transaction.description.toLowerCase().includes(lowerCaseFilter);
      });

      setFilterTransactions(newFilteredTransactions);
    }
  }, [filterText, currentExpenses]);

  const handlePeriodChange = (event) => {
    setCurrentPeriod(event.target.value);
  };

  const handleFilter = (filteredText) => {
    setFilterText(filteredText);
  };

  const handleModalSave = async (newInsert) => {
    const postedTransaction = await api.post('', newInsert);
    updateCurrentExpenses(currentPeriod);
    setIsModalOpen(false);
  };

  const handleModalSaveEdit = async (newUpdate, id) => {
    const postedTransaction = await api.put(id, newUpdate);
    updateCurrentExpenses(currentPeriod);
    setIsModalOpenEdit(false);
  };

  const handleDelete = async (id) => {
    await api.delete(id);
    const newTransactions = currentExpenses.filter(
      (transaction) => transaction.id !== id
    );

    setcurrentExpenses(newTransactions);
    setFilterTransactions(newTransactions);
  };

  const handleEdit = (id) => {
    const newSelectedTransaction = currentExpenses.find(
      (transaction) => transaction.id === id
    );

    setSelectedTransaction(newSelectedTransaction);
    setIsModalOpenEdit(true);
  };
  const { centered, boldField } = styles;

  return (
    <div>
      <div style={styles.centered}>
        <select
          className="browser-default"
          value={currentPeriod}
          onChange={handlePeriodChange}
          style={boldField}
        >
          {monthsHelper.map((period) => {
            return (
              <option key={period.period} value={period.period}>
                {`${period.desc}/${period.year}`}
              </option>
            );
          })}
        </select>
      </div>
      <LabelValues labelValues={labelValues} />
      <br></br>
      <SearchCreate
        filterText={filterText}
        onFilter={handleFilter}
        onNewTransaction={handleInsertTransaction}
      />
      <br></br>

      <ExpensesTable
        currentExpenses={filterTransactions}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isModalOpen && (
        <ModalCreate
          isOpen={isModalOpen}
          currentExpenses={currentExpenses}
          saveTransaction={handleModalSave}
          setOpen={setIsModalOpen}
        />
      )}

      {isModalOpenEdit && (
        <ModalEdit
          isOpen={isModalOpenEdit}
          selectedTransaction={selectedTransaction}
          saveTransaction={handleModalSaveEdit}
          setOpen={setIsModalOpenEdit}
        />
      )}
    </div>
  );
}
const styles = {
  centered: {
    display: 'flex',
    flexdirection: 'row',
    alignitems: 'center',
    justifycontent: 'center',
    margin: '10px',
  },

  boldField: { fontWeight: 'bold', fontSize: 20, width: '200px' },
};
