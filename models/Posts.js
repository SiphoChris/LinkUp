import { db } from '../config/index.js';

export class Posts {
    async getPosts() {
        const queryString = 'SELECT * FROM Posts';
        try {
            const [rows] = await db.execute(queryString);
            return { success: true, result: rows };
        } catch (err) {
            console.error('Error getting posts:', err);
            return { success: false, message: err.message };
        }
    }

    async getPostById(id) {
        const queryString = 'SELECT * FROM Posts WHERE post_id = ?';
        try {
            const [rows] = await db.execute(queryString, [id]);
            if (rows.length === 0) {
                return { success: false, message: 'Post not found' };
            }
            return { success: true, result: rows[0] };
        } catch (err) {
            console.error('Error getting post by ID:', err);
            return { success: false, message: err.message };
        }
    }

    async createPost(post) {
        const queryString = 'INSERT INTO Posts (content) VALUES (?)';
        try {
            const [result] = await db.execute(queryString, [post.content]);
            return { success: true, result: { id: result.insertId } };
        } catch (err) {
            console.error('Error creating post:', err);
            return { success: false, message: err.message };
        }
    }

    async deletePost(id) {
        const queryString = 'DELETE FROM Posts WHERE post_id = ?';
        try {
            const [result] = await db.execute(queryString, [id]);
            if (result.affectedRows === 0) {
                return { success: false, message: 'Post not found' };
            }
            return { success: true, result: { id } };
        } catch (err) {
            console.error('Error deleting post:', err);
            return { success: false, message: err.message };
        }
    }

    async updatePost(id, post) {
        const queryString = 'UPDATE Posts SET content = ? WHERE post_id = ?';
        try {
            const [result] = await db.execute(queryString, [post.content, id]);
            if (result.affectedRows === 0) {
                return { success: false, message: 'Post not found' };
            }
            return { success: true, result: { id } };
        } catch (err) {
            console.error('Error updating post:', err);
            return { success: false, message: err.message };
        }
    }
}
