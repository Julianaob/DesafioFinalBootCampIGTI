const express = require('express');
const app = express.Router();

const transactionService = require('../services/transactionService.js');

app.get('/:yearMonth', transactionService.findAll);
app.post('/', transactionService.create);
app.get('/:id', transactionService.findOne);
app.put('/:id', transactionService.update);
app.delete('/:id', transactionService.remove);

module.exports = app;
