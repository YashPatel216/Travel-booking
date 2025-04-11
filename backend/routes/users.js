import express from 'express'
import { getSingleUser,deleteUser,updateUser, getAllUser } from '../controllers/userController.js';

import { verifyUser } from '../utils/verifyToken.js';
const router=express.Router()

//update new user
router.put('/:id',updateUser);
//delete new user
router.delete('/:id',deleteUser);
//get single user
router.get('/:id',verifyUser,getSingleUser);
//get all user
router.get('/',getAllUser);

export default router