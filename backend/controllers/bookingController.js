import Booking from '../models/Booking.js';

// Pre-configured expert partners for instant dispatch simulation
const samplePartners = [
  {
    name: 'Rajesh Sharma',
    phone: '+91 98765 43210',
    rating: 4.9,
    profession: 'Senior Technician (AC & Electrician)',
    photo: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=200&q=80',
    vehicleNumber: 'PB 09 AX 4421',
    etaMinutes: 14
  },
  {
    name: 'Vikram Singh',
    phone: '+91 98112 77654',
    rating: 4.95,
    profession: 'Master Two-Wheeler & Car Mechanic',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    vehicleNumber: 'PB 09 BK 8891',
    etaMinutes: 12
  },
  {
    name: 'Sunita Devi',
    phone: '+91 97723 11456',
    rating: 4.88,
    profession: 'Master Tailor & Alteration Specialist',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
    vehicleNumber: 'PB 08 CD 1029',
    etaMinutes: 18
  },
  {
    name: 'Amit Kumar',
    phone: '+91 99881 22334',
    rating: 4.92,
    profession: 'Deep Sanitization & Sweeper Specialist',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    vehicleNumber: 'PB 09 EZ 5543',
    etaMinutes: 11
  }
];

// In-memory fallback if MongoDB is not running
let inMemoryBookings = [];

// @desc    Create new service booking
// @route   POST /api/bookings
export const createBooking = async (req, res) => {
  try {
    const {
      items,
      bookingType,
      scheduledSlot,
      address,
      billDetails,
      appliedCoupon,
      paymentMethod,
      guestInfo
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No items in booking cart' });
    }

    if (!address || !address.street || !address.city || !address.contactPhone) {
      return res.status(400).json({ success: false, message: 'Complete delivery address is required' });
    }

    // Assign appropriate partner based on first category
    const firstCat = items[0]?.categorySlug || 'technician';
    let partner = samplePartners[0];
    if (firstCat === 'mechanic') partner = samplePartners[1];
    else if (firstCat === 'tailor') partner = samplePartners[2];
    else if (firstCat === 'sweeper') partner = samplePartners[3];

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const bookingPayload = {
      user: req.user ? req.user._id : null,
      guestInfo: guestInfo || {
        name: address.flatNo || 'Customer',
        phone: address.contactPhone
      },
      items,
      bookingType: bookingType || 'instant',
      scheduledSlot: scheduledSlot || null,
      address,
      billDetails,
      appliedCoupon,
      status: 'partner_assigned',
      assignedPartner: partner,
      otp,
      paymentMethod: paymentMethod || 'upi',
      paymentStatus: 'completed'
    };

    let savedBooking;
    try {
      savedBooking = await Booking.create(bookingPayload);
    } catch (dbErr) {
      // Fallback in-memory
      savedBooking = {
        _id: 'bk_' + Date.now(),
        ...bookingPayload,
        createdAt: new Date().toISOString()
      };
      inMemoryBookings.unshift(savedBooking);
    }

    res.status(201).json({
      success: true,
      message: 'Booking placed successfully! Professional arriving in 15 mins.',
      booking: savedBooking
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings/my
export const getMyBookings = async (req, res) => {
  try {
    let bookings = [];
    if (req.user) {
      try {
        bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 });
      } catch (err) {
        bookings = inMemoryBookings.filter(b => b.user?.toString() === req.user._id.toString());
      }
    } else {
      bookings = inMemoryBookings;
    }
    res.json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single booking by ID (for live tracking)
// @route   GET /api/bookings/:id
export const getBookingById = async (req, res) => {
  try {
    let booking = null;
    try {
      booking = await Booking.findById(req.params.id);
    } catch (err) {
      booking = inMemoryBookings.find(b => b._id.toString() === req.params.id);
    }

    if (!booking) {
      booking = inMemoryBookings.find(b => b._id.toString() === req.params.id);
    }

    if (booking) {
      res.json({ success: true, booking });
    } else {
      res.status(404).json({ success: false, message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update booking status (simulating live tracking or partner actions)
// @route   PATCH /api/bookings/:id/status
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    let booking = null;

    try {
      booking = await Booking.findById(req.params.id);
      if (booking) {
        booking.status = status;
        await booking.save();
      }
    } catch (err) {
      booking = inMemoryBookings.find(b => b._id.toString() === req.params.id);
      if (booking) {
        booking.status = status;
      }
    }

    if (booking) {
      res.json({ success: true, booking });
    } else {
      res.status(404).json({ success: false, message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
