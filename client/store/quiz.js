import axios from 'axios';

// Initial State
const initialState = { quizzes: [], selectedQuiz: {} }

//  -----------
// | CONSTANTS |
//  -----------
const SET_QUIZZES = 'SET_QUIZZES'


//  ---------
// | ACTIONS |
//  ---------
export const setQuizzes = (quizzes) => ({ type: SET_QUIZZES, quizzes });

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

//  ---------
// | REDUCER |
//  ---------
export default function quizReducer (state=initialState, action) {
    switch (action.type) {
        case SET_QUIZZES:
            return { ...state, quizzes: action.quizzes }
        default:
            return state
    }
}