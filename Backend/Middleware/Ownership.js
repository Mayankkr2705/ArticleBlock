const Article = require('../Model/Article');

const mustOwnArticle = async (req, res, next) => {
  const { slug } = req.params;
  const article = await Article.findOne({ slug }).select('ownerId');
  if (!article) return res.status(404).json({ message: 'Not found' });
  if (article.ownerId.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};

module.exports = { mustOwnArticle };
