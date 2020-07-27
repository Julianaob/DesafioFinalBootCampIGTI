import React from 'react';
import Modal from 'react-modal';
import { useState } from 'react';

const earningColor = '#27ae60';
const expenseColor = '#c0392b';

const title = 'Criação de lançamento';

Modal.setAppElement('#root');

function today() {
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  const today = `${year}-${month}-${day}`;
  return today;
}

export default function ModalCreate({
  currentExpenses = null,
  saveTransaction,
  isOpen,
  setOpen,
}) {
  const [submit, setSubmit] = useState();
  const [mode, setMode] = useState('insert');
  const [date, setDate] = useState(today());

  const [type, setType] = useState('-');
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [value, setValue] = useState();

  const {
    headerStyle,
    modalStyle,
    formStyle,
    radioStyle,
    radioButtonStyle,
    earningExpenseStyle,
    labelStyle,
  } = styles;

  const earningTextStyle =
    mode === 'insert'
      ? { color: earningColor, ...earningExpenseStyle }
      : earningExpenseStyle;

  const expenseTextStyle =
    mode === 'insert'
      ? { color: expenseColor, ...earningExpenseStyle }
      : earningExpenseStyle;

  const handleCloseClick = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    const data = { date, description, value, category, type };
    saveTransaction(data);
  };

  const handleRadioButton = (event) => {
    const newRadio = event.target.value;
    setType(newRadio);
  };
  const handleDescription = (event) => {
    const newDescription = event.target.value;
    setDescription(newDescription);
  };
  const handleCategory = (event) => {
    const newCategory = event.target.value;
    setCategory(newCategory);
  };
  const handleValue = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setDate(newDate);
  };

  return (
    <Modal isOpen={isOpen} contentLabel="Example Modal" style={modalStyle}>
      <div>
        <div style={headerStyle}>
          <h3 style={{ marginRight: '10px', fontWeight: 'bold' }}>{title}</h3>

          <button
            className="waves-effect waves-light btn red darken-4"
            onClick={handleCloseClick}
          >
            X
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={formStyle}>
            <div style={radioStyle}>
              <label style={{ ...radioButtonStyle }}>
                <input
                  name="expense-earning"
                  type="radio"
                  value="-"
                  checked={type === '-'}
                  onChange={handleRadioButton}
                />
                <span style={expenseTextStyle}>Despesa</span>
              </label>

              <label style={radioButtonStyle}>
                <input
                  name="expense-earning"
                  type="radio"
                  value="+"
                  checked={type === '+'}
                  onChange={handleRadioButton}
                />
                <span style={earningTextStyle}>Receita</span>
              </label>
            </div>

            <div className="input-field ">
              <input
                id="inputDescription"
                type="text"
                onChange={handleDescription}
                autoFocus
                required
              />
              <label
                style={labelStyle}
                htmlFor="inputDescription"
                className="active"
              >
                Descrição:
              </label>
            </div>

            <div className="input-field ">
              <input
                id="inputCategory"
                type="text"
                onChange={handleCategory}
                required
              />
              <label
                style={labelStyle}
                htmlFor="inputCategory"
                className="active"
              >
                Categoria:
              </label>
            </div>

            <div style={headerStyle}>
              <div className="input-field" style={{ marginRight: '10px' }}>
                <input
                  id="inputValue"
                  type="number"
                  min="0"
                  step="0.01"
                  onChange={handleValue}
                  required
                />
                <label
                  style={labelStyle}
                  htmlFor="inputValue"
                  className="active"
                >
                  Valor:
                </label>
              </div>

              <input
                placeholder="Data"
                type="date"
                className="browser-default"
                onChange={handleDateChange}
                value={date}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="waves-effect waves-light btn btn blue lighten-2"
            value="Enviar"
          >
            Enviar
          </button>
        </form>
      </div>
    </Modal>
  );
}

const styles = {
  modalStyle: {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  },

  headerStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  formStyle: {
    border: '1px solid lightgrey',
    borderRadius: '4px',
    padding: '10px',
    marginBottom: '10px',
  },

  radioStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '30px',
    color: '#64B5F6',
  },

  radioButtonStyle: {
    marginRight: '10px',
    marginLeft: '10px',
    padding: '20px',
  },

  earningExpenseStyle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  labelStyle: {
    color: '#64B5F6',
  },
};
