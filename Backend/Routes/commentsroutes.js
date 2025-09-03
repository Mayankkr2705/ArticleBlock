const express = require('express');
const Comment =require( '../Model/Comments.js');
const { createCommentSchema, updateCommentSchema } =require ( '../Validation/Commentvalid.js');
const router = express.Router();


router.post('/', async (req, res) => {
	try {
		// validate input
		const parsed = createCommentSchema.safeParse(req.body);
		if (!parsed.success) {
			const messages = parsed.error.errors.map(e => e.message);
			return res.status(400).json({ error: messages });
		}
		const { articleId, content, parentId = undefined } = parsed.data;
		const { authorId } = req.body;
		if (!authorId) return res.status(400).json({ error: 'authorId is required' });

		const comment = await Comment.create({ articleId, authorId, content, parentId: parentId ?? null });
		if (parentId) {
			await Comment.findByIdAndUpdate(parentId, { $inc: { repliesCount: 1 } });
		}
		return res.status(201).json(comment);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: 'server error' });
	}
});

// Returns top-level comments (parentId == null) for an article, paginated
router.get('/article/:articleId', async (req, res) => {
	try {
		const { articleId } = req.params;
		const toPositiveInt = (v, fallback) => {
			const n = parseInt(v, 10);
			return Number.isInteger(n) && n > 0 ? n : fallback;
		};
		const page = toPositiveInt(req.query.page, 1);
		let limit = toPositiveInt(req.query.limit, 20);
		const MAX_LIMIT = 100; // protect DB from huge requests
		limit = Math.min(limit, MAX_LIMIT);
		const skip = (page - 1) * limit;

		const query = { articleId, parentId: null, deletedAt: null };
		const [items, total] = await Promise.all([
			Comment.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
			Comment.countDocuments(query),
		]);

		return res.json({ items, total, page, limit, hasMore: skip + items.length < total });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: 'server error' });
	}
});

// GET /api/comments/:id/replies
router.get('/:id/replies', async (req, res) => {
	try {
		const replies = await Comment.find({ parentId: req.params.id, deletedAt: null }).sort({ createdAt: 1 }).lean();
		return res.json(replies);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: 'server error' });
	}
});

// PUT /api/comments/:id
router.put('/:id', async (req, res) => {
	try {
		// validate input
		const parsed = updateCommentSchema.safeParse(req.body);
		if (!parsed.success) {
			const messages = parsed.error.errors.map(e => e.message);
			return res.status(400).json({ error: messages });
		}
		const { content } = parsed.data;

		const updated = await Comment.findByIdAndUpdate(req.params.id, { content, isEdited: true }, { new: true });
		if (!updated) return res.status(404).json({ error: 'not found' });
		return res.json(updated);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: 'server error' });
	}
});

// DELETE /api/comments/:id  (soft delete)
router.delete('/:id', async (req, res) => {
	try {
		const c = await Comment.findById(req.params.id);
		if (!c) return res.status(404).json({ error: 'not found' });
		if (c.deletedAt) return res.status(204).end();

		c.deletedAt = new Date();
		await c.save();

		if (c.parentId) {
			await Comment.findByIdAndUpdate(c.parentId, { $inc: { repliesCount: -1 } });
		}
		return res.status(204).end();
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: 'server error' });
	}
});

module.exports = router;