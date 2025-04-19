import express from 'express';
import {
  getSingleUser,
  deleteUser,
  updateUser,
  getAllUser
} from '../controllers/userController.js';
import { verifyUser } from '../utils/verifyToken.js';

const router = express.Router();


// Update user
router.put('/:id', verifyUser, updateUser);

// Delete user
router.delete('/:id', deleteUser);

// Get single user
router.get('/:id', verifyUser, getSingleUser);
router.get('/', getAllUser); // 🔓 Now public


export default router;
