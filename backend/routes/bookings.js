import express from 'express'
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js'
import {updateBooking, deleteBooking , createBooking, getAllBooking, getBooking } from '../controllers/bookingController.js'
import Booking from '../models/Booking.js' // ✅ Required for inline route

const router = express.Router()

// Create a booking
router.post('/', verifyUser, createBooking)

// Get a single booking
router.get('/:id', verifyUser, getBooking)

// Get all bookings (admin only)
router.get('/', verifyAdmin, getAllBooking)

router.put('/:id', verifyUser, updateBooking);   // ✅ Edit booking
router.delete('/:id', verifyUser, deleteBooking); // ✅ Cancel booking

// ✅ Get all bookings of a specific user
router.get('/user/:userId', verifyUser, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
    res.status(200).json({ success: true, data: bookings })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to get bookings' })
  }
})

export default router
