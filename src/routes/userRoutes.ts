import express from 'express';
import { login, register, logout } from '../controllers/userController';
import { authenticateToken } from '../middleware/authenticationMiddleware';

const router = express.Router();

router.post('/login', authenticateToken, login);
router.post('/register', register);
router.post('/logout', logout);

export default router;
