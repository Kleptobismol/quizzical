const db = require('./db')

// Models
const User = require('./models/user');
const Quiz = require('./models/quiz')
const Question = require('./models/question')
const Answer = require('./models/answer')
const Score = require('./models/score')

// Associations
Quiz.belongsTo(User)
User.hasMany(Quiz)

Question.belongsTo(Quiz)
Quiz.hasMany(Question)

Answer.belongsTo(Question)
Question.hasOne(Answer)

Score.belongsTo(Quiz)
Quiz.hasMany(Score)
Score.belongsTo(User)
User.hasMany(Score)

const syncAndSeed =  async()=> {
  await db.sync({force: true})
  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123', firstName: 'Cody', lastName: 'Smith'}),
    User.create({email: 'murphy@email.com', password: '123', firstName: 'Murphy', lastName: 'Jones'})
  ])

  await Quiz.create({
    name: 'Biology Quiz',
    userId: 1
  })
  
  await Question.create({
    problem: 'Which answer is "A"?',
    options: ['this one?', 'this one?', 'this one?', 'this one?'],
    quizId: 1
  })

  await Question.create({
    problem: 'Which answer is "B"?',
    options: ['this one?', 'this one?', 'this one?', 'this one?'],
    quizId: 1
  })

  await Answer.create({
    solution: 'A',
    questionId: 1
  })

  await Answer.create({
    solution: 'B',
    questionId: 2
  })

  const [cody, murphy] = users;

  return {
    users: {
      cody,
      murphy
    }
  };
}

module.exports = {
  db,
  syncAndSeed,
  models: {
    User,
    Quiz,
    Question,
    Answer,
    Score
  }
}
