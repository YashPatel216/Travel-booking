import express from 'express';
import { createTour, updateTour, getAllTour, deleteTour, getSingleTour, getTourBySearch, getFeaturedTour, getTourCount } from '../controllers/tourController.js';
import { verifyAdmin } from '../utils/verifyToken.js';
const router=express.Router()

// Get all tours (admin only)
// router.get('/', verifyUser, verifyAdmin, getAllTour); 

//create new tour
router.post('/', createTour);
//update new tour
router.put('/:id',updateTour);
//delete new tour
router.delete('/:id',deleteTour);
//get single toour
router.get('/:id',getSingleTour);
//get all tours
router.get('/',getAllTour);

router.get("/search/getTourBySearch", getTourBySearch );
router.get("/search/getFeaturedTours", getFeaturedTour );
router.get("/search/getTourCount", getTourCount );

export default router;