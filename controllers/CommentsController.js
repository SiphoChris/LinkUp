import { verifyAToken } from "../middlewares/Auth.js";
import {Router} from "express";
import { Comments } from "../models/Comments.js";

const commentRouter = Router();
const comment = new Comments();

// public routes

commentRouter.get('/', async (req, res) => {
    const result = await comment.getComments();
    if (result.success) {
        res.status(200).json(result.result);
    } else {
        res.status(500).json({ message: result.message });
    }
});

commentRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await comment.getCommentById(id);
    if (result.success) {
        res.status(200).json(result.result);
    } else {
        res.status(404).json({ message: result.message });
    }
});


// private routes

commentRouter.post('/', verifyAToken, async (req, res) => {
    const { content, post_id } = req.body;
    const result = await comment.createComment({ content, post_id });
    if (result.success) {
        res.status(201).json(result.result);
    } else {
        res.status(500).json({ message: result.message });
    }
});


commentRouter.patch('/:id', verifyAToken, async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const result = await comment.updateComment(id, { content });
    if (result.success) {
        res.status(200).json(result.result);
    } else {
        res.status(500).json({ message: result.message });
    }
});


commentRouter.delete('/:id', verifyAToken, async (req, res) => {
    const { id } = req.params;
    const result = await comment.deleteComment(id);
    if (result.success) {
        res.status(200).json(result.result);
    } else {
        res.status(500).json({ message: result.message });
    }
});

export default commentRouter;


