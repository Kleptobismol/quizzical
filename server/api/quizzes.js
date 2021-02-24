const router = require('express').Router()
const { models: { Quiz, Question }} = require('../db')
module.exports = router

// Fetches quizzes
router.get('/', async (req, res, next) => {
  try {
    const quizzes = await Quiz.findAll({
      include: [ Question ]
    })
    res.json(quizzes)
  } catch (err) {
    next(err)
  }
})