import React, { findDOMNode, Component, PropTypes } from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

class PlayerScore extends Component {
  render() {
    return (
      <li
        onClick={this.props.onClick}
        style={{
          textDecoration: this.props.completed ? "line-through" : "none",
          cursor: this.props.completed ? "default" : "pointer"
        }}>
        {this.props.text}
      </li>
    );
  }
}


// React component
class Scorekeeper extends Component {
  render(){
    const { value, handleSubmit } = this.props;
    return (
      <div>
        <div> Player 1 </div>
        <div>
          <input type="number" placeholder="0" ref='input' />
          <button onClick={(e) => this.handleAddPoints(e)}>
         Add
       </button>
        </div>
        <div>
        <span>{value}</span>
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
function scorekeeper(state={count: 0}, action) {
  console.log(action.points);
  var points = parseInt(action.points);
  let count = state.count;
  switch(action.type){
    case 'increase':
      return {count: count + points};
    default:
      return state;
  }
}

// Store:
let store = createStore(scorekeeper);

// Map Redux state to component props
function mapStateToProps(state)  {
  return {
    value: state.count
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
