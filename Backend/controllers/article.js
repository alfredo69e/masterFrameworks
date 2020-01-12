`use strict`

const validator = require('validator');
const Article = require('../models/article');
const fs = require('fs');
const path = require('path');


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
                image: params.image ? params.image : null
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
            query.limit(5);
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
        });
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

        let id = req.params.id
        let params = req.body;

        try {

            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);


        } catch (err) {
            return res.status(200).send({
                status: 'err',
                message: `Faltan datos por enviar !!!`
            });
        }

        if (validate_title && validate_content) {

            Article.findByIdAndUpdate({ _id: id }, params, { new: true }, (err, articleUpdate) => {
                if (err || !articleUpdate) {
                    return res.status(404).send({
                        status: 'err',
                        message: `El articulo no se ha actualizado`
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    message: `Articulo Actualizado`,
                    article: articleUpdate
                });

            });

        } else {
            return res.status(200).send({
                status: 'err',
                message: `La validacion no es correcta !!!`
            });
        }

    },

    delete: (req, res) => {
        let id = req.params.id;

        Article.findByIdAndDelete({ _id: id }, (err, articleRemove) => {
            if (err || !articleRemove) {
                return res.status(404).send({
                    status: 'err',
                    message: `El articulo no se ha Borrado ${err ? err : ''}`
                });
            }

            return res.status(200).send({
                status: 'success',
                message: `Articulo Borrado`,
                article: articleRemove
            });
        });
    },

    upload: (req, res) => {

        var file_name = 'Imagen no subida...';

        if (!req.files) {
            return res.status(404).send({
                status: 'err',
                message: file_name
            });
        }
        console.log(req.files);

        var file_path = req.files.file0;
        var file_split = req.files.file0.path.split('/');

        file_name = file_split[2];

        var ext = file_name.split('.');
        var file_ext = ext[1];

        if (file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif') {
            fs.unlink(file_path, (err) => {
                if (err) {
                    return res.status(404).send({
                        status: 'err',
                        message: `El articulo no se ha Borrado ${err ? err : ''}`
                    });
                }

                return res.status(200).send({
                    status: 'err',
                    message: `la extencion de la imagen no es valida`
                });
            })
        } else {

            let id = req.params.id;

            if (id) {
                Article.findByIdAndUpdate({ _id: id }, { image: file_name }, { new: true }, (err, articleUpdate) => {
                    if (err || !articleUpdate) {

                        fs.unlink(file_path, (err) => {
                            return res.status(404).send({
                                status: 'err',
                                message: `El articulo no se ha actualizado ${err ? err : ''}`
                            });
                        });
                    }

                    return res.status(200).send({
                        status: 'success',
                        message: `Articulo Actualizado`,
                        article: articleUpdate
                    });
                });
            } else {
                return res.status(200).send({
                    status: 'success',
                    image: file_name
                });
            }



        }
    },

    getImage: (req, res) => {
        let file = req.params.image;
        let path_file = `./upload/articles/${file}`;

        fs.exists(path_file, (existe) => {
            if (existe) {
                return res.sendFile(path.resolve(path_file));
            } else {
                return res.status(404).send({
                    status: 'err',
                    message: `La Imagne no Existe !!!`
                });
            }

        });
    },

    search: (req, res) => {
        let searchString = req.params.search;

        Article.find({
                "$or": [
                    { title: { "$regex": searchString, "$options": "i" } },
                    { content: { "$regex": searchString, "$options": "i" } },
                ]
            })
            .sort([
                ['date', 'descending']
            ])
            .exec((err, articles) => {
                if (err) {
                    return res.status(500).send({
                        status: 'err',
                        message: `Err al buscar los articulos ${err ? err : ''}`
                    });
                }
                if (!articles || articles.length == 0) {
                    return res.status(500).send({
                        status: 'success',
                        message: `No hay Respues registrada !!!`
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    articles
                });
            })
    }

}

module.exports = controller;