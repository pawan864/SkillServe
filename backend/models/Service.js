import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category',
    required: false
  },
  categorySlug: { type: String, required: true }, // e.g. 'technician', 'mechanic', 'tailor', 'sweeper'
  shortDesc: { type: String, required: true },
  fullDesc: { type: String },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  discountPercent: { type: Number, default: 0 },
  durationMinutes: { type: Number, default: 30 },
  rating: { type: Number, default: 4.8 },
  reviewsCount: { type: Number, default: 120 },
  image: { type: String, required: true },
  tags: [{ type: String }],
  includes: [{ type: String }],
  excludes: [{ type: String }],
  isBestseller: { type: Boolean, default: false },
  instantAvailable: { type: Boolean, default: true },
  warrantyDays: { type: Number, default: 30 }
}, { timestamps: true });

export default mongoose.model('Service', serviceSchema);
