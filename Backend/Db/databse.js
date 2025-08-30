const mongoose=require('mongoose');
export async function connectDB(uri) {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}