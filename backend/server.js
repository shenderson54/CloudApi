const express = require('express');
const routes = require('./routes/apis');
const cors = require('cors')
const port = 3000
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
app.use(cors())
app.use(express.json());
app.use('/', routes);



const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'CloudAPI',
            version: '1.0.0',
        },
    },
    apis: [`${__dirname}/routes/apis.js`], // files containing annotations as above
};


const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.listen(port, () => console.log(`Running the best code on port: ${port}.`));