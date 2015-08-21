import React, { findDOMNode, Component, PropTypes, className } from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

// PlayerScore component
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

// Player component
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

// Scorekeeper component
const players = [
  {
    id: 0,
    name: 'Player 1'
  },
  {
    id: 1,
    name: 'Player 2'
  }
]

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

// Action:
function pointsAction(points, playerId) {
  return {type: 'increase', points, playerId};
}

// Reducer:
function playerScores(state = [], action) {
  var currentPoints = parseInt(action.points);
  let scores = state.filter(score => score.playerId == action.playerId);
  let total = scores.reduce((count, score) =>
      count + score.points,
      0
    );
  switch(action.type){
    case 'increase':
      return [{
        id: state.length,
        playerId: action.playerId,
        points: currentPoints,
        round: scores.length + 1,
        total: total + currentPoints
      }, ...state];

    default:
      return state;
  }
}

// Store:
let store = createStore(playerScores);

// Map Redux state to component props
function mapStateToProps(state)  {
  return {
    playerScores: state,
    players: players
  };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onAddPoints: (points, playerId) => dispatch(pointsAction(points, playerId))
  };
}

// Connected Component:
let App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Scorekeeper);

React.render(
  <Provider store={store}>
    {() => <App />}
  </Provider>,
  document.getElementById('root')
);
