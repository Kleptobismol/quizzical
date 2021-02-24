import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchQuizzes } from '../store/quiz'

class AllQuizzes extends Component {
    componentDidMount () {
        this.props.init()
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
    quizzes: state.quizzes.quizzes
})

const mapDispatch = (dispatch) => ({
    init: () => dispatch(fetchQuizzes())
})

export default connect(mapState, mapDispatch)(AllQuizzes);