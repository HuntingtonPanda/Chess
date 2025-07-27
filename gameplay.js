const board = [
  ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],  // row 0 (rank 8)
  ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
  ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR']
];

function algebraicToIndex(squareName) {
  const file = squareName.charCodeAt(0) - 65;
  const rank = 8 - parseInt(squareName[1]);
  return [rank, file];
}

function indexToAlgebraic(row, col) {
  const file = String.fromCharCode(65 + col);
  const rank = 8 - row;
  return file + rank;
}

let possibleMoves = [];
function possibleMoveCalc(rank, file){
  while(possibleMoves.length > 0){
    possibleMoves.pop().classList.remove('possibleMove');
  }
  const piece = board[rank][file];
  if (!piece)
    return;

  const pieceType = piece[1];

  // Rook
  if (pieceType === 'R') {
  const target = document.querySelector(`[data-square="${indexToAlgebraic(rank - 1, file)}"]`);
    if (target) {
      target.classList.add('possibleMove');
      possibleMoves.push(target);
    }
  // SO BROKEN
  }
}

let selectedPiece = null;
function selectPiece(square){
  if(selectedPiece)
    selectedPiece.classList.remove('selectedPiece');

  selectedPiece = square;
  selectedPiece.classList.add('selectedPiece');

  const squareName = selectedPiece.getAttribute('data-square')
  possibleMoveCalc(algebraicToIndex(squareName));
}

export { selectPiece };