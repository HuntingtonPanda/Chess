const boardRankSize = 8;
const boardFileSize = 8;
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

/* -------------- HANDLING MOVES HERE ------------*/
let possibleMoves = [];

function deltaMove(rank, file, deltaRank, deltaFile, continuous){
  let r = rank;
  let f = file;
  do{
    r += deltaRank;
    f += deltaFile;
    
    if(r < 0 || r >= boardRankSize || f < 0 || f >= boardFileSize) //within border of board
      break;
    
    const target = document.querySelector(`[data-square="${indexToAlgebraic(r, f)}"]`);
    
    if (target) {
      target.classList.add('possibleMove');
      possibleMoves.push(target);
    }

    if (board[r][f]) break; //Stop if piece something intercepting its path
  }while(continuous)
}

function possibleRookMove(rank, file){
  const continuous = true;
  const deltaRookMove = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  deltaRookMove.forEach(([dr, df]) => {deltaMove(rank, file, dr, df, continuous)});
}

function possibleKnightMove(rank, file){
  const continuous = false;
  const deltaKnightMove = [[2, 1], [2, -1], [-2, 1], [-2, -1],
                     [1, 2], [1, -2], [-1, 2], [-1, -2]];

  deltaKnightMove.forEach(([dr, df]) => {deltaMove(rank, file, dr, df, continuous)});
}

const PIECESMOVE = {
  'R': possibleRookMove,
  'N': possibleKnightMove
}

function possibleMoveCalc(rank, file){
  while(possibleMoves.length > 0){
    possibleMoves.pop().classList.remove('possibleMove');
  }
  const piece = board[rank][file];
  if (!piece)
    return;

  const pieceType = piece[1];

  //PIECESMOVE[pieceType](rank, file);
  const moveFn = PIECESMOVE[pieceType];
  if (moveFn) 
    moveFn(rank, file);
}

let selectedPiece = null;
function selectPiece(square){
  if(selectedPiece)
    selectedPiece.classList.remove('selectedPiece');

  selectedPiece = square;
  selectedPiece.classList.add('selectedPiece');

  const squareName = selectedPiece.getAttribute('data-square');
  const [rank, file] = algebraicToIndex(squareName);
  possibleMoveCalc(rank, file);
}

export { selectPiece };