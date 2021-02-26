const router = require('express').Router()
const { models: { Quiz, Question, Score, User }} = require('../db')
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

// Fetches single quiz
router.get('/:id', async (req, res, next) => {
  try {
    const quiz = await Quiz.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: Score,
        where: {
          quizId: req.params.id
        },
        include: [ User ],
        required: false
      }, {
        model: Question
      }]
    })
    res.json(quiz)
  } catch (err) {
    next(err)
  }
})