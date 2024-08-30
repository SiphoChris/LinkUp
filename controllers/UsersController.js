import { Router } from "express";
import { Users } from "../models/Users.js";
import { roleAuth } from "../middlewares/Auth.js";

const userRouter = Router();
const user = new Users();

// Public routes
userRouter.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;
  const result = await user.createUser({ username, email, password, role });
  if (result.success) {
    res.status(201).json(result.result);
  } else {
    res.status(500).json({ message: result.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password, role } = req.body;
  const result = await user.loginUser(req, email, password, role);
  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(401).json({ message: result.message });
  }
});

// Protected routes
userRouter.use((req, res, next) => {
  if (req.session.user && req.session.user.id) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized, please log in" });
  }
});

userRouter.get("/all", roleAuth(["admin", "user"]), async (req, res) => {
  const result = await user.getAllUsers();
  if (result.success) {
    res.status(200).json(result.result);
  } else {
    res.status(500).json({ message: result.message });
  }
});

userRouter.get("/:id", roleAuth(["admin", "user"]), async (req, res) => {
  const { id } = req.params;
  const result = await user.getUserById(id);
  if (result.success) {
    res.status(200).json(result.result);
  } else {
    res.status(404).json({ message: result.message });
  }
});

userRouter.patch("/update/:id", roleAuth(["admin", "user"]), async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
  const result = await user.updateUser(id, { username, email, password });
  if (result.success) {
    res.status(200).json(result.result);
  } else {
    res.status(500).json({ message: result.message });
  }
});

userRouter.delete("/delete/:id", roleAuth(["admin"]), async (req, res) => {
  const { id } = req.params;
  const result = await user.deleteUser(id);
  if (result.success) {
    res.status(200).json(result.result);
  } else {
    res.status(404).json({ message: result.message });
  }
});

export default userRouter;
