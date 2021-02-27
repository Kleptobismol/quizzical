const router = require('express').Router()
const { models: { Quiz, User, Score }} = require('../db')
module.exports = router

// Fetches scores
router.get('/', async (req, res, next) => {
  try {
    const scores = await Score.findAll({
      include: [ Quiz, User ]
    })
    res.json(scores)
  } catch (error) {
    next(error)
  }
})

// Fetches single score
router.get('/score/:userId/:quizId', async (req, res, next) => {
  try {
    const score = await Score.findOne({
      where: {
        userId: req.params.userId,
        quizId: req.params.quizId
      },
      include: [ Quiz, User ]
    })
    res.json(score)
  } catch (error) {
    next(error)
  }
})

// Fetches quizId of taken quizzes from scores
router.get('/taken/:id', async (req, res, next) => {
  try {
    const scores = await Score.findAll({
      where: {
        userId: req.params.id
      }
    })
    res.json(scores.map( score => score.quizId ))
  } catch (error) {
    next(error)
  }
})

// Creates new score
router.post('/create', async (req,res,next) => {
  try {
    const newScore = await Score.create(req.body)
    const score = await Score.findOne({ where: { id: newScore.id }, include: [ Quiz, User ] })
    res.status(201).json(score)
  }
  catch (error) {
    next(error)
  }
})

// Updates existing score
router.put('/update', async (req, res, next) => {
  try {
    let score = await Score.findOne({
      where: {
        userId: req.body.userId,
        quizId: req.body.quizId
      }
      })
    await score.update({
      value: req.body.value * 1,
      total: req.body.total * 1
    })

    score = await Score.findOne({
      where: {
        userId: req.body.userId,
        quizId: req.body.quizId
      },
      include: [ Quiz, User ]
    })

    res.json(score)
  } catch (error) {
    next(error)
  }
})
