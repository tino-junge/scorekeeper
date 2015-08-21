import React, { Component, className } from 'react';

class PlayerScore extends Component {
  render() {
    const { score } = this.props;
    return (
      <div className='row'>
        <span>{score.round}</span><span>{score.points}</span><span>{score.total}</span>
      </div>
    );
  }
}

export default PlayerScore;
