import { db } from "../config/index.js";
import { createToken } from "../middlewares/Auth.js";
import { hash, compare } from "bcrypt";

export class Users {
  async getAllUsers() {
    const queryString = `SELECT * FROM Users`;
    try {
      const [result] = await db.execute(queryString);
      return { success: true, result };
    } catch (err) {
      console.error("Error getting all users:", err);
      return { success: false, message: err.message };
    }
  }

  async getUserById(id) {
    const queryString = `SELECT * FROM Users WHERE id = ?`;
    try {
      const [result] = await db.execute(queryString, [id]);
      if (result.length === 0) {
        return { success: false, message: "User not found" };
      }
      return { success: true, result };
    } catch (err) {
      console.error("Error getting user by ID:", err);
      return { success: false, message: err.message };
    }
  }

  async createUser(user) {
    const queryString = `INSERT INTO Users (username, email, password) VALUES (?, ?, ?)`;
    try {
      const hashedPassword = await hash(user.password, 10);
      const values = [user.username, user.email, hashedPassword];
      const [result] = await db.execute(queryString, values);
      return { success: true, result };
    } catch (err) {
      console.error("Error creating user:", err);
      return { success: false, message: err.message };
    }
  }

  async loginUser(user) {
    const queryString = `SELECT * FROM Users WHERE email = ?`;
    try {
      const [result] = await db.execute(queryString, [user.email]);
      if (result.length === 0) {
        return { success: false, message: "User not found" };
      }

      const isMatch = await compare(user.password, result[0].password);
      if (!isMatch) {
        return { success: false, message: "Incorrect password" };
      }

      const token = createToken(result[0]);
      return { success: true, token };
    } catch (err) {
      console.error("Error logging in user:", err);
      return { success: false, message: err.message };
    }
  }

  async deleteUser(id) {
    const queryString = `DELETE FROM Users WHERE id = ?`;
    try {
      const [result] = await db.execute(queryString, [id]);
      return { success: true, result };
    } catch (err) {
      console.error("Error deleting user:", err);
      return { success: false, message: err.message };
    }
  }

  async updateUser(id, user) {
    let queryString = `UPDATE Users SET username = ?, email = ? WHERE id = ?`;
    let values = [user.username, user.email, id];

    if (user.password) {
      const hashedPassword = await hash(user.password, 10);
      queryString = `UPDATE Users SET username = ?, email = ?, password = ? WHERE id = ?`;
      values = [user.username, user.email, hashedPassword, id];
    }

    try {
      const [result] = await db.execute(queryString, values);
      return { success: true, result };
    } catch (err) {
      console.error("Error updating user:", err);
      return { success: false, message: err.message };
    }
  }
}
