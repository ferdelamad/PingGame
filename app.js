/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
var scores, roundScore, activePlayer, gamePlaying;

var lastDice;
var counterSix = 0;
//Start the Game
init();

var dicePic = document.querySelector('.dice');

document.querySelector(".btn-roll").addEventListener('click', function() {
  if (gamePlaying) {
    //1.- We need a random number from 1 to 6
    var dice = Math.floor(Math.random() * 6) + 1;

    //2.- We need to display the result (dice) randomly with each click
    dicePic.style.display = 'unset';
    dicePic.src = 'dice-' + dice + '.png';

    if (dice === 6 && lastDice === 6) {
      console.log('You got a second 6 =/')
      scores[activePlayer] = 0;
      document.getElementById('score-' + activePlayer).textContent = 0;
      nextPlayer();
    } else if (dice !== 1) { //3.- Update the Round score IF the number is NOT a 1
      //add score
      if (dice === 6) {
        console.log('You got one 6 wath out for the second one!')
        counterSix++;
      }
      roundScore += dice
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      //next player
    nextPlayer();
    }
    lastDice = dice;
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if(gamePlaying) {
    //Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    //Update the UI
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    roundScore = 0;

    //Check if player won
    if (scores[activePlayer] >= 20) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!'
      dicePic.style.display = 'none';
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
  lastDice = 0;
  counterSix = 0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  dicePic.style.display = 'none';
}

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  document.querySelector(".dice").style.display = 'none';
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
