import express from 'express'
import { getSingleUser,deleteUser,updateUser, getAllUser } from '../controllers/userController.js';
const router=express.Router()

//update new user
router.put('/:id',updateUser);
//delete new user
router.delete('/:id',deleteUser);
//get single user
router.get('/:id',getSingleUser);
//get all user
router.get('/',getAllUser);

export default router