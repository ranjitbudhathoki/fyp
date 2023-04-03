import { Router } from 'express';
import {
  handleAdminLogin,
  getAllRegisteredUser,
  deRegisterUser,
  getUserBySearch,
  getUserById,
  getTotalUserCount,
} from '../controllers/admin.controller';
import verifyToken from '../middlewares/verifyToken';

const router = Router();

router.post('/login', handleAdminLogin);
router.get('/users', verifyToken, getAllRegisteredUser);
router.get('/users/count', verifyToken, getTotalUserCount);

router.delete('/users/:userId', verifyToken, deRegisterUser);

router.get('/users/search/:searchTerm', verifyToken, getUserBySearch);
router.get('/users/:userId', verifyToken, getUserById);

export default router;
