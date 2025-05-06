const pool = require('../config/db');

// User Model
const User = {
    async create({ username, password, name, contact_number, email }) {
        const conn = await pool.getConnection();
        try {
            const result = await conn.query(
                'INSERT INTO users (username, password, name, contact_number, email) VALUES (?, ?, ?, ?, ?)',
                [username, password, name, contact_number, email]
            );
            return result.insertId;
        } finally {
            conn.release();
        }
    },

    async findByUsernameOrEmailOrContact(identifier) {
        const conn = await pool.getConnection();
        try {
            const rows = await conn.query(
                'SELECT * FROM users WHERE username = ? OR email = ? OR contact_number = ?',
                [identifier, identifier, identifier]
            );
            return rows[0];
        } finally {
            conn.release();
        }
    },

    async findByUsername(username) {
        const conn = await pool.getConnection();
        try {
            const rows = await conn.query(
                'SELECT * FROM users WHERE username = ?',
                [username]
            );
            return rows[0];
        } finally {
            conn.release();
        }
    },

    async findById(id) {
        const conn = await pool.getConnection();
        try {
            const rows = await conn.query(
                'SELECT * FROM users WHERE id = ?',
                [id]
            );
            return rows[0];
        } finally {
            conn.release();
        }
    },

    async findByEmail(email) {
        const conn = await pool.getConnection();
        try {
            const rows = await conn.query(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );
            return rows[0];
        } finally {
            conn.release();
        }
    },

    async findByContact(contact_number) {
        const conn = await pool.getConnection();
        try {
            const rows = await conn.query(
                'SELECT * FROM users WHERE contact_number = ?',
                [contact_number]
            );
            return rows[0];
        } finally {
            conn.release();
        }
    }
};

module.exports = User;
