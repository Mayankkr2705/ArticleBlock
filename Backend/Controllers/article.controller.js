const Article = require('../Model/Article.js');
const { createArticleSchema, updateArticleSchema } = require('../Validation/Articlevalid.js');

// Helper function for validation
const validateRequest = (schema, data) => {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    const messages = parsed.error.errors.map(e => e.message);
    return { isValid: false, errors: messages };
  }
  return { isValid: true, data: parsed.data };
};
// Helper function for error responses
const handleError = (res, err, message = 'Server error') => {
  console.error(err);
  return res.status(500).json({ error: message });
};

const createArticle = async (req, res) => {
  try {
    const data = req.body;

    const article = await Article.create({ 
      ...data, 
      ownerId: req.user.id  
    });
    return res.status(201).json(article);

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
    // const validation = validateRequest(updateArticleSchema, req.body);
    // if (!validation.isValid) {
    //   return res.status(400).json({ error: validation.errors });
    // }

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
  getArticleBySlug,
  updateArticle,
  deleteArticle
};
