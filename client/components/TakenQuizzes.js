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
            <table>
                <thead>
                    <tr>
                        <th> Quiz Name </th>
                        <th> Score </th>
                        <th> Date Taken </th>
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
                                <td> <button value={ quiz.id } onClick={ (event) => this.handleClick(event) }> Retake </button></td>
                            </tr> : null
                        )
                    })}
                </tbody>
            </table>
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