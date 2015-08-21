import React, { Component, findDOMNode, className } from 'react';
import PlayerScore from './PlayerScore';

class Player extends Component {
  render() {
    const { player, playerScores, handleSubmit } = this.props;

    return (
      <div className='player'>
        <h3> {player.name} </h3>
        <div className='inputForm'>
          <input type='number' defaultValue='0' ref='input' />
          <button onClick={(e) => this.handleAddPoints(e, player.id)}>
            Enter
          </button>
        </div>
        <div className='scores'>
          <h4 className='row'>
            <span>Round</span><span>Points</span><span>Total</span>
          </h4>
          {playerScores.map(score =>
            <PlayerScore key={score.id} score={score} />
          )}
        </div>
      </div>
    );
  }
  handleAddPoints(e, playerId) {
    const node = findDOMNode(this.refs.input);
    const points = node.value;
    this.props.onAddPoints(points, playerId);
  }
}

export default Player;
