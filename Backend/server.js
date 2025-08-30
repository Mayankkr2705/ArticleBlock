require('dotenv').config();

const { connectDB }=require('../Db/databse.js');
const app =require( './app.js');

const port = process.env.PORT || 4000;

await connectDB(process.env.MONGO_URI);
app.listen(port, () => console.log(`API listening on :${port}`));

