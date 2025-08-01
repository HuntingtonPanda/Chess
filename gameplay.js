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

function possibleRookMove(rank, file){
  let target = null;
  let possibleSquare = null;

  let walker = 1;
  do {
    target = indexToAlgebraic(rank, file + walker);
    possibleSquare = document.querySelector(`[data-square=${target}]`);
    if (possibleSquare){
      //console.log("HI");
      possibleSquare.classList.add("possibleMove");
      possibleMoves.push(possibleSquare);
    }
    walker++;
  } while (possibleSquare);
  
  walker = -1;
  do {
    target = indexToAlgebraic(rank, file + walker);
    possibleSquare = document.querySelector(`[data-square=${target}]`);
    if (possibleSquare){
      //console.log("HI");
      possibleSquare.classList.add("possibleMove");
      possibleMoves.push(possibleSquare);
    }
    walker--;
  } while (possibleSquare);

  // walker = 1;
  // do {
  //   target = indexToAlgebraic(rank + walker, file);
  //   console.log(target);
  //   possibleSquare = document.querySelector(`[data-square=${target}]`);
  //   if (possibleSquare){
  //     console.log("HI");
  //     possibleSquare.classList.add("possibleMove");
  //     possibleMoves.push(possibleSquare);
  //   }
  //   walker++;
  // } while (possibleSquare);

  // walker = -1;
  // do {
  //   target = indexToAlgebraic(rank - walker, file);
  //   possibleSquare = document.querySelector(`[data-square=${target}]`);
  //   if (possibleSquare){
  //     //console.log("HI");
  //     possibleSquare.classList.add("possibleMove");
  //     possibleMoves.push(possibleSquare);
  //   }
  //   walker--;
  // } while (possibleSquare);
}

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
    console.log("rook selected");
    // let target = document.querySelector('[data-square=H3]');
    // if (target) {
    //   target.classList.add("possibleMove");
    //   possibleMoves.push(target);
    // }
    possibleRookMove(rank, file);
  }
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