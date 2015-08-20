import React, { findDOMNode, Component, PropTypes } from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

class PlayerScore extends Component {
  render() {
    const { score } = this.props;
    return (
      <li>
        <div>{score.current} | {score.total}</div>
      </li>
    );
  }
}

// React component
class Scorekeeper extends Component {
  render(){
    const { playerScores, handleSubmit } = this.props;
    return (
      <div>
        <div> Player 1 </div>
        <div>
          <input type="number" defaultValue="0" ref='input' />
          <button onClick={(e) => this.handleAddPoints(e)}>
            Enter
          </button>
        </div>
        <div>
        <div>Current | Total</div>
        <ul className='score-list'>
          {playerScores.map(score =>
            <PlayerScore key={score.id} score={score} />
          )}
        </ul>
        </div>
      </div>
    );
  }
  handleAddPoints(e) {
    const node = findDOMNode(this.refs.input);
    const points = node.value;
    this.props.onAddPoints(points);
  }
}

Scorekeeper.propTypes = {
  onAddPoints: PropTypes.func.isRequired
};

// Action:
function pointsAction(points) {
  return {type: 'increase', points};
}

// Reducer:
const initialState = [{
  id: 0,
  current: 0,
  total: 0,
}];

function playerScores(state = initialState, action) {
  var points = parseInt(action.points);
  let total = state[0].total;
  switch(action.type){
    case 'increase':
      return [{
        id: state.length,
        current: points,
        total: total + points
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
    playerScores: state
  };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onAddPoints: (points) => dispatch(pointsAction(points))
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
