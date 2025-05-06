const pool = require('../config/db');

// Task Model
const Task = {
    async create(title, description, userId) {
        const conn = await pool.getConnection();
        try {
            const result = await conn.query(
                'INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)',
                [title, description, userId]
            );
            return result.insertId;
        } finally {
            conn.release();
        }
    },

    async getAll(userId) {
        const conn = await pool.getConnection();
        try {
            const rows = await conn.query(
                'SELECT * FROM tasks WHERE user_id = ?',
                [userId]
            );
            return rows;
        } finally {
            conn.release();
        }
    },

    async markCompleted(id, userId) {
        const conn = await pool.getConnection();
        try {
            await conn.query(
                'UPDATE tasks SET is_completed = TRUE WHERE id = ? AND user_id = ?',
                [id, userId]
            );
        } finally {
            conn.release();
        }
    },

    async update(id, userId, title, description) {
        const conn = await pool.getConnection();
        try {
            await conn.query(
                'UPDATE tasks SET title = ?, description = ? WHERE id = ? AND user_id = ?',
                [title, description, id, userId]
            );
        } finally {
            conn.release();
        }
    },

    async delete(id, userId) {
        const conn = await pool.getConnection();
        try {
            await conn.query(
                'DELETE FROM tasks WHERE id = ? AND user_id = ?',
                [id, userId]
            );
        } finally {
            conn.release();
        }
    }
};

module.exports = Task;
