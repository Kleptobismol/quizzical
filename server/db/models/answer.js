const { STRING } = require('sequelize')
const db = require('../db')

const Answer = db.define('answer', {
    solution: {
        type: STRING,
        allowNull: false
    }
})

module.exports = Answer