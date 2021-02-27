import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { createQuiz } from '../store/quiz'

// Displays single quiz
class QuizCreator extends Component {
    constructor() {
        super();
        this.state = {
            isUpdating: false,
            index: 1,
            questions: {},
            selectedQuestion: {}
        }
    }

    componentDidMount () {
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSpecSubmit = this.handleSpecSubmit.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleAnswersReset = this.handleAnswersReset.bind(this)
        this.handleProblemChange = this.handleProblemChange.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    handleChange (event) {
        // Must set to constant otherwise will always update one step behind
        const value = event.target.name === 'numberOfAnswers' && event.target.value === '' ? null : event.target.value

        // Uses name of radio element associated with answer to store answer in local state
        this.setState({
            [event.target.name]: { value: value, isClosed: false }
        })
    }

    handleProblemChange (event) {
        let value = event.target.value

        if (event.target.name.startsWith('question')) {
            this.setState({
                selectedQuestion: { name: event.target.name , value: value, isClosed: false }
            })
        } else if (event.target.name.startsWith('correct')) {
            value = value.toUpperCase()
            this.setState({
                selectedQuestion: {
                    ...this.state.selectedQuestion,
                    correctAnswer: value
                }
            })
        } else {
            this.setState({
                selectedQuestion: {
                    ...this.state.selectedQuestion, 
                    answers: {
                        ...this.state.selectedQuestion.answers, [event.target.name.slice(-1)]: { name: event.target.name, value: value }
                    }
                    }
            })
        }
    }

    handleSpecSubmit (event, problem=false) {
        if (problem) {
            this.setState({
                selectedQuestion: {
                    ...this.state.selectedQuestion, isClosed: true
                }
            })
            return
        }
        this.setState({
            [event.target.name]: { ...this.state[event.target.name], isClosed: true }
        })
    }

    handleEdit (event, problem=false, problemName=false) {
        if (problem) {
            const question = this.state.questions[event.target.name]
            const index = this.state.index - 1
            this.setState({
                ...this.state,
                selectedQuestion: question,
                questions: {
                    ...this.state.questions,
                    [event.target.name]: null
                },
                isUpdating: true,
                index: index
            })
            return
        } else if (problemName) {
            this.setState({
                ...this.state,
                selectedQuestion: {
                    ...this.state.selectedQuestion,
                    isClosed: false
                }
            })
        }
        this.setState({
            [event.target.name]: { ...this.state[event.target.name], isClosed: false }
        })
    }

    handleCreate () {
        this.setState({ ...this.state, isUpdating: true })
    }

    handleCancel () {
        this.setState({ ...this.state, isUpdating: false })
    }

    handleQuestionSubmit () {
        const question = this.state.selectedQuestion
        const index = this.state.index + 1
        this.setState({
            ...this.state,
            selectedQuestion: {},
            questions: { ...this.state.questions, [question.name.slice(-1)]: question },
            isUpdating: false,
            numberOfAnswers: null,
            index: index
        })
    }

    handleAnswersReset () {
        this.setState({ 
            ...this.state, 
            selectedQuestion: {
                ...this.state.selectedQuestion, answers: {}  
            },
            numberOfAnswers: null })
    }

    handleSubmit(event) {
        // Prevents page reloading
        event.preventDefault();

        this.props.createQuiz(this.state.name, this.state.questions)
    }

    render () {
        console.log(this.state)
        return (
            <div className='container justify-content-center text-center background-custom'>
                <h1 className='display-1 header-custom'>Quiz Creator</h1>
                <small className='text-custom'> Note: all input fields are required, do not leave them blank! Make sure you submit all your questions before submitting quiz. Click 'Ok' to see a preview of each item! </small>
                <hr></hr>
                <form onSubmit={ (event) => this.handleSubmit(event) } >
                    {
                        this.state.name && this.state.name.isClosed ?
                        <div>
                            <h1 className='text-center header-custom'>{ this.state.name.value } <button name='name' onClick={ event => this.handleEdit(event) } className='btn btn-warning-custom'>Edit</button> </h1>
                        </div>
                        :
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-lg-offset-4">
                                <div className="input-group text-center align-items-center">
                                    <label htmlFor='name' className='text-custom'>Quiz Name</label>
                                    <br></br>
                                    <input onChange={ event => this.handleChange(event) } name='name' type='text' className='form-control'/>
                                    <span className="input-group-btn">
                                        <button name='name' onClick={ event => this.handleSpecSubmit(event) } className='btn btn-primary-custom'>OK</button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    }
                    
                    {
                        this.state.questions ?

                        Object.keys(this.state.questions).map( (key, i) => {
                            const question = this.state.questions[key]

                            if (question) {
                                return (
                                    <div key={ question.name } className='card text-center' style={{ width: 18 + 'rem'}}>
                                        <h2 className='card-title'>{ key }. { question.value }</h2>
                                        <ul className='list-group list-group-flush'>
                                            { Object.keys(question.answers).map( (answerKey, j) => {
                                                const answer = question.answers[answerKey]
                                                return (
                                                    <li key={ `answer-display-${ j }`} className='list-group-item'>
                                                        { `${ String.fromCharCode(j + 65) }.` } { answer.value }
                                                    </li>
                                                )
                                            })}
                                            <li className='list-group-item'>Correct Answer: { question.correctAnswer }</li>
                                        </ul>
                                        { this.state.isUpdating ? null : <button name={ key } onClick={ (event) => this.handleEdit(event, true) } className='btn btn-warning-custom'>Edit</button>}
                                    </div>
                                )
                            } else { null }
                        })
                        :
                        null
                    }
                    <br></br>
                    {
                        this.state.isUpdating ?
                        <div className="row justify-content-center">
                            <div className="col-lg-4">
                                <h2 className='header-custom'> New Question </h2>
                                {
                                    this.state.selectedQuestion && this.state.selectedQuestion.isClosed ?

                                    <h3 className='header-custom'>{ this.state.selectedQuestion.value } <button name='question' type='button' onClick={ event => this.handleEdit(event, false, true) } className='btn btn-warning-custom'>Edit</button></h3>
                                    :
                                    <div className='input-group text-center align-items-center'>
                                        <label htmlFor={ `question-${ this.state.index }` } className='text-custom'>Question</label>
                                        <input onChange={ event => this.handleProblemChange(event) } name={ `question-${ this.state.index }` } type='text' className='form-control'/>
                                        <span className="input-group-btn">
                                            <button name={ `question-${ this.state.index }` } onClick={ event => this.handleSpecSubmit(event, true) } className='btn btn-primary-custom'>Ok</button> 
                                        </span>
                                    </div>  
                                }
                                <div className='input-group text-center align-items-center'>
                                    <label htmlFor='numberOfAnswers' className='text-custom'>
                                        Number of Possible Answers
                                        <br></br>
                                        <small className='text-cusom'>(between 2 and 26)</small>
                                    </label>  
                                    <input onChange={ event => this.handleChange(event) } name='numberOfAnswers' type='number' min='2' max='26' className='form-control'/>
                                </div>
                                {
                                    this.state.numberOfAnswers && this.state.numberOfAnswers.value ?

                                    // JSX version of for loop, in order to assign unique id's and create specified amount of answers
                                    <div>
                                        <label className='text-custom'>Possible Answers</label>
                                        {
                                        [...Array(parseInt(this.state.numberOfAnswers.value))].map((_, i) => i).map( (_, i) => {
                                            return (
                                                <div key={ `answer-label-${ i }` } className='input-group text-center align-items-center'>
                                                    <label htmlFor={ `answer-${ this.state.index }-${ i + 1 }` } className='text-custom'> { `${ String.fromCharCode(i + 65) }. ` }</label>
                                                    <input onChange={ event => this.handleProblemChange(event) } name={ `answer-${ this.state.index }-${ i + 1 }` } className='form-control'/>
                                                </div>
                                            )
                                        })
                                        }
                                        <label htmlFor={ `correct-${ this.state.index }` } className='text-custom'>Correct Answer (i.e. "A"):</label>
                                        <input onChange={ event => this.handleProblemChange(event) } name={ `correct-${ this.state.index }` } className='form-control'/>
                                    </div>
                                    :
                                    null
                                }
                                <div className='btn-group'>
                                    { 
                                        this.state.numberOfAnswers ? 
                                        <button onClick={ () => this.handleAnswersReset() } className='btn btn-warning-custom'>Reset Answers</button>
                                        :
                                        null
                                    }
                                    <button onClick={ () => this.handleCancel()} className='btn btn-danger-custom'>Cancel</button>
                                    <button name={`question-${ this.state.index }`} onClick={ () => this.handleQuestionSubmit() } className='btn btn-primary-custom'>Submit Question</button>
                                </div>
                            </div>
                        </div>
                        :
                        <div>
                            <button onClick={ () => this.handleCreate() } className='btn btn-primary-custom'>New Question</button>
                        </div>
                    }
                    <br></br>
                    { Object.keys(this.state.questions).length !== 0 ? <button onClick={ (event) => this.handleSubmit(event) } className='btn btn-primary-custom'> Submit Quiz </button> : null}
                </form>
            </div>
        )
    }
}

const mapState = state => ({ state })

const mapDispatch = (dispatch) => ({
    createQuiz: (name, questions) => dispatch(createQuiz(name, questions))
})

export default connect(mapState, mapDispatch)(QuizCreator)