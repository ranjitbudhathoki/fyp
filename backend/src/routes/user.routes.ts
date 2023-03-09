import express from 'express';

import {
  updateProfile,
  getPostByUserId,
  getCurrentUser,
} from '../controllers/user.controllers';

const router = express.Router();

router.get('/me', getCurrentUser);

router.patch('/:id', updateProfile);

router.get('/:id/posts/', getPostByUserId);

export default router;
