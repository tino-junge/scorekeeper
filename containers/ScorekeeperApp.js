import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import Scorekeeper from '../components/Scorekeeper';
import playerScores from '../reducers/scorekeeper';
import pointsAction from '../actions/scorekeeper';

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

export default class ScorekeeperApp extends Component {
  render() {
    return (
      <Provider store={store}>
        {() => <App />}
      </Provider>
    );
  }
}
