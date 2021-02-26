const router = require('express').Router()
const { models: { User, Score, Quiz }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'firstName'],
      include: [{
        model: Score,
        include: [ Quiz ]
      }]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
