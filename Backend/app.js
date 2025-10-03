const express = require('express');
const cors = require('cors');

const articleRoutes =require( './Routes/Articleroutes.js');
const authRoutes =require( './Routes/usersroutes.js');
const commentRoutes =require( './Routes/commentsroutes.js');

const app = express();
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/comments', commentRoutes);

module.exports = app;
