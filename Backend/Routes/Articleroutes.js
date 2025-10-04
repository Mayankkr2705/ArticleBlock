const express=require('express');
const { mustOwnArticle } =require('../Middleware/Ownership.js');
const { requireAuth }=require('../Middleware/Auth.js');
const {createArticle,getArticleBySlug,updateArticle,deleteArticle,getAllArticles}=require('../Controllers/article.controller.js');


const router = express.Router();
router.post('/create', requireAuth, createArticle);
router.get('/:slug', getArticleBySlug);
router.get('/', requireAuth, getAllArticles);
router.put('/:slug', requireAuth, mustOwnArticle, updateArticle);
router.delete('/:slug', requireAuth, mustOwnArticle, deleteArticle);

module.exports = router;
