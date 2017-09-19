const hello = {
  'Tester Board': {
    'To Do': ['Laundry', 'Buy Apples', 'Pay Phone Bill'],
    'Doing': ['Laundry', 'Studying Javascript', 'Studying HTML', 'Studying Ruby'],
    'Done': ['Laundry']
  },
  'Dreams': {
    'Wish List': ['Conquer the Seven Kingdoms', 'Get my baby back', 'My hand needs to chill'],
  }
};
// LIST BOARDS
function listBoards() {
  let number = 1;
  console.log('------------------');

  for (let i in hello) {
    console.log(number++ + ' - ' + i);
    console.log('------------------');
  }
}

listBoards();

// CREATE BOARD
function createBoard(boardName) {
  if (boardName in hello) {
    return ('Board already exists');
  } else {
    hello[boardName] = {};
    return (`Board ${boardName} was created`);
  }
}

console.log(createBoard("Dreams"));
console.log(createBoard("New Board"));
listBoards();

// REMOVE BOARD
function removeBoard(boardName) {
  if (boardName in hello) {
    delete hello[boardName];
    return (`Board ${boardName} was deleted`);
  } else {
    return (`Board doesn't exist`);
  }
}

console.log(removeBoard("New Board"));
console.log(removeBoard("Bla"));
listBoards();

// DISPLAY BOARD
function displayBoard(boardName) {
  if (boardName in hello) {
    for (let i in hello[boardName]) {
      let items = hello[boardName][i];

      console.log("|------------------");
      console.log("| " + i);
      console.log("|------------------");

      for (let j=0; j<items.length; j++) {
        console.log("|> " + items[j]);
      }
    }
  }
}

displayBoard('Tester Board');


// CREATE LIST
function createList(boardName, listName) {
  if (boardName in hello) {
    if (listName in hello[boardName]) {
      return (`List name already exists`);
    } else {
      hello[boardName][listName] = [];
    }
  } else {
      return (`Board doesn't exist`);
  }
}

console.log(createList('BLA', 'Dreams'));
console.log(createList('Dreams', 'Wish List'));
createList('Dreams', 'New List');
displayBoard('Dreams');


// CREATE CARD
function createCard(boardName, listName, cardName) {
  if (boardName in hello) {
    if (listName in hello[boardName]) {
      hello[boardName][listName].push(cardName);
    } else {
      return (`List doesn't exist`);
    }
  } else {
    return (`Board doesn't exist`);
  }
}

console.log(createCard('Bla', 'Dreams', 'New card'));
console.log(createCard('Dreams', 'Bla', 'New card'));
console.log(createCard('Dreams', 'New List', 'New Card'));
displayBoard('Dreams');
