const chessBoard = document.querySelector('.chessBoard');
let squareName;
let isLight = true;

for (let column = 1; column <= 8; column++) {
  for (let row = 1; row <= 8; row++) {
    squareName = String.fromCharCode(72 - (column - 1)) + row;
    //const isLight = (row + column) % 2 === 0;

    chessBoard.innerHTML += isLight
      ? "<div class='square light' data-square='" + squareName + "'>" + squareName + "</div>"
      : "<div class='square dark' data-square='" + squareName + "'>" + squareName + "</div>";

    isLight = !isLight;
  }
  isLight = !isLight;
}
