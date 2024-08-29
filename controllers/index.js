import {Router} from "express";
import postRouter from "./PostsController.js";
import userRouter from "./UsersController.js";
import commentsRouter from './CommentsController.js'

const routes = Router();

routes.use('/api/posts', postRouter);
routes.use('/api/users', userRouter);
routes.use('/api/comments', commentsRouter);

export default routes