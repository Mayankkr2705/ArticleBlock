const Article = require('../Model/Article.js');

// Helper function for error responses
const handleError = (res, err, message = 'Server error') => {
  console.error(err);
  return res.status(500).json({ error: message });
};

const createArticle = async (req, res) => {
  try {
    const data = req.body;

    const article = await Article.create({ 
      ...data   
    });
    return res.status(201).json(article);

  } catch (err) {
    return handleError(res, err);
  }
};

const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find({});
    return res.json(articles);
  } catch (err) {
    return handleError(res, err);
  }
};

const getArticleBySlug = async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    return res.json(article);
  } catch (err) {
    return handleError(res, err);
  }
};

const updateArticle = async (req, res) => {
  try {

    const article = await Article.findOneAndUpdate(
      { slug: req.params.slug }, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!article) {
      console.log('Article not found for update');
      return res.status(404).json({ error: 'Article not found' });
    }
    return res.json(article);
  } catch (err) {
    return handleError(res, err);
  }
};

const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findOneAndDelete({ slug: req.params.slug });
    if (!article) {
      console.log('Article not found for deletion');
      return res.status(404).json({ error: 'Article not found' });
    }
    return res.status(204).send();
  } catch (err) {
    return handleError(res, err);
  }
};

module.exports = {
  createArticle,
  getAllArticles,
  getArticleBySlug,
  updateArticle,
  deleteArticle
};
