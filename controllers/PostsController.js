import { Router } from "express";
import { Posts } from "../models/Posts.js";
import { verifyAToken } from "../middlewares/Auth.js";

const postRouter = Router();
const post = new Posts();

// Public routes
postRouter.get('/all', async (req, res) => {
    const result = await post.getPosts();
    if (result.success) {
        res.status(200).json(result.result);
    } else {
        res.status(500).json({ message: result.message });
    }
});

postRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await post.getPostById(id);
    if (result.success) {
        res.status(200).json(result.result);
    } else {
        res.status(404).json({ message: result.message });
    }
});

// Private routes
postRouter.post('/create', verifyAToken, async (req, res) => {
    const { title, content } = req.body;
    const result = await post.createPost({ title, content });
    if (result.success) {
        res.status(201).json(result.result);
    } else {
        res.status(500).json({ message: result.message });
    }
});

postRouter.delete('/delete/:id', verifyAToken, async (req, res) => {
    const { id } = req.params;
    const result = await post.deletePost(id);
    if (result.success) {
        res.status(200).json(result.result);
    } else {
        res.status(404).json({ message: result.message });
    }
});

postRouter.patch('/update/:id', verifyAToken, async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const result = await post.updatePost(id, { title, content });
    if (result.success) {
        res.status(200).json(result.result);
    } else {
        res.status(500).json({ message: result.message });
    }
});

export default postRouter;
