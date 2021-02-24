const router = require('express').Router()
const { models: { Answer }} = require('../db')
module.exports = router

// Fetches answer for specified question
router.get('/:id', async (req, res, next) => {
    try {
      const answer = await Answer.findOne({
        where:{
            questionId: req.params.id
        }
      })
      res.json(answer)
    } catch (err) {
      next(err)
    }
  })