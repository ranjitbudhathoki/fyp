import { Router } from 'express';
import {
  handleAdminLogin,
  getAllRegisteredUser,
  deRegisterUser,
  getUserBySearch,
  getUserById,
  getTotalUserCount,
  getTotalMatches,
  getRegisteredUserforEveryMonth,
  getMatchForEveryMonth,
} from '../controllers/admin.controller';
import verifyToken from '../middlewares/verifyToken';

const router = Router();

router.post('/login', handleAdminLogin);
router.get('/users', verifyToken, getAllRegisteredUser);
router.get('/users/count', verifyToken, getTotalUserCount);
router.get('/users/data', verifyToken, getRegisteredUserforEveryMonth);
router.delete('/users/:userId', verifyToken, deRegisterUser);
router.get('/users/:searchTerm/By-Name', verifyToken, getUserBySearch);
router.get('/users/:userId/By-ID', verifyToken, getUserById);

router.get('/matches/count', verifyToken, getTotalMatches);
router.get('/matches/data', verifyToken, getMatchForEveryMonth);

export default router;
