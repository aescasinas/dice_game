/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

const diceImgs = [
    'dice-1.png',
    'dice-2.png',
    'dice-3.png',
    'dice-4.png',
    'dice-5.png',
    'dice-6.png'
]

// DOM
const p1Name = document.querySelector('#name-0')
const p2Name = document.querySelector('#name-1')

const p1Panel = document.querySelector('.player-0-panel')
const p2Panel = document.querySelector('.player-1-panel')

const scoreP1 = document.querySelector('#score-0');
const scoreP2 = document.querySelector('#score-1');

const currentP1 = document.querySelector('#current-0');
const currentP2 = document.querySelector('#current-1');

const diceImg1 = document.querySelector('#first-dice');
const diceImg2 = document.querySelector('#second-dice');

const btnNewGame = document.querySelector('.btn-new')
const btnRollDice = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');

// FUNCTIONS
function rollDice() {
    let randInt1 = Math.floor(Math.random() * 6) + 1;
    diceImg1.src = diceImgs[randInt1 - 1];
    let randInt2 = Math.floor(Math.random() * 6) + 1;
    diceImg2.src = diceImgs[randInt2 - 1];

    let randIntSum = randInt1 + randInt2;

    if (randInt1 === 1 || randInt2 === 1) {
        p1currentScore = 0;
        currentP1.innerText = p1currentScore;
        p2currentScore = 0;
        currentP2.innerText = p1currentScore;
        switchPlayer()
        diceImg1.src = diceImgs[randInt1 - 1];
        diceImg2.src = diceImgs[randInt2 - 1];
    } else if (activePlayer === 'player 1') {
        p1currentScore += randIntSum;
        currentP1.innerText = p1currentScore;
    } else if (activePlayer === 'player 2') {
        p2currentScore += randIntSum;
        currentP2.innerText = p2currentScore;
    }
};


function switchPlayer() {
    diceImg1.src = '';
    diceImg2.src = '';
    if (activePlayer === 'player 1') {
        p1Panel.classList.toggle('active');
        p2Panel.classList.toggle('active');
        activePlayer = 'player 2'
    } else if (activePlayer === 'player 2') {
        p2Panel.classList.toggle('active');
        p1Panel.classList.toggle('active');
        activePlayer = 'player 1'
    }
}

function gameOver() {
    diceImg1.src = '';
    diceImg2.src = '';
    activePlayer = null;
    p1Panel.classList.remove('active');
    p2Panel.classList.remove('active');
    btnHold.disabled = true;
    btnRollDice.disabled = true;
}

function newGame() {
    activePlayer = 'player 1';
    p1Panel.classList.add('active');
    p2Panel.classList.remove('active');
    p1Name.innerText = 'PLAYER 1';
    p2Name.innerText = 'PLAYER 2';
    p1Panel.classList.remove('winner');
    p2Panel.classList.remove('winner');
    p1currentScore = 0;
    currentP1.innerText = 0;
    p2currentScore = 0;
    currentP2.innerText = 0;
    totalScore.p1Score = 0;
    scoreP1.innerText = 0;
    totalScore.p2Score = 0;
    scoreP2.innerText = 0;
    btnHold.disabled = false;
    btnRollDice.disabled = false;
    diceImg1.src = '';
    diceImg2.src = '';
}


function hold() {
    if (activePlayer === 'player 1') {
        totalScore.p1Score += p1currentScore;
        p1currentScore = 0;
        currentP1.innerText = p1currentScore;
        scoreP1.innerText = totalScore.p1Score;
        if (totalScore.p1Score >= 100) {
            p1Panel.classList.toggle('winner');
            p1Name.innerText = 'WINNER!';
            gameOver();
        }
        switchPlayer();
    } else if (activePlayer === 'player 2') {
        totalScore.p2Score += p2currentScore;
        p2currentScore = 0;
        currentP2.innerText = p2currentScore;
        scoreP2.innerText = totalScore.p2Score;
        if (totalScore.p2Score >= 100) {
            p2Name.innerText = 'WINNER!';
            p2Panel.classList.toggle('winner');
            gameOver();
        }
        switchPlayer();
    }
};

// VARIABLES
let totalScore = {
    p1Score: 0,
    p2Score: 0
}

let p1currentScore = 0;
let p2currentScore = 0;

let activePlayer = 'player 1';

// EVENTS
btnRollDice.addEventListener('click', rollDice);
btnHold.addEventListener('click', hold);
btnNewGame.addEventListener('click', newGame);
