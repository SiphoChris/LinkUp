import { db } from "../config/index.js";
import { hash, compare } from "bcrypt";

export class Users {
  // Fetch all users
  async getAllUsers() {
    const queryString = "SELECT * FROM Users";
    try {
      const [rows] = await db.execute(queryString);
      if (rows.length === 0) {
        return { success: false, message: "No users found" };
      }
      return { success: true, result: rows };
    } catch (err) {
      console.error("Error getting all users:", err);
      return { success: false, message: err.message };
    }
  }

  // Fetch user by ID
  async getUserById(id) {
    const queryString = "SELECT * FROM Users WHERE user_id = ?";
    try {
      const [rows] = await db.execute(queryString, [id]);
      if (rows.length === 0) {
        return { success: false, message: "User not found" };
      }
      return { success: true, result: rows[0] };
    } catch (err) {
      console.error("Error getting user by ID:", err);
      return { success: false, message: err.message };
    }
  }

  // Create a new user

  async createUser({ username, email, password }) {
    if (!username || !email || !password) {
      return { success: false, message: 'Missing required fields' };
    }
    
    try {
      const hashedPassword = await hash(password, 10);
      const queryString = `INSERT INTO Users (username, email, user_role, password_hash) VALUES (?, ?, 'user', ?)`;
      const [result] = await db.execute(queryString, [username, email, hashedPassword]);
      
      if (result.affectedRows === 0) {
        return { success: false, message: 'Failed to create user' };
      }
      
      const token = createToken({ id: result.insertId, email, role: 'user' });
      
      return { success: true, result: { id: result.insertId, token } };
    } catch (err) {
      console.error('Error creating user:', err);
      return { success: false, message: err.message };
    }
  }

  // Login a user

  async loginUser(email, password) {
    const queryString = `SELECT * FROM Users WHERE email = ?`;
    const [users] = await db.execute(queryString, [email]);
    const user = users[0];
    if (user) {
      const isMatch = await compare(password, user.password_hash);
      if (isMatch) {
        const token = createToken({ id: user.id, email, role: user.user_role });
        return { success: true, result: { token } };
      }
    }
    return { success: false, message: 'Invalid credentials' };
  }

  // Delete a user
  async deleteUser(id) {
    const queryString = "DELETE FROM Users WHERE user_id = ?";
    try {
      const [result] = await db.execute(queryString, [id]);
      if (result.affectedRows === 0) {
        return { success: false, message: "User not found" };
      }
      return { success: true, result: { id } };
    } catch (err) {
      console.error("Error deleting user:", err);
      return { success: false, message: err.message };
    }
  }

  // Update a user
  async updateUser(id, user) {
    let queryString =
      "UPDATE Users SET username = ?, email = ? WHERE user_id = ?";
    let values = [user.username, user.email, id];

    if (user.password) {
      const hashedPassword = await hash(user.password, 10);
      queryString =
        "UPDATE Users SET username = ?, email = ?, password_hash = ? WHERE user_id = ?";
      values = [user.username, user.email, hashedPassword, id];
    }

    try {
      const [result] = await db.execute(queryString, values);
      if (result.affectedRows === 0) {
        return { success: false, message: "User not found" };
      }
      return { success: true, result: { id } };
    } catch (err) {
      console.error("Error updating user:", err);
      return { success: false, message: err.message };
    }
  }
}
