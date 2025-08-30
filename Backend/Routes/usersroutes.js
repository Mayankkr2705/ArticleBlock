const express=require('express');
const bcrypt = require('bcryptjs');
const User =require('../Model/User.js');
const { signupSchema, loginSchema } =require('../Validation/Authvalid.js');

const router = express.Router();

// POST /api/users/register
router.post('/register', async (req, res) => {
	try {
		// validate input
		const parsed = signupSchema.safeParse(req.body);
		if (!parsed.success) {
			const messages = parsed.error.errors.map(e => e.message);
			return res.status(400).json({ error: messages });
		}
		const { email, username, password, avatarUrl } = parsed.data;

		const existing = await User.findOne({ $or: [{ email }, { username }] });
		if (existing) return res.status(409).json({ error: 'email or username already in use' });

		const hashed = await bcrypt.hash(password, 10);
		const user = await User.create({ email, username, password: hashed, avatarUrl });
		const u = user.toObject();
		delete u.password;
		return res.status(201).json(u);
	} catch (err) {
		return res.status(500).json({ error: 'server error' });
	}
});

// POST /api/users/login
router.post('/login', async (req, res) => {
	try {
		// validate input
		const parsed = loginSchema.safeParse(req.body);
		if (!parsed.success) {
			const messages = parsed.error.errors.map(e => e.message);
			return res.status(400).json({ error: messages });
		}
		const { email, password } = parsed.data;

		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ error: 'invalid credentials' });

		const ok = await bcrypt.compare(password, user.password);
		if (!ok) return res.status(400).json({ error: 'invalid credentials' });

		const u = user.toObject();
		delete u.password;
		return res.json(u);
	} catch (err) {
		return res.status(500).json({ error: 'server error' });
	}
});

// GET /api/users/:id
router.get('/:id', async (req, res) => {
	try {
		const user = await User.findById(req.params.id).select('-password');
		if (!user) return res.status(404).json({ error: 'not found' });
		return res.json(user);
	} catch (err) {
		return res.status(500).json({ error: 'server error' });
	}
});

// PUT /api/users/:id
router.put('/:id', async (req, res) => {
	try {
		const updates = {};
		const allowed = ['email', 'username', 'avatarUrl', 'password'];
		for (const k of allowed) if (req.body[k] !== undefined) updates[k] = req.body[k];

		if (updates.password) {
			updates.password = await bcrypt.hash(updates.password, 10);
		}

		const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
		if (!user) return res.status(404).json({ error: 'not found' });
		return res.json(user);
	} catch (err) {
		return res.status(500).json({ error: 'server error' });
	}
});

export default router;