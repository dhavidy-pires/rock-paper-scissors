let userScore = 0;
let compScore = 0;
const maxScore = 3;

const tag_userScore = document.getElementById('user-score');
const tag_compScore = document.getElementById('computer-score');
const tag_resultMessage = document.getElementById('result-message');


const handleChoice = function (choice) {
  game(choice);
}

const handleCompChoice = function() {
  const choices = ['rock', 'paper', 'scissors'];
  const random = Math.floor(Math.random() * 3);
  return choices[random];
}

const stopGame = function() {
  hideChoices();
  document.getElementById('resetBtn').style.opacity = 1;
}

const resetGame = function() {

  userScore = 0;
  tag_userScore.innerText = userScore;
  compScore = 0;
  tag_compScore.innerText = compScore;

  document.getElementById('resetBtn').style.opacity = 0;
  tag_resultMessage.innerHTML = "Make your move."

  showChoices();
}

const resetSelection = function(choice) {
  setTimeout(function(){ 
    document.getElementById(choice).style.backgroundColor = "rgba(255,255,255,0)"; 
    userScore < maxScore & compScore < maxScore ? tag_resultMessage.innerHTML = "Make your next move." : null;
  }, 2000);
}

const hideChoices = function() {
  document.getElementById('choices').style.opacity = 0;
}

const showChoices = function() {
  document.getElementById('choices').style.opacity = 1;
}

const userWins = function(choice, compChoice) {
  document.getElementById(choice).style.backgroundColor = "#68de5f";

  userScore += 1;
  tag_userScore.innerText = userScore;
  
  const winMessages = [
    '- Whoa! Good one.',
    '- Nice!',
    '- Well done!'
  ];

  let randomMessage = '';

  if(userScore >= maxScore) {
    randomMessage = '<br /><br /> YOU WON THE GAME'
  } else {
    randomMessage = winMessages[Math.floor(Math.random() * 3)];
  }

  tag_resultMessage.innerHTML = choice.big() + " beats " + compChoice.big() + randomMessage;

  resetSelection(choice);
}

const userLoses = function(choice, compChoice) {
  document.getElementById(choice).style.backgroundColor = "#de6c5f";

  compScore += 1;
  tag_compScore.innerText = compScore;
  
  const loseMessages = [
    '- Oops! Not this time.',
    '- Try again!',
    '- You lose.'
  ];

  let randomMessage = '';

  if(compScore >= maxScore) {
    randomMessage = '<br /><br /> GAME OVER'
  } else {
    randomMessage = loseMessages[Math.floor(Math.random() * 3)];
  }
  
  tag_resultMessage.innerHTML = choice.big() + " loses to " + compChoice.big() + randomMessage;

  resetSelection(choice);
}

const userDraw = function(choice, compChoice) {
  document.getElementById(choice).style.backgroundColor = "#ffffff";

  tag_resultMessage.innerHTML = choice.big() + " and " + compChoice.big() + " - It\'s a draw!";

  resetSelection(choice);
}


const game = function(choice) {

  const compChoice = handleCompChoice();

  switch (choice + '-' + compChoice) {
    case "rock-scissors":
    case "paper-rock":
    case "scissors-paper":
      userWins(choice, compChoice);
      break;
    case "rock-paper":
    case "paper-scissors":
    case "scissors-rock":
      userLoses(choice, compChoice);
      break;
    case "rock-rock":
    case "paper-paper":
    case "scissors-scissors":
      userDraw(choice, compChoice);
      break;
  }
  userScore == maxScore | compScore == maxScore ? stopGame() : null;

}