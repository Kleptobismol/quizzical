import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { fetchQuiz } from '../store/quiz'
import { gradeQuiz } from '../store/score'

// Displays single quiz
class SingleQuiz extends Component {
    constructor() {
        super();
        this.state = {}
    }

    componentDidMount () {
        this.props.init(this.props.match.params.id)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange (event) {
        // Must set to constant otherwise will always update one step behind
        const value = event.target.value

        // Uses name of radio element associated with answer to store answer in local state
        this.setState({
            [event.target.name]: value
        })
    }

    handleSubmit(event) {
        // Prevents page reloading
        event.preventDefault();

        const { quiz, history } = this.props;

        this.props.gradeQuiz(this.state, quiz.questions, quiz.id, this.props.userId, quiz.questions.length);

        history.push(`/score/${ this.props.userId }/${ quiz.id }`)
    }

    render () {
        const { quiz } = this.props;

        if (!quiz.name) {
            return null
        }

        return (
            <div className='container justify-content-center text-center'>
                <h1 className='display-1 header-custom'>{ quiz.name }</h1>
                <form onChange={ (event) => this.handleChange(event) } className='row justify-content-around'>
                    { quiz.questions.map( (question, i) => {
                        return (
                            <div key={ question.id }>
                                <h2 className='header-custom'>{ i + 1 }. { question.problem }</h2>
                                <div className='text-center'>
                                    { question.options.map( (option, j) => {
                                        return (
                                            <div className='row justify-content-around form-check'>
                                                <input id={`answer-${ question.id }`} type='radio' value={ String.fromCharCode(j + 65) } name={`answer-${ question.id }`} className='form-check-input radio-custom'/>
                                                <label key={ `option${ j }`} className='row'>{ `${ String.fromCharCode(j + 65) }.` } { option }</label>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </form>
                <button type='button' onClick={ (event) => this.handleSubmit(event) } value={ quiz.id } className='btn btn-primary-custom'>Submit</button>
            </div>
        )
    }
}

const mapState = (state) => ({
    quiz: state.quizzes.selectedQuiz,
    userId: state.auth.id
})

const mapDispatch = (dispatch) => ({
    init: (id) => dispatch(fetchQuiz(id)),
    gradeQuiz: (answers, questions, quizId, userId, total) => dispatch(gradeQuiz(answers, questions, quizId, userId, total))
})

export default connect(mapState, mapDispatch)(SingleQuiz)