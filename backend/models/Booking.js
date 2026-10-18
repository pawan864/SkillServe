import mongoose from 'mongoose';

const bookingItemSchema = new mongoose.Schema({
  serviceId: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  durationMinutes: { type: Number, default: 30 },
  categorySlug: { type: String }
});

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  guestInfo: {
    name: String,
    phone: String,
    email: String
  },
  items: [bookingItemSchema],
  bookingType: { 
    type: String, 
    enum: ['instant', 'scheduled'], 
    default: 'instant' 
  },
  scheduledSlot: {
    date: { type: String },
    timeWindow: { type: String }
  },
  address: {
    type: { type: String, default: 'home' },
    flatNo: { type: String, required: true },
    street: { type: String, required: true },
    landmark: { type: String },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    contactPhone: { type: String, required: true }
  },
  billDetails: {
    itemTotal: { type: Number, required: true },
    visitingFee: { type: Number, default: 0 },
    safetyFee: { type: Number, default: 15 },
    tip: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    finalAmount: { type: Number, required: true }
  },
  appliedCoupon: { type: String },
  status: {
    type: String,
    enum: ['confirmed', 'partner_assigned', 'on_the_way', 'in_progress', 'completed', 'cancelled'],
    default: 'partner_assigned'
  },
  assignedPartner: {
    name: { type: String, default: 'Rajesh Sharma' },
    phone: { type: String, default: '+91 98765 43210' },
    rating: { type: Number, default: 4.9 },
    profession: { type: String, default: 'Senior Technician' },
    photo: { type: String, default: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150' },
    vehicleNumber: { type: String, default: 'PB 09 AX 4421' },
    etaMinutes: { type: Number, default: 14 }
  },
  otp: { type: String, default: () => Math.floor(1000 + Math.random() * 9000).toString() },
  paymentMethod: { 
    type: String, 
    enum: ['cash', 'upi', 'card', 'netbanking'], 
    default: 'upi' 
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'completed'
  }
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);
