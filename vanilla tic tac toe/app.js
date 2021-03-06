const gameboard = document.getElementById('gameboard');
const head = document.querySelector('head');
const body = document.querySelector('html').querySelector('body');
const cells = document.querySelectorAll('td');
const score = document.getElementById('score');

/*
console.log('document', document);
console.log('queryselector(head)', head);
console.log('gameboard', gameboard);
console.log('body', body);
console.log('cells', cells);
//why is this NULL ??????
*/
//this (document.queryselector('anything but head')) was returning null because script was loading before page did
// i attached it to the end and it works again

//i can add a moveCount, and if that reaches 9 and gameOver is false, that's gonna be a tie?
//const board = [null, null, null, null, null, null, null, null, null];
const state = {
  gameOver: false,
  turn: true,
  xScore: 0,
  oScore: 0,
  moveCount: 0,
  tieCount: 0,
  tieflag: 0,
  board: [null, null, null, null, null, null, null, null, null]
}; //currently i am keeping x wins, o wins, the current state of the board, x/o turn, and if the game is over
//turn is being checked and manipulated in my clickFunction, on each successful click turn changes
//xScore/oScore/gameOver should all be happening in gameEnd(cell) right now, we update the score, and then


// i currently have a css page that is apparently not needed - i will just detach it when it's time to finish lol, but for now it helps me kinda see things i think.

// i have a table with 9 separate cells

//if i click on any of these cells, it needs to alternate between x and o

// if it's jquery, i can do something like (#gameboard).on('click') - i need some kind of vanilla js equivalent, we shall see


//i can technically give each and every td a separate id, like 1-9, and whenever one of them is clicked i can toggle an x or o into it

//and make it toggle between x and o on alternating clicks



//outline of an idea:
/*
give each cell in the table a different id, 1-9
give each cell an event listener

nvm i think giving each one an id is kinda a terrible idea


what javascript events do i want to cover?
when a cell is clicked: either put an x or an o - depending on whose turn it is, and if the cell is occupied do nothing

if three cells in a row/column/diagonal share the same piece - winner winner chicken dinner
i can potentially just give it all the winning combinations, since there aren't many.


when a cell is clicked, data is changed


do i need to create a board object/array??

it's just one array of 9 items actually, the cells element makes it clear

on the first click, x, on the second click, o,

player properties?
x player,
o player

turn:
true means x turn
false means o turn

let xScore = 0; //total wins
let oScore = 0; //total wins
*/

//when either of these become true, increment the corresponding score - and game is over?


//essentially, i need to create a function that that places an X on the board... but it needs to go in a specific spot.

document.getElementById('score').innerText = `X: ${state.xScore}, O: ${state.oScore}, ties: ${state.tieCount}`;

//i can use this function to add the onclick="clickFunction" to everything, then I can use "clickFunction" to do x and o
var giveCellsEventListeners = function () {
  cells.forEach( (element, index) => {
    element.innerText = '';
    element.addEventListener('click', clickFunction);
    element.setAttribute('id', index); //set each cell with a unique id so we can use it to target board state?
  });

};

var removeCellsEventListeners = function () {
  cells.forEach ( (element, index) => {
    element.removeEventListener('click', clickFunction);
  });
};

//table.on('click', 'td', clickFunction)
var clickFunction = function (click) {
  //console.log(this.id, this); //click.target = this apparently
  //how do i know what number cell is being clicked however? i need to develop my win condition
  // i can give id's to 1 through 9 i suppose
  //console.log('click', click.target);
  if (this.innerText === '') {
    if (state.turn === true) {
      this.innerText = 'X';
      state.board[this.id] = this.innerText;
      state.moveCount = state.moveCount + 1;
      state.turn = !state.turn;
    } else {
      this.innerText = 'O';
      state.board[this.id] = this.innerText;
      state.moveCount = state.moveCount + 1;
      state.turn = !state.turn;
    }
  } else {
    alert('pick an unoccupied spot');
  }
  checkWinningBoard(click.target);

};
giveCellsEventListeners();

/* winning board conditions
  [x,x,x, ...]
  [-,-,-,x,x,x,-,-,-]
  []
  doing it like this seems wildly inefficient, there must be a better way...
  [0,1,2
   3,4,5
   6,7,8]

  i can do, if 0-2.innerText are all equal, 3-5.innerText, 6-8.innerText equal
  winning board states:
  0,1,2; 3,4,5; 6,7,8
  0,3,6; 1,4,7; 2,5,8
  0,4,8; 2,4,6;


var checkWinningBoard = function(cell) {
  if state
  if (state.board[0] === state.board[1] && state.board[1] === state.board[2]) {
    alert(`${state.board[0]} has won the game!`);
  } else if (state.board[3] === state.board[4] && state.board[4] === state.board[5]) {
    alert(`${state.board[3]} has won the game!`);
  } else if (state.board[6] === state.board[7] && state.board[7] === state.board[8]) {
    alert(`${state.board[6]} has won the game!`);
  } else if (state.board[0] === state.board[3] && state.board[3] === state.board[6]) {
    alert(`${state.board[0]} has won the game!`);
  } else if (state.board[1] === state.board[4] && state.board[4] === state.board[7]) {
    alert(`${state.board[1]} has won the game!`);
  } else if (state.board[2] === state.board[5] && state.board[5] === state.board[8]) {
    alert(`${state.board[2]} has won the game!`);
  } else if (state.board[0] === state.board[4] && state.board[4] === state.board[8]) {
    alert(`${state.board[0]} has won the game!`);
  } else if (state.board[2] === state.board[4] && state.board[4] === state.board[6]) {
    alert(`${state.board[2]} has won the game!`);
  }
}; my game winning function is failing on 3 nulls rn lol, null wins! smh
*/

// this function can be rewritten with a loop i suppose!
var checkWinningBoard = function(cell) {
  console.log(state.moveCount);
  if (cell.id === '0') {
    if (state.board[0] === state.board[1] && state.board[1] === state.board[2]) {
      gameEnd(cell);
      alert(`${state.board[0]} has won the game!`);
    } else if (state.board[0] === state.board[3] && state.board[3] === state.board[6]) {
      gameEnd(cell);
      alert(`${state.board[0]} has won the game!`);
    } else if (state.board[0] === state.board[4] && state.board[4] === state.board[8]) {
      gameEnd(cell);
      alert(`${state.board[0]} has won the game!`);
    }
  } else if (cell.id === '1') {
    if (state.board[0] === state.board[1] && state.board[1] === state.board[2]) {
      gameEnd(cell);
      alert(`${state.board[0]} has won the game!`);
    } else if (state.board[1] === state.board[4] && state.board[4] === state.board[7]) {
      gameEnd(cell);
      alert(`${state.board[1]} has won the game!`);
    }
  } else if (cell.id === '2') {
    if (state.board[0] === state.board[1] && state.board[1] === state.board[2]) {
      gameEnd(cell);
      alert(`${state.board[0]} has won the game!`);
    } else if (state.board[2] === state.board[4] && state.board[4] === state.board[6]) {
      gameEnd(cell);
      alert(`${state.board[2]} has won the game!`);
    } else if (state.board[2] === state.board[5] && state.board[5] === state.board[8]) {
      gameEnd(cell);
      alert(`${state.board[2]} has won the game!`);
    }
  } else if (cell.id === '3') {
    if (state.board[3] === state.board[4] && state.board[4] === state.board[5]) {
      gameEnd(cell);
      alert(`${state.board[3]} has won the game!`);
    } else if (state.board[0] === state.board[3] && state.board[3] === state.board[6]) {
      gameEnd(cell);
      alert(`${state.board[0]} has won the game!`);
    }
  } else if (cell.id === '4') {
    if (state.board[3] === state.board[4] && state.board[4] === state.board[5]) {
      gameEnd(cell);
      alert(`${state.board[3]} has won the game!`);
    } else if (state.board[1] === state.board[4] && state.board[4] === state.board[7]) {
      gameEnd(cell);
      alert(`${state.board[1]} has won the game!`);
    } else if (state.board[0] === state.board[4] && state.board[4] === state.board[8]) {
      gameEnd(cell);
      alert(`${state.board[0]} has won the game!`);
    } else if (state.board[2] === state.board[4] && state.board[4] === state.board[6]) {
      gameEnd(cell);
      alert(`${state.board[2]} has won the game!`);
    }
  } else if (cell.id === '5') {
    if (state.board[3] === state.board[4] && state.board[4] === state.board[5]) {
      gameEnd(cell);
      alert(`${state.board[3]} has won the game!`);
    } else if (state.board[2] === state.board[5] && state.board[5] === state.board[8]) {
      gameEnd(cell);
      alert(`${state.board[2]} has won the game!`);
    }
  } else if (cell.id === '6') {
    if (state.board[2] === state.board[4] && state.board[4] === state.board[6]) {
      gameEnd(cell);
      alert(`${state.board[2]} has won the game!`);
    } else if (state.board[6] === state.board[7] && state.board[7] === state.board[8]) {
      gameEnd(cell);
      alert(`${state.board[6]} has won the game!`);
    } else if (state.board[0] === state.board[3] && state.board[3] === state.board[6]) {
      gameEnd(cell);
      alert(`${state.board[0]} has won the game!`);
    }
  } else if (cell.id === '7') {
    if (state.board[6] === state.board[7] && state.board[7] === state.board[8]) {
      gameEnd(cell);
      alert(`${state.board[6]} has won the game!`);
    } else if (state.board[1] === state.board[4] && state.board[4] === state.board[7]) {
      gameEnd(cell);
      alert(`${state.board[1]} has won the game!`);
    }
  } else if (cell.id === '8') {
    if (state.board[6] === state.board[7] && state.board[7] === state.board[8]) {
      gameEnd(cell);
      alert(`${state.board[6]} has won the game!`);
    } else if (state.board[2] === state.board[5] && state.board[5] === state.board[8]) {
      gameEnd(cell);
      alert(`${state.board[2]} has won the game!`);
    } else if (state.board[0] === state.board[4] && state.board[4] === state.board[8]) {
      gameEnd(cell);
      alert(`${state.board[0]} has won the game!`);
    }
  }
  if (state.moveCount === 9 && state.gameOver === false) {
    state.tieCount++;
    state.tieflag = 1;
    gameEnd(cell);
    alert(`it's a tie!`);

  } // i need a check for all items being filled and then making a tie, i can use a moveCount perhaps
};

var gameEnd = function (cell) {
  state.gameOver = true;
  console.log('state.tieflag', state.tieflag);
  if (!state.tieflag) {
    console.log('cell', cell);
    let xoScore = cell.innerText.toLowerCase() + 'Score';
    console.log('cell.innerText + Score', xoScore);
    state[xoScore] = state[xoScore] + 1;
    console.log('xoScore = ', xoScore);
    console.log(state[xoScore]);
  }

  if (state.gameOver === true) {
    removeCellsEventListeners();
    renderScore();
  }


  //on gameEnd i need to end the functionality of the game, and update the score, and reload that portion of the page, and also
  //research xmlhttprequest



};

var renderScore = function () {
  const score = document.getElementById('score');
  let temp = score;
  console.log('temp', temp);
  body.removeChild(score);
  let p = document.createElement('p');

  let text = document.createTextNode(`X: ${state.xScore}, O: ${state.oScore}, ties: ${state.tieCount}`);
  p.appendChild(text);
  p.id = 'score';
  body.appendChild(p);

};

var gameStart = function () {
  state.gameOver = false;
  state.moveCount = 0;
  state.tieflag = 0;
  state.board = [null, null, null, null, null, null, null, null, null];
  giveCellsEventListeners();
};
