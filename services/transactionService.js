const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

const create = async (req, res) => {
  var data = new Date(req.body.date);
  var month = data.getMonth() + 1;
  month = month < 10 ? `${'0'}${month}` : month;

  const transaction = new TransactionModel({
    description: req.body.description,
    value: req.body.value,
    category: req.body.category,
    year: data.getFullYear(),
    type: req.body.type,
    month: month,
    day: data.getDate() + 1,
    yearMonth: `${data.getFullYear()}-${month}`,
    yearMonthDay: req.body.date,
  });
  try {
    var result = await transaction.save();

    res.send({ message: 'Transaction registered success!' });
  } catch (error) {
    res.status(500).send({ message: error.message || 'Some error happened!' });
  }
};

const findAll = async (req, res) => {
  const yearMonth = req.params.yearMonth;

  try {
    const data = await TransactionModel.find({ yearMonth: yearMonth });
    if (data.length < 1) {
      res.status(404).send({ message: 'No Transactions Found!' });
    } else {
      res.send(data);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Error listing all documents!' });
  }
};

const findOne = async (req, res) => {
  const yearMonth = req.params.yearMonth;

  try {
    const data = await TransactionModel.findOne({ yearMonth: yearMonth });

    if (data.length < 1) {
      res.status(404).send({ message: `No Transactions Found!` });
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send({ message: 'Error fetching transaction!' });
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data empty!',
    });
  }
  var data = new Date(req.body.date);
  var month = (data.getMonth() + 1).toString();
  month = month < 10 ? `${'0'}${month}` : month;
  const id = req.params.id;
  try {
    const dataTransaction = TransactionModel.findByIdAndUpdate(
      { _id: id },
      {
        description: req.body.description,
        value: req.body.value,
        category: req.body.category,
        year: data.getFullYear(),
        type: req.body.type,
        month: month,
        day: data.getDate(),
        yearMonth: `${data.getFullYear()}-${month}`,
        yearMonthDay: req.body.date,
      },
      {
        new: true,
        upsert: true,
      },
      function (err, result) {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );

    if (dataTransaction.length < 1) {
      res.status(404).send({ message: `Transaction id: ${id} not found!` });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error to update id: ' + id });
  }
};

const remove = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await TransactionModel.findByIdAndDelete({ _id: id });
    if (data.length < 1) {
      res
        .status(404)
        .send({ message: `Transaction id: ${id} not find to delete!` });
    } else {
      res.send({ message: 'Transaction deleted with sucess!' });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
  }
};

const removeAll = async (req, res) => {
  try {
    const data = await Grades.deleteMany();

    if (data.length < 1) {
      res.status(404).send({ message: `Nothing transaction found to delete!` });
    } else {
      res.send({ message: 'Transactions deleted sucess!' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error to deleted!' });
  }
};

module.exports = { create, findAll, findOne, update, remove, removeAll };
