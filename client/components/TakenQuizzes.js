import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchQuizzes } from '../store/quiz'

// Displays all quizzes
class TakenQuizzes extends Component {
    componentDidMount () {
        this.props.init(this.props.userId, true)

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick (event) {
        this.props.history.push(`/quizzes/${ event.target.value }`)
    }

    render () {
        const { quizzes, userId } = this.props;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <table className='table table-custom table-image'>
                            <thead className='thead-custom'>
                                <tr>
                                    <th className='text-white'> Quiz Name </th>
                                    <th className='text-white'> Score </th>
                                    <th className='text-white'> Date Taken </th>
                                    <th className='text-white'> Retake Quiz </th>
                                </tr>
                            </thead>
                            <tbody>
                            {/* <Link key={ quiz.id } to={ `/quizzes/${ quiz.id }` }>{ quiz.name }</Link> */}
                                { quizzes.map( quiz => {
                                    const score = quiz.scores.filter(score => score.userId === userId)[0]
                                    return (
                                        score ? 
                                        <tr key={ quiz.id }> 
                                            <td> { quiz.name } </td>
                                            <td> {  score.value }/{ score.total }</td>
                                            <td> { score.createdAt } </td>
                                            <td> <button value={ quiz.id } onClick={ (event) => this.handleClick(event) } className='btn btn-primary-custom'> Retake </button></td>
                                        </tr> : null
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

const mapState = (state) => ({
    quizzes: state.quizzes.quizzes,
    userId: state.auth.id
})

const mapDispatch = (dispatch) => ({
    init: (userId, getTaken) => dispatch(fetchQuizzes(userId, getTaken)),
})

export default connect(mapState, mapDispatch)(TakenQuizzes);