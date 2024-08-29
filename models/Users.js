import { db } from "../config/index.js";
import { createToken } from "../middlewares/Auth.js";
import { hash, compare } from "bcrypt";

export class Users {
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

  async createUser(user) {
    const queryString =
      "INSERT INTO Users (username, email, user_role, password_hash) VALUES (?, ?, ?, ?)";
    try {
      const hashedPassword = await hash(user.password, 10);
      const values = [user.username, user.email, user.role, hashedPassword];
      const [result] = await db.execute(queryString, values);
  
      if (result.affectedRows === 0) {
        return { success: false, message: "Failed to create user" };
      }
  
      const token = createToken({ email: user.email, role: user.role, id: result.insertId });
      return { success: true, result: { id: result.insertId, token } };
    } catch (err) {
      console.error("Error creating user:", err);
      return { success: false, message: err.message };
    }
  }
  

  async loginUser(email, password, role) {
    const queryString = "SELECT * FROM Users WHERE email = ?" + (role ? " AND user_role = ?" : "");
    try {
      const [rows] = await db.execute(queryString, role ? [email, role] : [email]);
      if (rows.length === 0) {
        return { success: false, message: "User not found" };
      }
  
      const user = rows[0];
      const isPasswordValid = await compare(password, user.password_hash);
      if (!isPasswordValid) {
        return { success: false, message: "Invalid password" };
      }
  
      const token = createToken({ email: user.email, role: user.user_role, id: user.user_id });
      return { success: true, token };
    } catch (err) {
      console.error("Error logging in:", err);
      return { success: false, message: err.message };
    }
  }
  
  

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
