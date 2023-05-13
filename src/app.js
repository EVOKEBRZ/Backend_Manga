require('dotenv').config();

const express = require('express');

require('express-async-errors');

const {routeMangas,routePages, routeChapters}= require('./routes')

const errorMiddleware = require('./middlewares/errorMiddleware')

const app = express();

app.use(express.json());

app.use('/mangas',routeMangas);

app.use('/chapters',routeChapters);

app.use('/pages',routePages);

app.use(errorMiddleware)

module.exports ={
    app,
}
