const { INTEGER } = require('sequelize')
const db = require('../db')

const Score = db.define('score', {
    value: {
        type: INTEGER
    },
    total: {
        type: INTEGER
    }
})

module.exports = Score