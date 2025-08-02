import { PIECE_INDEX, BOARD_SIZE, MOVED, NOT_MOVED } from './constants.js';
const board = [
  ['bR-', 'bN', 'bB', 'bK-', 'bQ', 'bB', 'bN', 'bR-'],  // row 0 (rank 8)
  ['bP-', 'bP-', 'bP-', 'bP-', 'bP-', 'bP-', 'bP-', 'bP-'],
  //[null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ['wP-', 'wP-', 'wP-', 'wP-', 'wP-', 'wP-', 'wP-', 'wP-'],
  ['wR-', 'wN', 'wB', 'wK-', 'wQ', 'wB', 'wN', 'wR-']
];


// Helper Functions 
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
//let pieceSelected = null;
let possibleMoves = [];

function deltaMove(rank, file, deltaRank, deltaFile, continuous, color){
  let r = rank;
  let f = file;
  do{
    r += deltaRank;
    f += deltaFile;
    
    // Contain within board
    if(r < 0 || r >= BOARD_SIZE.RANK || f < 0 || f >= BOARD_SIZE.FILE) 
      break;
    
    const target = document.querySelector(`[data-square="${indexToAlgebraic(r, f)}"]`);
    const targetPiece = board[r][f];
    
    if (target && (!targetPiece || targetPiece[PIECE_INDEX.COLOR] !== color)) {
      target.classList.add('possibleMove');
      possibleMoves.push(target);
    }

    //Stop if something is intercepting piece's path
    if (targetPiece) break; 
  }while(continuous)
}

function possibleRookMove(rank, file, color){
  const continuous = true;
  const deltaRookMove = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  deltaRookMove.forEach(([dr, df]) => {deltaMove(rank, file, dr, df, continuous, color)});
}

function possibleKnightMove(rank, file, color){
  const continuous = false;
  const deltaKnightMove = [[2, 1], [2, -1], [-2, 1], [-2, -1],
                     [1, 2], [1, -2], [-1, 2], [-1, -2]];

  deltaKnightMove.forEach(([dr, df]) => {deltaMove(rank, file, dr, df, continuous, color)});
}

function possibleBishopMove(rank, file, color){
  const continuous = true;
  const deltaBishopMove = [[1, 1], [1, -1], [-1, -1], [-1, 1]];

  deltaBishopMove.forEach(([dr, df]) => {deltaMove(rank, file, dr, df, continuous, color)});
}

function possibleKingMove(rank, file, color){
  const continuous = false;
  const deltaKingMove = [
    [-1, -1], [0, -1], [1, -1],
    [-1, 0], [1, 0],
    [-1, 1], [0, 1], [1, 1]
  ];

  deltaKingMove.forEach(([dr, df]) => {deltaMove(rank, file, dr, df, continuous, color)});
}

function possibleQueenMove(rank, file, color){
  const continuous = true;
  const deltaQueenMove = [
    [-1, -1], [0, -1], [1, -1],
    [-1, 0], [1, 0],
    [-1, 1], [0, 1], [1, 1]
  ];

  deltaQueenMove.forEach(([dr, df]) => {deltaMove(rank, file, dr, df, continuous, color)});
}

function possiblePawnMove(rank, file, color){
  const continuous = false;
  let deltaPawnMove = [];

  const piece = board[rank][file];
  if (piece[PIECE_INDEX.COLOR] === 'w'){
    deltaPawnMove = piece[PIECE_INDEX.MOVED] === NOT_MOVED
      ? [[-1, 0], [-2, 0]]
      : [[-1, 0]];
  }else{
    deltaPawnMove = piece[PIECE_INDEX.MOVED] === NOT_MOVED
      ? [[1, 0], [2, 0]]
      : [[1, 0]];
  }

  deltaPawnMove.forEach(([dr, df]) => {deltaMove(rank, file, dr, df, continuous, color)});
}

// -------------------------------------------------

const PIECESMOVE = {
  'R': possibleRookMove,
  'N': possibleKnightMove,
  'B': possibleBishopMove,
  'K': possibleKingMove,
  'Q': possibleQueenMove,
  'P': possiblePawnMove 
}

function possibleMoveCalc(rank, file){
  // Clear possibleMove list
  while(possibleMoves.length > 0){
    possibleMoves.pop().classList.remove('possibleMove');
  }
  const piece = board[rank][file];
  if (!piece)
    return;

  const pieceType = piece[PIECE_INDEX.TYPE];
  const pieceColor = piece[PIECE_INDEX.COLOR];

  //PIECESMOVE[pieceType](rank, file);
  const moveFn = PIECESMOVE[pieceType];
  if (moveFn) 
    moveFn(rank, file, pieceColor);
}

let selectedPiece = null;
function selectPiece(square){
  if(selectedPiece === square){
    selectedPiece.classList.remove('selectedPiece');
    while(possibleMoves.length > 0){
      possibleMoves.pop().classList.remove('possibleMove');
    }
    return;
  }

  if(selectedPiece)
    selectedPiece.classList.remove('selectedPiece');

  selectedPiece = square;
  selectedPiece.classList.add('selectedPiece');

  const squareName = selectedPiece.getAttribute('data-square');
  const [rank, file] = algebraicToIndex(squareName);
  possibleMoveCalc(rank, file);
}

export { selectPiece };