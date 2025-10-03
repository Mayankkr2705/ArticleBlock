const express=require('express');
const {registeruser,login,updateuser,getuser,logout}=require('../Controllers/auth.controller.js');

const router = express.Router();

router.post('/register', registeruser);
router.post('/login', login);
router.post('/logout', logout);
router.get('/:id', getuser);
router.put('/:id', updateuser);

module.exports = router;