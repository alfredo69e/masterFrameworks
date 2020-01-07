`use strict`

// cargar modulos para crear el servidor
const express = require('express');
const bodyParse = require('body-parser');

// ejecutar express
const app = express();


// cargar ficheros rutas
const articlesRoutes = require('./routes/article');

// middlewares
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// añadir prefijos rutas / Cargar Rutas
app.use(articlesRoutes);


// exportar modulos 
module.exports = app;