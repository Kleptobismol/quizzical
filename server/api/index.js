const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/quizzes', require('./quizzes'))
router.use('/answers', require('./answers'))
router.use('/scores', require('./scores'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
