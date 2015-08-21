export default function pointsAction(points, playerId) {
  return {type: 'increase', points, playerId};
}
