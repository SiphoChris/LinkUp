import { Router } from "express";
import { verifyAToken } from "../middlewares/Auth.js";
import { Comments } from "../models/Comments.js";

const commentRouter = Router();
const comment = new Comments();

// Public routes
commentRouter.get('/all', async (req, res) => {
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

// Private routes
commentRouter.post('/create', verifyAToken, async (req, res) => {
    const { content, post_id, user_id } = req.body;
    const result = await comment.createComment({ content, post_id, user_id });
    if (result.success) {
        res.status(201).json(result.result);
    } else {
        res.status(500).json({ message: result.message });
    }
});

commentRouter.patch('/update/:id', verifyAToken, async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const result = await comment.updateComment(id, { content });
    if (result.success) {
        res.status(200).json(result.result);
    } else {
        res.status(500).json({ message: result.message });
    }
});

commentRouter.delete('/delete/:id', verifyAToken, async (req, res) => {
    const { id } = req.params;
    const result = await comment.deleteComment(id);
    if (result.success) {
        res.status(200).json(result.result);
    } else {
        res.status(500).json({ message: result.message });
    }
});

export default commentRouter;
