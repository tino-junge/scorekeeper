import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import Scorekeeper from './components/Scorekeeper';

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
