const Article = require('../Model/Article');

const mustOwnArticle = async (req, res, next) => {
  const { slug } = req.params;
  const article = await Article.findOne({ slug }).select('owner');
  if (!article) return res.status(404).json({ message: 'Not found' });
  if (article.owner.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};

module.exports = { mustOwnArticle };
