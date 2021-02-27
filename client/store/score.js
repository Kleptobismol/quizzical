import axios from 'axios';

// Initial State
const initialState = { scores: [], selectedScore: {} }

//  -----------
// | CONSTANTS |
//  -----------
const SET_SELECTED_SCORE = 'SET_SELECTED_SCORE'
const SET_SCORES = 'SET_SCORES'

//  ---------
// | ACTIONS |
//  ---------
export const setSelectedScore = (selectedScore) => ({ type: SET_SELECTED_SCORE, selectedScore })
export const setScores = (scores) => ({ type: SET_SCORES, scores })

//  -------- 
// | THUNKS |
//  -------- 

// Fetches all score data
export const fetchScores = () => {
    return async(dispatch) => {
        const scores = (await axios.get('/api/scores')).data
        dispatch(setScores(scores))
    }
}

// Grades quiz, sets score for display
export const gradeQuiz = (answers, questions, quizId, userId, total) => {
    return async(dispatch) => {
        let value = 0

        for (let i=0; i < questions.length; i++) {
            let question = questions[i]
            const userAnswer = answers[`answer-${ question.id }`]
            const correctAnswer = (await axios.get(`/api/answers/${ question.id }`)).data
            const isCorrect = correctAnswer.solution === userAnswer ? true : false
            value += isCorrect ? 1 : 0
        }

        const scoreExists = (await axios.get(`/api/scores/score/${ userId }/${ quizId }`)).data

        const score = scoreExists ? 
            (await axios.put('/api/scores/update', { value: value, quizId: quizId, userId: userId, total: total })).data :
            (await axios.post('/api/scores/create', { value: value, quizId: quizId, userId: userId, total: total })).data

        dispatch(setSelectedScore(score))
    }
}

//  ---------
// | REDUCER |
//  ---------
export default function answerReducer (state=initialState, action) {
    switch (action.type) {
        case SET_SELECTED_SCORE:
            return { ...state, selectedScore: action.selectedScore }
        case SET_SCORES:
            return { ...state, scores: action.scores }
        default:
            return state
    }
}