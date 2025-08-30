require('dotenv').config();

const mongoose = require('mongoose');

const app =require( './app.js');
const port = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_ID)
.then(() => console.log('MongoDB connected successfully.'))
.catch(err => console.log('MongoDB connection error:', err));

app.listen(port, () => console.log(`API listening on :${port}`));

