import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';

// Displays single score
class SingleScore extends Component {
    render () {
        const { score } = this.props;

        if (!score.total) {
            return null
        }

        return (
            <div className='justify-content-center text-center'>
                <h1 className='display-1 header-custom'> { score.user.firstName }, thank you for completing: "{ score.quiz.name }"</h1>
                <h2 className='display-2 header-custom'> Your score is: { score.value }/{ score.total }</h2>
            </div>
        )
    }
}

const mapState = (state) => ({
    score: state.scores.selectedScore
})

export default connect(mapState)(SingleScore);