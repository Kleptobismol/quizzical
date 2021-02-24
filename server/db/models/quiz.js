const { STRING } = require('sequelize')
const db = require('../db')

const Quiz = db.define('quiz', {
    name: {
        type: STRING,
        allowNull: false
    }
})

module.exports = Quiz