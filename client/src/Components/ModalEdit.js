import React from 'react';
import Modal from 'react-modal';
import { useState } from 'react';

const earningColor = '#27ae60';
const expenseColor = '#c0392b';

const title = 'Edição de lançamento';

Modal.setAppElement('#root');

function today() {
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  const today = `${year}-${month}-${day}`;
  return today;
}

export default function ModalEdit({
  selectedTransaction = null,
  saveTransaction,
  isOpen,
  setOpen,
}) {
  const [submit, setSubmit] = useState();
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
  } = styles;

  const earningTextStyle = earningExpenseStyle;
  const expenseTextStyle = earningExpenseStyle;

  const handleCloseClick = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      date,
      description,
      value,
      category,
      type,
    };

    saveTransaction(data, selectedTransaction.id);
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

  React.useEffect(() => {
    const {
      description,
      value,
      category,
      yearMonthDay,
      type,
    } = selectedTransaction;

    setDescription(description);
    setValue(value);
    setCategory(category);
    setDate(yearMonthDay);
    setType(type);
  }, [selectedTransaction]);

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
                  value={type}
                  checked={type === '-' ? true : false}
                  onChange={handleRadioButton}
                  disabled
                />
                <span style={expenseTextStyle}>Despesa</span>
              </label>

              <label style={radioButtonStyle}>
                <input
                  name="expense-earning"
                  type="radio"
                  value={type}
                  checked={type === '+' ? true : false}
                  onChange={handleRadioButton}
                  disabled
                />
                <span style={earningTextStyle}>Receita</span>
              </label>
            </div>
            <div className="input-field ">
              <input
                id="inputDescription"
                type="text"
                value={description}
                onChange={handleDescription}
                autoFocus
                required
              />
              <label htmlFor="inputDescription" className="active">
                Descrição:
              </label>
            </div>

            <div className="input-field ">
              <input
                id="inputCategory"
                type="text"
                value={category}
                onChange={handleCategory}
                required
              />
              <label htmlFor="inputCategory" className="active">
                Categoria:
              </label>
            </div>

            <div style={headerStyle}>
              <div className="input-field" style={{ marginRight: '10px' }}>
                <input
                  id="inputValue"
                  type="number"
                  value={value}
                  min="0"
                  step="0.01"
                  onChange={handleValue}
                  required
                />
                <label htmlFor="inputValue" className="active ">
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
            className="waves-effect waves-light btn blue lighten-2"
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
};
