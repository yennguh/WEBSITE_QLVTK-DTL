import express from 'express'
import Userrouter from './usersRoutes.js';
import PostsRouter from './postsRoutes.js';
import ContactRouter from './contactRoutes.js';
import NotificationRouter from './notificationRoutes.js';
const Router = express.Router()

Router.use('/user', Userrouter)
Router.use('/posts', PostsRouter)
Router.use('/contact', ContactRouter)
Router.use('/notifications', NotificationRouter)
export default Router
