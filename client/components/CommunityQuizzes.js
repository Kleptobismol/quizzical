import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchQuizzes } from '../store/quiz'

// Displays all quizzes
class CommunityQuizzes extends Component {
    componentDidMount () {
        this.props.init(this.props.userId)
    }

    render () {
        const { quizzes } = this.props;

        return (
            <div>
                { quizzes.map( quiz => {
                    return (
                        <div key={ quiz.id } className='card text-center' style={{ width: 18 + 'rem' }}>
                            <h3 className='card-title text-custom'>{ quiz.name }</h3>
                            <p className='card-text'>{ quiz.questions.length } Questions</p>
                            <Link key={ quiz.id } to={ `/quizzes/${ quiz.id }` } className='card-link'>Take Quiz</Link>
                        </div>
                    )
                })}
            </div>
        )
    }
}

const mapState = (state) => ({
    quizzes: state.quizzes.quizzes,
    userId: state.auth.id
})

const mapDispatch = (dispatch) => ({
    init: (userId) => dispatch(fetchQuizzes(userId)),
})

export default connect(mapState, mapDispatch)(CommunityQuizzes);