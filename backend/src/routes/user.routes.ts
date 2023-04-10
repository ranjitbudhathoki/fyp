import express from 'express';

import {
  updateProfile,
  getHelpPostByUserId,
  getMatchPostByUserId,
  getCurrentUser,
  createProfile,
  createReport,
} from '../controllers/user.controllers';

const router = express.Router();

router.get('/me', getCurrentUser);

router.patch('/:id', updateProfile);
router.patch('/:id/create', createProfile);

router.get('/:id/help-posts/', getHelpPostByUserId);
router.get('/:id/match-posts/', getMatchPostByUserId);
router.post('/:reportedUserId/report', createReport);

export default router;
