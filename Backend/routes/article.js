`use strict`

const express = require('express');
const articleCtrls = require('../controllers/article');

const router = express.Router();

router.post('/save', articleCtrls.save);
router.get('/articles/:last?', articleCtrls.getArticles);
router.get('/article/:id', articleCtrls.getArticle);

module.exports = router;