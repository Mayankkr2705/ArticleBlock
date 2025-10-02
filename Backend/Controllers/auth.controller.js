const bcrypt = require('bcryptjs');
const User = require('../Model/User.js');
const { signupSchema, loginSchema } = require('../Validation/Authvalid.js');

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
//remove pass for sec
const sanitizeUser = (user) => {
  const u = user.toObject();
  delete u.password;
  return u;
};

const registeruser = async (req, res) => {
  try {
    const { email, username, password} = req.body;
    console.log(email, username, password);

    const existing = await User.findOne({ $or: [{ email }, { username }] });
    console.log(existing);
    
    if (existing) {
      console.log('Email or username already in use');
      return res.status(409).json({ error: 'Email or username already in use' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, username, password: hashed, avatarUrl: "hello" });
    
    return res.status(201).json(sanitizeUser(user));
  } catch (err) {
    return handleError(res, err);
  }
};

const login = async (req, res) => {
  try {
    // const validation = validateRequest(loginSchema, req.body);
    // if (!validation.isValid) {
    //   return res.status(400).json({ error: validation.errors });
    // }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password');  
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    return res.json(sanitizeUser(user));
  } catch (err) {
    return handleError(res, err);
  }
};

const updateuser = async (req, res) => {
  try {
    const updates = {};
    const allowed = ['email', 'username', 'avatarUrl', 'password'];
    
    for (const key of allowed) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }
    
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id, 
      updates, 
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    return res.json(user);
  } catch (err) {
    return handleError(res, err);
  }
};

const getuser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(user);
  } catch (err) {
    return handleError(res, err);
  }
};

const deleteuser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(204).send();
  } catch (err) {
    return handleError(res, err);
  }
};

module.exports = {
  registeruser,
  login,
  updateuser,
  getuser
};