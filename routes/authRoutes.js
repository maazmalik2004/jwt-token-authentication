import express from 'express';
import { register, login } from '../controllers/authController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/protected',protect, (req, res) => {
    res.json({ 
        message: 'Access granted to protected route', 
        user: req.user 
    });
});

router.get('/route-name', protect, (req, res) => {
    res.json({ 
        message: 'Access granted to protected route', 
        user: req.user 
    });
});

export default router;
