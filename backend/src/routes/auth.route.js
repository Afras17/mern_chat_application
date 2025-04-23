import express from 'express';
import { signup, login, logout, updateProfile, checkAuth } from '../controllers/auth.controller.js'; // Import the controller functions
import { protectRoute } from '../middleware/auth.middleware.js'; // Import the middleware for protecting routes

const router = express.Router();

router.post('/signup', signup); // Use the signup function from the controller
router.post('/login', login); // Use the login function from the controller
router.post('/logout', logout); // Use the logout function from the controller

router.put('/update-profile', protectRoute, updateProfile);

router.get('/check', protectRoute, checkAuth); // Use the checkAuth function from the controller

export default router;



