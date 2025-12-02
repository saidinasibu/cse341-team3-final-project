const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Next Chapter Books API',
    description: 'API documentation for the bookstore project'
  },
  host: 'cse341-team3-final-project.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
