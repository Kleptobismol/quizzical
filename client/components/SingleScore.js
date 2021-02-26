import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';

// Displays single score
class SingleScore extends Component {
    render () {
        const { score } = this.props;

        if (!score.value) {
            return null
        }

        return (
            <div>
                <h1> { score.user.firstName }, thank you for completing: "{ score.quiz.name }"</h1>
                <h2> Your score is: { score.value }/{ score.total }</h2>
            </div>
        )
    }
}

const mapState = (state) => ({
    score: state.scores.selectedScore
})

export default connect(mapState)(SingleScore);