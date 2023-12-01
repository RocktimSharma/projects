//Global Variables
const stack = [];
var pointer = 0;
const maxPointer = 6;
var scoreElement = document.getElementById("score");
var score = 0;

function allowDrop(event) {
  event.preventDefault();
}

function push(item) {
  if (pointer < maxPointer) {
    //Check if bracket item is a closing bracket
    if (isClosingBracket(item)) {
      //If the initial item is a closing bracket then game over
      if (pointer == 0) {
        gameOver();
      }

      //get the matching opening bracket
      const matchingOpeningBracket = findMatchingOpeningBracket(item);

      //check if the matching bracket is equal to the stack top element
      if (matchingOpeningBracket === stack[pointer - 1]) {
        //remove the element from the top of the stack
        removeMatchingOpeningBracket(matchingOpeningBracket);
      } else {
        if (pointer <= 0) {
          addItemToStack(item);
        } else {
          gameOver();
        }
      }
    } else {
      addItemToStack(item);
    }
  } else {
    gameOver();
  }
}

function pop(index) {
  //splice(index,howmany) removes items from array
  stack.splice(index, 1);
  pointer--;
  if (pointer == 0) {
    score = score + 2;
  } else {
    score++;
  }
  removeTopItemFromStack();
  scoreElement.innerText = score;
}

//function to add item into the stack
function addItemToStack(dragItem) {
  stack[pointer] = dragItem;
  pointer++;
  const stackItem = document.createElement("div");
  stackItem.className = "stack-item";
  stackItem.draggable = true;
  stackItem.innerText = dragItem;
  stackItem.ondragstart = function (e) {
    drag(e);
  };

  document.getElementById("stack-container").appendChild(stackItem);
  if (pointer === maxPointer) {
    gameOver();
  }
}

//Function to chcek if it a closing bracket
function isClosingBracket(bracket) {
  const closingBrackets = [")", "]", "}"];
  return closingBrackets.includes(bracket);
}

// Function to find the matching opening bracket in the stack
function findMatchingOpeningBracket(closingBracket) {
  const matchingPairs = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  return matchingPairs[closingBracket] || null;
}

// Function to remove the matching opening bracket from the stack
function removeMatchingOpeningBracket(openingBracket) {
  const stackIndex = stack.lastIndexOf(openingBracket);

  if (stackIndex !== -1) {
    pop(stackIndex);
  }
}

//Function to remove item from top of the stack
function removeTopItemFromStack() {
  const stackContainer = document.getElementById("stack-container");
  if (stackContainer.lastElementChild) {
    stackContainer.lastElementChild.remove();
  }
}

function drag(event) {
  // Save the dragged item's content
  event.dataTransfer.setData("text", event.target.innerText);
}

function generateRandomParenthesis() {
  // Randomly decide whether to add an opening or closing parenthesis
  const brackets = ["(", ")", "[", "]", "{", "}"];
  const randomIndex = Math.floor(Math.random() * brackets.length);
  return brackets[randomIndex];
}

function drop(event) {
  event.preventDefault();

  if (event.target.id === "stack-container") {
    if (pointer != maxPointer) {
      const dragItem = event.dataTransfer.getData("text");

      push(dragItem);

      // Remove the dropped item from the draggable container
      const draggedItem = document.querySelector(".draggable-item");
      if (draggedItem) {
        draggedItem.remove();
      }

      // If dropped in the stack container, generate a new random set
      const newDraggableItem = document.createElement("div");
      newDraggableItem.className = "draggable-item";
      newDraggableItem.draggable = true;
      newDraggableItem.innerText = generateRandomParenthesis();
      newDraggableItem.ondragstart = function (e) {
        drag(e);
      };

      document
        .getElementById("draggable-container")
        .appendChild(newDraggableItem);
    } else {
      gameOver();
    }
  }
}

//Game over
function gameOver() {
  const over = window.confirm("Game Over! Score: " + score);
  if (over) {
    location.reload();
  } else {
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const draggableContainer = document.getElementById("draggable-container");
  scoreElement.innerText = score;
  // Generate initial draggable items on page load
  for (let i = 0; i < 30; i++) {
    const draggableItem = document.createElement("div");
    draggableItem.className = "draggable-item col-sm m-1";
    draggableItem.draggable = true;
    draggableItem.innerText = generateRandomParenthesis();
    draggableItem.ondragstart = function (e) {
      drag(e);
    };

    draggableContainer.appendChild(draggableItem);
  }
});
