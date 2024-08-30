import { Users } from "./Users.js";
import { Posts } from "./Posts.js";
import { Comments } from "./Comments.js";
import { createToken } from "../middlewares/Auth.js";
import { hash, compare } from "bcrypt";
import { db } from "../config/index.js";

export class Admin {
  constructor() {
    this.users = new Users();
    this.posts = new Posts();
    this.comments = new Comments();
  }

  // Admin CRUD operations
  async createAdmin({ username, email, password }) {
    if (!username || !email || !password) {
      return { success: false, message: 'Missing required fields' };
    }
  
    try {
      const hashedPassword = await hash(password, 10);
      const queryString = `INSERT INTO Users (username, email, user_role, password_hash) VALUES (?, ?, 'admin', ?)`;
      const [result] = await db.execute(queryString, [username, email, hashedPassword]);
  
      if (result.affectedRows === 0) {
        return { success: false, message: 'Failed to create admin' };
      }
  
      // Create a token for the new admin
      const token = createToken({ id: result.insertId, email, role: 'admin' });
  
      return { success: true, result: { id: result.insertId, token } };
    } catch (err) {
      console.error('Error creating admin:', err);
      return { success: false, message: err.message };
    }
  }
   

  async loginAdmin(email, password) {
    return await this.users.loginUser(email, password, 'admin');
  }

  // User CRUD operations
  async getUsers() {
    return await this.users.getAllUsers();
  }

  async getUserById(id) {
    return await this.users.getUserById(id);
  }

  async createUser(user) {
    return await this.users.createUser(user);
  }

  async updateUser(id, user) {
    return await this.users.updateUser(id, user);
  }

  async deleteUser(id) {
    return await this.users.deleteUser(id);
  }

  // Post CRUD operations
  async getPosts() {
    return await this.posts.getPosts();
  }

  async getPostById(id) {
    return await this.posts.getPostById(id);
  }

  async createPost(post) {
    return await this.posts.createPost(post);
  }

  async updatePost(id, post) {
    return await this.posts.updatePost(id, post);
  }

  async deletePost(id) {
    return await this.posts.deletePost(id);
  }

  // Comment CRUD operations
  async getComments() {
    return await this.comments.getComments();
  }

  async getCommentById(id) {
    return await this.comments.getCommentById(id);
  }

  async createComment(comment) {
    return await this.comments.createComment(comment);
  }

  async updateComment(id, comment) {
    return await this.comments.updateComment(id, comment);
  }

  async deleteComment(id) {
    return await this.comments.deleteComment(id);
  }
}
