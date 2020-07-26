import axios from 'axios';

//Define a URL base da origem para consumo do servico
export default axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3001/api/transaction'
      : 'https://financialproject-desafio-final.herokuapp.com/api/transaction',
  headers: {
    'Content-type': 'application/json',
  },
  //comentario para
});
