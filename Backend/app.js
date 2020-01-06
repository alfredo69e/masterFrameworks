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


// añadir prefijos rutas / Cargar Rutas
app.use(articlesRoutes);


// exportar modulos 
module.exports = app;