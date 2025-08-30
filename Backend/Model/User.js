
import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    username: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    avatarUrl: { type: String },
    password:{type:String,required:true},
  },
  { timestamps: true }
);
 
export default model('User', UserSchema);
