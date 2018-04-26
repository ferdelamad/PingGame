/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
var scores, roundScore, activePlayer, gamePlaying;

var dicePic1 = document.getElementById('dice1')
var dicePic2 = document.getElementById('dice2')
var typedScore = document.querySelector('.inputScore')
//Start the Game
init();


document.querySelector(".btn-roll").addEventListener('click', function() {
  if (gamePlaying) {
    //1.- We need a random number from 1 to 6
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    //2.- We need to display the result (dice) randomly with each click
    dicePic1.style.display = 'unset';
    dicePic2.style.display = 'unset';
    dicePic1.src = 'dice-' + dice + '.png';
    dicePic2.src = 'dice-' + dice2 + '.png';

    if (dice !== 1 && dice2 !== 1) { //3.- Update the Round score IF the number is NOT a 1
      //add score
      roundScore += (dice + dice2);
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      //next player
    nextPlayer();
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if(gamePlaying) {
    //Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    //Update the UI
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    roundScore = 0;

    //Get the input value that the user typed
    input = typedScore.value
    //If the user does not set any value, winner score = 50, else convert the input into a Number
    !input ? input = 100 : input = Number(typedScore.value);

    //Check if player won
    if (scores[activePlayer] >= input) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!'
      dicePic1.style.display = 'none';
      dicePic2.style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    //  document.querySelector('.btn-roll').textContent = '';
    } else {//Change player
      nextPlayer();
    }
  }
});

//Clicking the button to reset the game;
document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  dicePic1.style.display = 'none';
  dicePic2.style.display = 'none';
}

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  dicePic1.style.display = 'none';
  dicePic2.style.display = 'none';
  //set scores and current scores to 0
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1'
  document.getElementById('name-1').textContent = 'Player 2'
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}
