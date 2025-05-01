import express from 'express'
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js'
import { updateBooking, deleteBooking, createBooking, getAllBooking, getBooking } from '../controllers/bookingController.js'
import Booking from '../models/Booking.js' // ✅ Required for inline route

const router = express.Router()

// Create a booking
router.post('/', createBooking)

// Get a single booking
router.get('/:id', getBooking)

// Get all bookings (admin only)
router.get('/', verifyAdmin, getAllBooking)

router.put('/:id', updateBooking);   // ✅ Edit booking
router.delete('/:id', deleteBooking); // ✅ Cancel booking

// ✅ Get all bookings of a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
    res.status(200).json({ success: true, data: bookings })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to get bookings' })
  }
})

export default router
