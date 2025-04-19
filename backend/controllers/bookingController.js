import Booking from '../models/Booking.js';

export const createBooking = async (req, res) => {
  const newBooking = new Booking(req.body);
  try {
    const savedBooking = await newBooking.save();
    res.status(200).json({
      success: true,
      message: "Your tour is booked",
      data: savedBooking
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

export const getBooking = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Booking.findById(id);
    res.status(200).json({
      success: true,
      message: "Successful",
      data: book
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Booking not found"
    });
  }
};

export const getAllBooking = async (req, res) => {
  try {
    const books = await Booking.find();
    res.status(200).json({
      success: true,
      message: "Successful",
      data: books
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

export const updateBooking = async (req, res) => {
    try {
      const updatedBooking = await Booking.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json({ success: true, data: updatedBooking });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Update failed' });
    }
  };
  
  export const deleteBooking = async (req, res) => {
    try {
      await Booking.findByIdAndDelete(req.params.id);
      res.status(200).json({ success: true, message: 'Booking cancelled' });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Delete failed' });
    }
  };
  
