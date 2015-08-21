// Reducer:
export default function playerScores(state = [], action) {
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
