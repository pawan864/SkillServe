import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  badge: { type: String, default: '15 Mins' },
  icon: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String },
  isPopular: { type: Boolean, default: true },
  displayOrder: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Category', categorySchema);
