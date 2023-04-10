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
  appointAdmin,
  getAllRegisteredAdmin,
  deRegisterAdmin,
  getAllRegisteredReport,
  createWarning,
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

router.post('/appoint', appointAdmin);
router.get('/admins', verifyToken, getAllRegisteredAdmin);
router.delete('/admins/:userId', verifyToken, deRegisterAdmin);

router.get('/reports', verifyToken, getAllRegisteredReport);
router.get('/reports/count', verifyToken, getTotalUserCount);
router.post('/warnings/:userId', verifyToken, createWarning);

export default router;
