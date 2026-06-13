const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'ToDo API',
    description: 'API for categories and tasks'
  },
  host: 'localhost:3000',
  schemes: ['http']
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);