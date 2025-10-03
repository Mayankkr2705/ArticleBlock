const Comment = require('../Model/Comments.js');
// Helper function for error responses
const handleError = (res, err, message = 'Server error') => {
  console.error(err);
  return res.status(500).json({ error: message });
};

const createComment = async (req, res) => {
  try {
    const { articleId, content, authorId, parentId = undefined } = req.body;
    if (!authorId) {
      return res.status(400).json({ error: 'authorId is required' });
    }

    const comment = await Comment.create({ 
      articleId, 
      authorId, 
      content, 
      parentId: parentId ?? null 
    });

    if (parentId) {
      await Comment.findByIdAndUpdate(parentId, { $inc: { repliesCount: 1 } });
    }

    return res.status(201).json(comment);
  } catch (err) {
    return handleError(res, err);
  }
};

const getCommentsByArticle = async (req, res) => {
  try {
    const { articleId } = req.params;
    const toPositiveInt = (v, fallback) => {
      const n = parseInt(v, 10);
      return Number.isInteger(n) && n > 0 ? n : fallback;
    };
    
    const page = toPositiveInt(req.query.page, 1);
    let limit = toPositiveInt(req.query.limit, 20);
    const MAX_LIMIT = 100;
    limit = Math.min(limit, MAX_LIMIT);
    const skip = (page - 1) * limit;

    const query = { articleId, parentId: null, deletedAt: null };
    const [items, total] = await Promise.all([
      Comment.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Comment.countDocuments(query),
    ]);

    return res.json({ 
      items, 
      total, 
      page, 
      limit, 
      hasMore: skip + items.length < total 
    });
  } catch (err) {
    return handleError(res, err);
  }
};

const getCommentReplies = async (req, res) => {
  try {
    const replies = await Comment.find({ 
      parentId: req.params.id, 
      deletedAt: null 
    }).sort({ createdAt: 1 }).lean();
    if (!replies) {
      return res.status(404).json({ error: 'No replies found' });
    }
    
    return res.json(replies);
  } catch (err) {
    return handleError(res, err);
  }
};

const updateComment = async (req, res) => {
  try {
  
    const { content } = req.body;
    const updated = await Comment.findByIdAndUpdate(
      req.params.id, 
      { content, isEdited: true }, 
      { new: true }
    );

    if (!updated) {
      console.log('Comment not found for update:', req.params.id);
      return res.status(404).json({ error: 'Comment not found' });
    }
    
    return res.json(updated);
  } catch (err) {
    return handleError(res, err);
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    
    if (comment.deletedAt) {
      return res.status(204).send();
    }

    comment.deletedAt = new Date();
    await comment.save();

    if (comment.parentId) {
      await Comment.findByIdAndUpdate(comment.parentId, { $inc: { repliesCount: -1 } });
    }
    
    return res.status(204).send();
  } catch (err) {
    return handleError(res, err);
  }
};

module.exports = {
  createComment,
  getCommentsByArticle,
  getCommentReplies,
  updateComment,
  deleteComment
};
