const chessBoard = document.querySelector('.chessBoard');
let squareName;
let isLight;

for (let column = 8; column >= 1; column--) {
  for (let row = 1; row <= 8; row++) {
    const square = document.createElement('div');
    squareName = String.fromCharCode(65 + (row - 1)) + column;

    //Setting up class
    isLight = (row + column) % 2 === 0;
    square.classList.add('square');
    square.classList.add(isLight ? 'light' : 'dark');

    //Setting data attribute
    square.setAttribute('data-square', squareName);
    
    square.textContent = squareName;

    chessBoard.appendChild(square);
  }
}
