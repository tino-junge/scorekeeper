import React, { findDOMNode, Component, PropTypes } from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

class PlayerScore extends Component {
  render() {
    const { score } = this.props;
    return (
      <li>
        <div>{score.round}: {score.points} | {score.total}</div>
      </li>
    );
  }
}

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

class Player extends Component {
  render() {
    const { player, playerScores, handleSubmit } = this.props;

    return (
      <div style={{ float: 'left', padding: '20px' }}>
        <div> {player.name} </div>
        <div>
          <input type="number" defaultValue="0" ref='input' />
          <button onClick={(e) => this.handleAddPoints(e, player.id)}>
            Enter
          </button>
        </div>
        <div>
        <p>Round | Points | Total</p>
        <ul className='score-list'>
          {playerScores.map(score =>
            <PlayerScore key={score.id} score={score} />
          )}
        </ul>
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

// React component
class Scorekeeper extends Component {
  render(){
    const { players, playerScores, onAddPoints } = this.props;
    return (
      <div>
        {players.map(player =>
          <Player
            key={player.id}
            player={player}
            onAddPoints={onAddPoints}
            playerScores={playerScores.filter(score => score.playerId == player.id)}
          />
        )}
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
