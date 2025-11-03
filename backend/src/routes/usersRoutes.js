import express from 'express'
import { StatusCodes } from 'http-status-codes';
import { userController } from '../controllers/userController.js';
import { isAuth } from '../middlewares/authMiddleware.js';
const Router = express.Router();
Router.post('/login', userController.Login)
Router.post('/register', userController.CreatedUser)
Router.get('/inforUser', isAuth, userController.InfoUser)
Router.post('/refresh-token', userController.refreshToken)
export default Router