import express from 'express';
import { contactController } from '../controllers/contactController.js';
import { isAuth } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public route - anyone can send contact message
router.post('/', contactController.createContact);

// Admin routes - require authentication
router.get('/', isAuth, contactController.getContacts);
router.put('/:id', isAuth, contactController.updateContact);

export default router;

