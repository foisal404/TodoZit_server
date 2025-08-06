import mongoose from 'mongoose';

const KeepSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    notes: { type: String },
    tags: [String],
    userEmail: { type: String, required: true },
  },
  { timestamps: true },
);

const Keep = mongoose.model('Keep', KeepSchema);

export default Keep;
