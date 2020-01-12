`use strict`

const express = require('express');
const articleCtrls = require('../controllers/article');
const multipart = require('connect-multiparty');
const md_upload = multipart({ uploadDir: './upload/articles' });

const router = express.Router();

router.post('/save', articleCtrls.save);
router.get('/articles/:last?', articleCtrls.getArticles);
router.get('/article/:id', articleCtrls.getArticle);
router.put('/article/:id', articleCtrls.update);
router.delete('/article/:id', articleCtrls.delete);
router.post('/upload-image/:id?', md_upload, articleCtrls.upload);
router.get('/get-image/:image', articleCtrls.getImage);
router.get('/search/:search', articleCtrls.search);


module.exports = router;