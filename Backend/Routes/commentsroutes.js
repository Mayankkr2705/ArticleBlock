const express = require('express');
const { 
  createComment,
  getCommentsByArticle,
  getCommentReplies,
  updateComment,
  deleteComment
} = require('../Controllers/comments.controller.js');
const router = express.Router();

router.post('/create', createComment);
router.get('/article/:articleId', getCommentsByArticle);
router.get('/:id/replies', getCommentReplies);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

module.exports = router;