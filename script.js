const gameContainer = document.getElementById("game");
const attempts = document.getElementById('attempts');
const amountMatched = document.getElementById('matches');
const highScore = document.getElementById('highScore');
attempts.innerText = 0;
amountMatched.innerText = 0;
highScore.innerText = localStorage.highScore;
if(!localStorage.highScore){
  highScore.innerText = 'No High Score';
};


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let amountClicked = 1;
let firstClickedColor = '';
let secondClickedColor = '';
let eventOne = '';
let eventTwo = '';
let matches = 0;
// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  if(amountClicked <= 2){
    if(amountClicked === 1 && event.target.id === ''){  
      eventOne = event.target;
      event.target.style.backgroundColor = event.target.className;
      firstClickedColor = event.target.className;
      event.target.id = '1';
      amountClicked ++;
    }
    else if(amountClicked === 2 && event.target.id === ''){
      eventTwo = event.target;
      event.target.style.backgroundColor = event.target.className;
      secondClickedColor = event.target.className;
      event.target.id = '2';
      amountClicked ++;
    };
  };
  if(amountClicked >= 3 && firstClickedColor != secondClickedColor){
    setTimeout(function(){
      amountClicked = 1;
      eventOne.style.backgroundColor = '';
      eventTwo.style.backgroundColor = '';
      eventOne.id = '';
      eventTwo.id = '';
      attempts.innerText++;
    }, 1000);
  }
  else if(amountClicked === 3 && eventOne != eventTwo){
    amountClicked = 1;
    matches ++;
    attempts.innerText++;
    amountMatched.innerText = matches;
  }
  else if(amountClicked === 3){
    setTimeout(function(){
      amountClicked = 1;
      eventOne.style.backgroundColor = '';
      eventTwo.style.backgroundColor = '';
      eventOne.id = '';
      eventTwo.id = '';
    }, 1000);
    attempts.innerText++;
  };
  if(matches == cardAmount.children.length/2){
    newGame.style.visibility = 'visible';
    matches = 0;
    if(attempts.innerText < localStorage.highScore || !localStorage.highScore){
      localStorage.setItem('highScore', attempts.innerText);
      highScore.innerText = localStorage.highScore;
    };
  };
  console.log("you just clicked", event.target, amountClicked);
};

// when the DOM loads
let cardAmount = '';
const startButton = document.getElementById('start');
const newGame = document.getElementById('newGame');
newGame.style.visibility ='hidden';

createDivsForColors(shuffledColors);
cardAmount = document.getElementById('game');

startButton.addEventListener('click', function(){
  cardAmount = document.getElementById('game');
  while(cardAmount.hasChildNodes()){
    cardAmount.removeChild(cardAmount.firstChild);
  };
  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors)
  attempts.innerText = 0;
  amountClicked = 1;
});

newGame.addEventListener('click', function(){
  while(cardAmount.hasChildNodes()){
    cardAmount.removeChild(cardAmount.firstChild);
  };
  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors)
  cardAmount = document.getElementById('game');
  newGame.style.visibility = 'hidden';
  attempts.innerText = 0;
  amountClicked = 1;
});
/* */