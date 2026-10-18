import express from 'express';
import { 
  createBooking, 
  getMyBookings, 
  getBookingById, 
  updateBookingStatus 
} from '../controllers/bookingController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', optionalAuth, createBooking);
router.get('/my', optionalAuth, getMyBookings);
router.get('/:id', getBookingById);
router.patch('/:id/status', updateBookingStatus);

export default router;
