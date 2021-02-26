const { TEXT, STRING, ARRAY } = require('sequelize')
const db = require('../db')

const Question = db.define('question', {
    problem: {
        type: TEXT,
        allowNull: false
    },
    type: {
        type: STRING,
        allowNull: false,
        isIn: ['multiple', 'tf']
    },
    options: {
        type: ARRAY(TEXT),
        allowNull: false
    }
})

module.exports = Question