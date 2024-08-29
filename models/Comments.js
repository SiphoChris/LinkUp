import {db} from '../config/index.js'

export class Comment {
    async getComments() {
        const comments = await db.query('SELECT * FROM comments');
        return comments;
    }

    async getCommentById(id) {
        const comment = await db.query('SELECT * FROM comments WHERE id = ?', [id]);
        return comment;
    }

    async createComment(comment) {
        const newComment = await db.query('INSERT INTO comments SET ?', [comment]);
        return newComment;
    }

    async updateComment(id, comment) {
        const updatedComment = await db.query('UPDATE comments SET ? WHERE id = ?', [comment, id]);
        return updatedComment;
    }

    async deleteComment(id) {    
        const deletedComment = await db.query('DELETE FROM comments WHERE id = ?', [id]);
        return deletedComment;
    }
}

