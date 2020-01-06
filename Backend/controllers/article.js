`use strict`

const validator = require('validator');
const Article = require('../models/article');

const controller = {

    save: (req, res) => {
        let params = req.body;

        try {

            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);



        } catch (err) {
            return res.status(200).send({
                message: `faltan datos por enviar`
            });
        }

        if (validate_title && validate_content) {

            let article = new Article({
                title: params.title,
                content: params.content,
                image: null
            });

            article.save((err, articleStore) => {
                if (err || !articleStore) {
                    return res.status(404).send({
                        status: 'err',
                        message: `El articulo no se ha guardado`
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    message: `Articulo Guardado`,
                    articleStore
                });

            });




        } else {
            return res.status(200).send({
                status: 'err',
                message: `faltan datos por enviar`
            });
        }


    },

    getArticles: (req, res) => {

        let query = Article.find({});
        let last = req.params.last;
        if (last || last != undefined) {
            query.limit(5)
        }

        query.sort(`-_id`).exec((err, articles) => {
            if (err) {
                return res.status(500).send({
                    status: 'err',
                    message: `Err al buscar los articulos ${err}`
                });
            }

            return res.status(200).send({
                status: 'success',
                articles
            });
        })
    },

    getArticle: (req, res) => {

        let id = req.params.id;

        if (!id || id == null) {
            return res.status(404).send({
                status: 'err',
                message: `el id el enviado esta vacio`
            });
        }

        Article.findById(id, (err, article) => {
            console.log(article);

            if (err || !article) {
                return res.status(404).send({
                    status: 'err',
                    message: `El Articulo no Existe !!!`
                });
            }

            return res.status(200).send({
                status: 'success',
                article
            });

        });

    },

    update: (req, res) => {

    }

}

module.exports = controller;