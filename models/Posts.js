import {db} from '../config/index.js'

export class Posts {
    async getPosts() {
        const queryString = `SELECT * FROM Posts`
        try {
            const [result] = await db.execute(queryString)
            return {success: true, result: result}
        } catch (err) {
            console.error('Error getting posts:', err)
            return {success: false, message: err.message}
        }
    }

    async getPostById(id) {
        const queryString = `SELECT * FROM Posts WHERE id = ?`
        try {
            const [result] = await db.execute(queryString, [id])
            return {success: true, result: result}
        } catch (err) {
            console.error('Error getting post by ID:', err)
            return {success: false, message: err.message}
        }
    }

    async createPost(post) {
        const queryString = `INSERT INTO Posts (title, content) VALUES (?, ?)`
        try {
            const values = [post.title, post.content]
            const [result] = await db.execute(queryString, values)
            return {success: true, result: result}
        } catch (err) {
            console.error('Error creating post:', err)
            return {success: false, message: err.message}
        }
    }

    async deletePost(id) {
        const queryString = `DELETE FROM Posts WHERE id = ?`
        try {
            const [result] = await db.execute(queryString, [id])
            return {success: true, result: result}
        } catch (err) {
            console.error('Error deleting post:', err)
            return {success: false, message: err.message}
        }
    }

    async updatePost(id, post) {
        const queryString = `UPDATE Posts SET title = ?, content = ? WHERE id = ?`
        try {
            const values = [post.title, post.content, id]
            const [result] = await db.execute(queryString, values)
            return {success: true, result: result}
        } catch (err) {
            console.error('Error updating post:', err)
            return {success: false, message: err.message}
        }
    }

  
}