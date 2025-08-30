
import Comment from '../Model/Comments.js'; 

export async function mustOwnComment(req, res, next) {
  const { id } = req.params;
  const c = await Comment.findById(id).select('authorId');
  if (!c) {
    return res.status(404).json({ message: 'Not found' });
  }
  if (c.authorId.toString() !== req.user?.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
}