import mongoose from 'mongoose';

const userScheme = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
)

export default mongoose.model('User', userScheme)
