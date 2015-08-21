import React, { Component, PropTypes } from 'react';
import Player from './Player';

class Scorekeeper extends Component {
  render(){
    const { players, playerScores, onAddPoints } = this.props;
    return (
      <div id='scoreboard'>
        <div id='players'>
          {players.map(player =>
            <Player
              key={player.id}
              player={player}
              onAddPoints={onAddPoints}
              playerScores={playerScores.filter(score => score.playerId == player.id)}
            />
          )}
        </div>
      </div>
    );
  }
}

Scorekeeper.propTypes = {
  players: PropTypes.array.isRequired,
  onAddPoints: PropTypes.func.isRequired
};

export default Scorekeeper;
