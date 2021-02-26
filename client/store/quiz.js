import axios from 'axios';

// Initial State
const initialState = { quizzes: [], selectedQuiz: {} }

//  -----------
// | CONSTANTS |
//  -----------
const SET_QUIZZES = 'SET_QUIZZES'
const SET_SELECTED_QUIZ = 'SET_SELECTED_QUIZ'

//  ---------
// | ACTIONS |
//  ---------
export const setQuizzes = (quizzes) => ({ type: SET_QUIZZES, quizzes });
export const setSelectedQuiz = (selectedQuiz) => ({ type: SET_SELECTED_QUIZ, selectedQuiz })

//  -------- 
// | THUNKS |
//  -------- 

// Fetches quiz data
export const fetchQuizzes = () => {
    return async(dispatch) => {
        const quizzes = (await axios.get('/api/quizzes')).data
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

//  ---------
// | REDUCER |
//  ---------
export default function quizReducer (state=initialState, action) {
    switch (action.type) {
        case SET_QUIZZES:
            return { ...state, quizzes: action.quizzes }
        case SET_SELECTED_QUIZ:
            return { ...state, selectedQuiz: action.selectedQuiz }
        default:
            return state
    }
}