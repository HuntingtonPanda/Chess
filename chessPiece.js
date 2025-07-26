function createPiece(color, type){
    const piece = document.createElement('img');
    piece.src = `chessPiece/${color}${type}.png`;
    piece.classList.add('piece');
    //piece.draggable = false; // do later maybe
    return piece;
}

//BLACK PIECES -----------------------------------

//Black Rooks
let square = document.querySelector('[data-square="A8"]');
square.appendChild(createPiece('black', 'Rook'));

square = document.querySelector('[data-square="H8"]');
square.appendChild(createPiece('black', 'Rook'));

//Black Knights
square = document.querySelector('[data-square="B8"]');
square.appendChild(createPiece('black', 'Knight'));

square = document.querySelector('[data-square="G8"]');
square.appendChild(createPiece('black', 'Bishop'));

//Black Bishops
square = document.querySelector('[data-square="C8"]');
square.appendChild(createPiece('black', 'Bishop'));

square = document.querySelector('[data-square="F8"]');
square.appendChild(createPiece('black', 'Knight'));

//Black King
square = document.querySelector('[data-square="D8"]');
square.appendChild(createPiece('black', 'King'));

//Black Queen
square = document.querySelector('[data-square="E8"]');
square.appendChild(createPiece('black', 'Queen'));

//Black Pawn
for(let i = 0; i < 8; i++){
    file = String.fromCharCode(65 + i)
    square = document.querySelector(`[data-square="${file}7"]`);
    square.appendChild(createPiece('black', 'Pawn'));
}

//WHITE PIECES -------------------------------------------

//White Rooks
square = document.querySelector('[data-square="A1"]');
square.appendChild(createPiece('white', 'Rook'));

square = document.querySelector('[data-square="H1"]');
square.appendChild(createPiece('white', 'Rook'));

//White Knights
square = document.querySelector('[data-square="B1"]');
square.appendChild(createPiece('white', 'Knight'));

square = document.querySelector('[data-square="G1"]');
square.appendChild(createPiece('white', 'Bishop'));

//White Bishops
square = document.querySelector('[data-square="C1"]');
square.appendChild(createPiece('white', 'Bishop'));

square = document.querySelector('[data-square="F1"]');
square.appendChild(createPiece('white', 'Knight'));

//White King
square = document.querySelector('[data-square="D1"]');
square.appendChild(createPiece('white', 'King'));

//White Queen
square = document.querySelector('[data-square="E1"]');
square.appendChild(createPiece('white', 'Queen'));

//White Pawn
for(let i = 0; i < 8; i++){
    file = String.fromCharCode(65 + i)
    square = document.querySelector(`[data-square="${file}2"]`);
    square.appendChild(createPiece('white', 'Pawn'));
}