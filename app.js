/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;

//document.querySelector("#current-" + activePlayer).textContent = dice;

document.querySelector(".dice").style.display = 'none';
//set scores and current scores to 0
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

document.querySelector(".btn-roll").addEventListener('click', function() {
  //1.- We need a random number from 1 to 6
  var dice = Math.floor(Math.random() * 6) + 1;

  //2.- We need to display the result (dice) randomly with each click
  var dicePic = document.querySelector('.dice');
  dicePic.style.display = 'unset';
  dicePic.src = 'dice-' + dice + '.png';

  //3.- Update the Round score IF the number is NOT a 1
  if (dice !== 1) {
    //add score
    roundScore += dice
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  } else {
    //next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

  }

});
//<img src="dice-5.png"
// document.addEventListener('click', function(){
//
// });