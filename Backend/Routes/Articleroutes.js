const express=require('express');
const Article =require('../Model/Article.js');
const { mustOwnArticle } =require('../Middleware/Ownership.js');
const { requireAuth }=require('../Middleware/Auth.js');
const { createArticleSchema, updateArticleSchema } =require('../Validation/Articlevalid.js');

const router = express.Router();

// Create
router.post('/', requireAuth, async (req, res) => {
  try {
    const parsed = createArticleSchema.safeParse(req.body);
    if (!parsed.success) {
      const messages = parsed.error.errors.map(e => e.message);
      return res.status(400).json({ error: messages });
    }
    const data = parsed.data;
    const article = await Article.create({ ...data, owner: req.user.id });
    return res.status(201).json(article);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error' });
  }
});

// Public read by slug
router.get('/:slug', async (req, res) => {
  try {
    const doc = await Article.findOne({ slug: req.params.slug });
    if (!doc) return res.sendStatus(404);
    return res.json(doc);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error' });
  }
});

// Update (owner only)
router.put('/:slug', requireAuth, mustOwnArticle, async (req, res) => {
  try {
    const parsed = updateArticleSchema.safeParse(req.body);
    if (!parsed.success) {
      const messages = parsed.error.errors.map(e => e.message);
      return res.status(400).json({ error: messages });
    }
    const updates = parsed.data;
    const doc = await Article.findOneAndUpdate({ slug: req.params.slug }, updates, { new: true, runValidators: true });
    if (!doc) return res.sendStatus(404);
    return res.json(doc);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error' });
  }
});

// Delete (owner only)
router.delete('/:slug', requireAuth, mustOwnArticle, async (req, res) => {
  try {
    await Article.findOneAndDelete({ slug: req.params.slug });
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
