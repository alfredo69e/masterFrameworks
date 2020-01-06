`use strict`

const mongoose = require('mongoose');
const app = require('./app');
const port = 3900;

mongoose.set(`useFindAndModify`, false);
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost/api_rest_blog`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`La coneccion a la base de datos se a realiza Bien!!! `);
        // crear server
        app.listen(port, () => {
            console.log(`servidor corriendo en http://localhost:${port}`);

        })
    })
    .catch((err) => {

    })