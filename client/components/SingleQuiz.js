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
            <div>
                <h1>{ quiz.name }</h1>
                <form onSubmit={ (event) => this.handleSubmit(event) } onChange={ (event) => this.handleChange(event) }>
                    { quiz.questions.map( (question, i) => {
                        return (
                            <div key={ question.id }>
                                <h2>{ i + 1 }</h2>
                                <p>{ question.problem }</p>
                                <div>
                                    { question.options.map( (option, j) => {
                                        return (
                                            <label key={ `option${ j }`}>
                                                <input id={`answer-${ question.id }`} type='radio' value={ String.fromCharCode(j + 65) } name={`answer-${ question.id }`}/>
                                                { `${ String.fromCharCode(j + 65) }.` } { option }
                                            </label>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                    <button type='submit' value={ quiz.id }>Submit</button>
                </form>
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