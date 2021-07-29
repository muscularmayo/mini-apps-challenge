const gameboard = document.getElementById('gameboard');
const head = document.querySelector('head');
const body = document.querySelector('html').querySelector('body');
const cells = document.querySelectorAll('td');


console.log('document', document);
console.log('queryselector(head)', head);
console.log('gameboard', gameboard);
console.log('body', body);
console.log('cells', cells);
//why is this NULL ??????

// moving script src to the bottom of the page makes it work
// i was apparently loading the script before the rest of the html was rendered and couldn't access it?


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

if i have an array of array's... board[0][0] is the first spot, board[2][2] is the last spot

on the first click, x, on the second click, o,
*/

const board = [[null, null, null],
               [null, null, null],
               [null, null, null]];



