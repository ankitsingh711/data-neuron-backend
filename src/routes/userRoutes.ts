import express from 'express';
import { login, register, logout, resetPassword, resetPasswordReq, verifyUserEmail, emailVerified, GoogleAuthController } from '../controllers/userController';
import { authenticateToken } from '../middleware/authenticationMiddleware';

const router = express.Router();

router.post('/login', authenticateToken, login);
router.post('/register', register);
router.post('/logout', logout);
router.post('/reset-password', authenticateToken, resetPassword);
router.post('/reset-password/:token', resetPasswordReq);
router.get('/verify-email/:token', verifyUserEmail);
router.get('/verified-email', emailVerified);
router.get('/auth/google', GoogleAuthController.googleAuth);
router.get('/auth/google/callback', GoogleAuthController.googleAuthCallback, GoogleAuthController.googleAuthCallbackRedirect);

export default router;
