import express from 'express'
import { StatusCodes } from 'http-status-codes';
import { userController } from '../controllers/userController.js';
const Router = express.Router();
Router.post('/login', userController.Login)
Router.post('/register', userController.CreatedUser)

export default Router
// export  const Board_router =router;