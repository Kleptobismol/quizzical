const { TEXT } = require('sequelize')
const db = require('../db')

const Question = db.define('question', {
    problem: {
        type: TEXT,
        allowNull: false
    }
})

module.exports = Question