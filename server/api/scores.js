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
  } catch (err) {
    next(err)
  }
})

// Fetches single score
router.get('/:userId/:quizId', async (req, res, next) => {
  try {
    const score = await Score.findOne({
      where: {
        userId: req.params.userId,
        quizId: req.params.quizId
      },
      include: [ Quiz, User ]
    })
    res.json(score)
  } catch (err) {
    next(err)
  }
})

// Creates new score
router.post('/create',async(req,res,next)=>{
  try {
    const newScore = await Score.create(req.body)
    const score = await Score.findOne({ where: { id: newScore.id }, include: [ Quiz, User ] })
    res.status(201).send(score)
  }
  catch(error) {
    next(error)
  }
})
