const express = require('express');
const { 
  createComment,
  getCommentsByArticle,
  getCommentReplies,
  updateComment,
  deleteComment
} = require('../Controllers/comments.controller.js');
const { mustOwnComment } = require('../Middleware/comment.js');
const { requireAuth } = require('../Middleware/Auth.js');
const router = express.Router();

router.post('/create', requireAuth, createComment);
router.get('/article/:articleId', getCommentsByArticle);
router.get('/:id/replies', getCommentReplies);
router.put('/:id', requireAuth, mustOwnComment, updateComment);
router.delete('/:id', requireAuth, mustOwnComment, deleteComment);

module.exports = router;
