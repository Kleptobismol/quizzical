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
                        <Link key={ quiz.id } to={ `/quizzes/${ quiz.id }` }>{ quiz.name }</Link>
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