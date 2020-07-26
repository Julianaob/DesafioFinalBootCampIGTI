const mongoose = require('mongoose');

let dbSchema = mongoose.Schema({
  description: String,
  value: Number,
  category: String,
  year: Number,
  month: Number,
  day: Number,
  yearMonth: String,
  yearMonthDay: String,
  type: String,
});

dbSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const TransactionModel = mongoose.model(
  'transactions',
  dbSchema,
  'transactions'
);

module.exports = TransactionModel;
