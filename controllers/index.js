import {Router} from "express";
import postRouter from "./PostsController.js";
import userRouter from "./UsersController.js";
import commentsRouter from './CommentsController.js'
import adminRouter from "./AdminController.js";

const routes = Router();

routes.use('/api/posts', postRouter);
routes.use('/api/users', userRouter);
routes.use('/api/comments', commentsRouter);
routes.use('/api/admin', adminRouter);

export default routes