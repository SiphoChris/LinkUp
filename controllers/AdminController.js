// controllers/admin.js
import { Router } from "express";
import { verifyAToken, roleAuth } from "../middlewares/Auth.js";
import { Admin } from "../models/Admin.js";

const adminRouter = Router();
const admin = new Admin();

adminRouter.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;
  const result = role === 'admin' 
    ? await admin.createAdmin({ username, email, password }) 
    : await admin.createUser({ username, email, password });
  res.status(result.success ? 201 : 500).json(result);
});

adminRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await admin.loginAdmin(email, password);
  res.status(result.success ? 200 : 401).json(result);
});

adminRouter.use(verifyAToken);

// User CRUD operations
adminRouter.get("/users/all", roleAuth(["admin"]), async (req, res) => {
  const result = await admin.getUsers();
  res.status(result.success ? 200 : 500).json(result);
});

adminRouter.get("/users/:id", roleAuth(["admin"]), async (req, res) => {
  const { id } = req.params;
  const result = await admin.getUserById(id);
  res.status(result.success ? 200 : 500).json(result);
});

adminRouter.post("/users/add", roleAuth(["admin"]), async (req, res) => {
  const user = req.body;
  const result = await admin.createUser(user);
  res.status(result.success ? 201 : 500).json(result);
});

adminRouter.patch("/users/update/:id", roleAuth(["admin"]), async (req, res) => {
  const { id } = req.params;
  const user = req.body;
  const result = await admin.updateUser(id, user);
  res.status(result.success ? 200 : 500).json(result);
});

adminRouter.delete("/users/delete/:id", roleAuth(["admin"]), async (req, res) => {
  const { id } = req.params;
  const result = await admin.deleteUser(id);
  res.status(result.success ? 200 : 500).json(result);
});

// Post CRUD operations
adminRouter.get("/posts/all", roleAuth(["admin"]), async (req, res) => {
  const result = await admin.getPosts();
  res.status(result.success ? 200 : 500).json(result);
});

adminRouter.get("/posts/:id", roleAuth(["admin"]), async (req, res) => {
  const { id } = req.params;
  const result = await admin.getPostById(id);
  res.status(result.success ? 200 : 500).json(result);
});

adminRouter.post("/posts/create", roleAuth(["admin"]), async (req, res) => {
  const post = req.body;
  const result = await admin.createPost(post);
  res.status(result.success ? 201 : 500).json(result);
});

adminRouter.patch("/posts/update/:id", roleAuth(["admin"]), async (req, res) => {
  const { id } = req.params;
  const post = req.body;
  const result = await admin.updatePost(id, post);
  res.status(result.success ? 200 : 500).json(result);
});

adminRouter.delete("/posts/delete/:id", roleAuth(["admin"]), async (req, res) => {
  const { id } = req.params;
  const result = await admin.deletePost(id);
  res.status(result.success ? 200 : 500).json(result);
});



// Error handling
adminRouter.use((err, req, res, next) => {
  console.error('Unexpected error:', err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

export default adminRouter;
