import axios from 'axios';

// Initial State
const initialState = { selectedScore: {} }

//  -----------
// | CONSTANTS |
//  -----------
const SET_SELECTED_SCORE = 'SET_SELECTED_SCORE'

//  ---------
// | ACTIONS |
//  ---------
export const setSelectedScore = (selectedScore) => ({ type: SET_SELECTED_SCORE, selectedScore })

//  -------- 
// | THUNKS |
//  -------- 

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

        const score = (await axios.post('/api/scores/create', { value: value, quizId: quizId, userId: userId, total: total })).data

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
        default:
            return state
    }
}