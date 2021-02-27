/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Navbar } from './Navbar'
export { default as Home } from './Home'
export { default as CommunityQuizzes } from './CommunityQuizzes'
export { default as TakenQuizzes } from './TakenQuizzes'
export { default as SingleQuiz } from './SingleQuiz'
export { default as SingleScore } from './SingleScore'
export { Login, Signup } from './AuthForm'
