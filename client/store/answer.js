import axios from 'axios';

// Initial State
const initialState = { answer: {} }

//  -----------
// | CONSTANTS |
//  -----------
const SET_ANSWER = 'SET_ANSWER'


//  ---------
// | ACTIONS |
//  ---------
export const setAnswer = (answer) => ({ type: SET_ANSWER, answer });

//  -------- 
// | THUNKS |
//  -------- 

// Fetches answer for given question
export const fetchAnswer = (questionId) => {
    return async(dispatch) => {
        const answer = (await axios.get(`/api/answers/${ questionId }`)).data
        dispatch(setQuizzes(answer))
    }
}

//  ---------
// | REDUCER |
//  ---------
export default function answerReducer (state=initialState, action) {
    switch (action.type) {
        case SET_ANSWER:
            return { answer: action.answer }
        default:
            return state
    }
}