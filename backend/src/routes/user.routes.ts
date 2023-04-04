import express from 'express';

import {
  updateProfile,
  getHelpPostByUserId,
  getMatchPostByUserId,
  getCurrentUser,
} from '../controllers/user.controllers';

const router = express.Router();

router.get('/me', getCurrentUser);

router.patch('/:id', updateProfile);

router.get('/:id/help-posts/', getHelpPostByUserId);
router.get('/:id/match-posts/', getMatchPostByUserId);

export default router;
