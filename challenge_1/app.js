const gameboard = document.getElementById('#gameboard');
const test = document.querySelector('body');
console.log('document', document);
console.log('test', test);
console.log('gameboard', gameboard);
//why is this NULL ??????

//queryselector('head') works but queryselector('body') doesn't, mysterious??? needs more understanding




// i currently have a css page that is apparently not needed - i will just detach it when it's time to finish lol, but for now it helps me kinda see things i think.

// i have a table with 9 separate cells

//if i click on any of these cells, it needs to alternate between x and o

// if it's jquery, i can do something like (#gameboard).on('click') - i need some kind of vanilla js equivalent, we shall see


//i can technically give each and every td a separate id, like 1-9, and whenever one of them is clicked i can toggle an x or o into it

//and make it toggle between x and o on alternating clicks

