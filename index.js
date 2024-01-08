const express = require('express');
const bodyParser = require('body-parser');
const morgan = require("morgan");
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require("swagger-jsdoc");

const createRoute = require('./routes/route');
const listEndpoints = require('express-list-endpoints');

const app = express();
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(morgan('dev'));

app.use('/internship', createRoute());

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ 'message': err.message });

    return;
});

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Internship',
            version: '1.0.0',
        },
    },
    apis: ['./controllers/*.js', '/home/crom/git/internship/docs/*.js'], // files containing annotations as above
};

const openapi = swaggerJsdoc(options);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(openapi));

console.log(listEndpoints(app));

app.listen(port, host, () => {
    console.log(`Server listening at http://${host}:${port}`)
});