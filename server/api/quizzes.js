const router = require('express').Router()
const { models: { Quiz, Question, Score, User }} = require('../db')
const Answer = require('../db/models/answer')
module.exports = router

// Fetches quizzes
router.get('/', async (req, res, next) => {
  try {
    const quizzes = await Quiz.findAll({
      include: [ Question, Score ]
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

// Creates quiz
router.post('/create', async (req, res, next) => {
  try {
    const quiz = await Quiz.create({
      name: req.body.name.value
    })
    await Promise.all(
      Object.keys(req.body.questions).map( async key => {
        const question = req.body.questions[key]
        const options = Object.keys(question.answers).map( answerKey => question.answers[answerKey].value)
        const newQuestion = await Question.create({
          problem: question.value,
          options: options,
          quizId: quiz.id
        })
        await Answer.create({
          solution: question.correctAnswer,
          questionId: newQuestion.id
        })
      })
    )
    const newQuiz = await Quiz.findOne({
      where: {
        id: quiz.id
      },
      include: [ Question, Score ]
    })

    res.send(newQuiz).status(201);
  } catch (error) {
    next(error)
  }
})