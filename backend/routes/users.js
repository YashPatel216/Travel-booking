import express from 'express'
import { getSingleUser,deleteUser,updateUser, getAllUser } from '../controllers/userController.js';
import { verifyUser } from '../utils/verifyToken.js';
const router=express.Router()

//update new user
router.put('/:id',verifyUser,updateUser);
//delete new user
router.delete('/:id',verifyUser,deleteUser);
//get single user
router.get('/:id',verifyUser,getSingleUser);
//get all user
router.get('/',verifyUser,getAllUser);

export default router