import express from 'express';
import { createTour, updateTour, getAllTour, deleteTour, getSingleTour, getTourBySearch, getFeaturedTour, getTourCount } from '../controllers/tourController.js';


const router=express.Router()
//create new tour
router.post('/',createTour);
//update new tour
router.put('/:id',updateTour);
//delete new tour
router.delete('/:id',deleteTour);
//create new tour
router.get('/:id',getSingleTour);
//create new tour
router.get('/',getAllTour);

router.get("/search/getTourBySearch", getTourBySearch );
router.get("/search/getFeaturedTours", getFeaturedTour );
router.get("/search/getTourCount", getTourCount );

export default router;
