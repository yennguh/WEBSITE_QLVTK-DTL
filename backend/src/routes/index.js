import express from 'express'
import Userrouter from './usersRoutes.js';
const Router = express.Router()

Router.use('/user', Userrouter)
export default Router
