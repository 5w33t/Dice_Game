/* global document */

/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores = [0, 0];
var roundScore = 0;
var activePlayer = 0;
var gameplay = true;


function init() {
    if (!gameplay) {
        document.querySelector('#name-' + activePlayer).textContent = 'Player ' + activePlayer;
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
        gameplay = true;
        document.querySelector('.player-0-panel').classList.add('active');
        document.querySelector('.player-1-panel').classList.remove('active');
    }
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
}

function playerSwap() {
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = 0;
    activePlayer = activePlayer === 1 ? 0 : 1;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gameplay) {
        var dice = Math.floor(Math.random() * 6) + 1;
        var diceDOM = document.querySelector('.dice');
        diceDOM.src = 'dice-' + dice + '.png';
        diceDOM.style.display = 'block';

        if (dice !== 1) {
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        } else {
            playerSwap();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gameplay) {
        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 10) {
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!!!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            gameplay = false;
        } else {
            playerSwap();
        }
    }
})

document.querySelector('.btn-new').addEventListener('click', init);
