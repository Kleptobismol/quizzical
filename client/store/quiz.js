import axios from 'axios';

// Initial State
const initialState = { quizzes: [], selectedQuiz: {} }

//  -----------
// | CONSTANTS |
//  -----------
const SET_QUIZZES = 'SET_QUIZZES'
const SET_SELECTED_QUIZ = 'SET_SELECTED_QUIZ'
const ADD_QUIZ = 'ADD_QUIZ'

//  ---------
// | ACTIONS |
//  ---------
export const setQuizzes = (quizzes) => ({ type: SET_QUIZZES, quizzes });
export const setSelectedQuiz = (selectedQuiz) => ({ type: SET_SELECTED_QUIZ, selectedQuiz })
export const addQuiz = (quiz) => ({ type: ADD_QUIZ, quiz })

//  -------- 
// | THUNKS |
//  -------- 

// Fetches quiz data
export const fetchQuizzes = (userId, getTaken=null) => {
    return async(dispatch) => {
        let quizzes = (await axios.get('/api/quizzes')).data
        const taken = (await axios.get(`/api/scores/taken/${ userId }`)).data
        quizzes = quizzes.filter( quiz => getTaken ? taken.includes(quiz.id) : !taken.includes(quiz.id)) 
        dispatch(setQuizzes(quizzes))
    }
}

// Fetches single quiz data
export const fetchQuiz = (id) => {
    return async(dispatch) => {
        const selectedQuiz = (await axios.get(`/api/quizzes/${ id }`)).data
        dispatch(setSelectedQuiz(selectedQuiz))
    }
}

// Creates quiz
export const createQuiz = (name, questions) => {
    return async(dispatch) => {
        const quiz = (await axios.post('/api/quizzes/create', { name: name, questions: questions})).data
        dispatch(addQuiz(quiz))
    }
}

//  ---------
// | REDUCER |
//  ---------
export default function quizReducer (state=initialState, action) {
    switch (action.type) {
        case SET_QUIZZES:
            return { ...state, quizzes: action.quizzes }
        case SET_SELECTED_QUIZ:
            return { ...state, selectedQuiz: action.selectedQuiz }
        case ADD_QUIZ:
            return { ...state, quizzes: [ ...state.quizzes, action.quiz ] }
        default:
            return state
    }
}