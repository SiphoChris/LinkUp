import { db } from '../config/index.js';

export class Comments {
    async getComments() {
        const queryString = 'SELECT * FROM Comments';
        try {
            const [rows] = await db.execute(queryString);
            if (rows.length === 0) {
                return { success: false, message: 'No comments found' };
            }
            return { success: true, result: rows };
        } catch (err) {
            console.error('Error getting comments:', err);
            return { success: false, message: err.message };
        }
    }

    async getCommentById(id) {
        const queryString = 'SELECT * FROM Comments WHERE comment_id = ?';
        try {
            const [rows] = await db.execute(queryString, [id]);
            if (rows.length === 0) {
                return { success: false, message: 'Comment not found' };
            }
            return { success: true, result: rows[0] };
        } catch (err) {
            console.error('Error getting comment by ID:', err);
            return { success: false, message: err.message };
        }
    }

    async createComment(comment) {
        const queryString = 'INSERT INTO Comments (post_id, content) VALUES (?, ?)';
        try {
            const [result] = await db.execute(queryString, [comment.postId, comment.content]);
            if (result.affectedRows === 0) {
                return { success: false, message: 'Failed to create comment' };
            }
            return { success: true, result: { id: result.insertId } };
        } catch (err) {
            console.error('Error creating comment:', err);
            return { success: false, message: err.message };
        }
    }

    async updateComment(id, comment) {
        const queryString = 'UPDATE Comments SET content = ? WHERE comment_id = ?';
        try {
            const [result] = await db.execute(queryString, [comment.content, id]);
            if (result.affectedRows === 0) {
                return { success: false, message: 'Comment not found' };
            }
            return { success: true, result: { id } };
        } catch (err) {
            console.error('Error updating comment:', err);
            return { success: false, message: err.message };
        }
    }

    async deleteComment(id) {
        const queryString = 'DELETE FROM Comments WHERE comment_id = ?';
        try {
            const [result] = await db.execute(queryString, [id]);
            if (result.affectedRows === 0) {
                return { success: false, message: 'Comment not found' };
            }
            return { success: true, result: { id } };
        } catch (err) {
            console.error('Error deleting comment:', err);
            return { success: false, message: err.message };
        }
    }
}
