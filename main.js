'use strict';

// * Nessesary element select
const player0El = document.getElementById('player-0');
const player1El = document.getElementById('player-1');
const userScore0El = document.getElementById('score-0');
const userScore1El = document.getElementById('score-1');
const currentScore0El = document.getElementById('current-score-0');
const currentScore1El = document.getElementById('current-score-1');
const userDice = document.getElementById('dice');

const diceRollBtn = document.getElementById('diceRoll');
const newGameBtn = document.getElementById('newGame');
const holdBtn = document.getElementById('hold');

userDice.classList.add('hidden');

let playing , currentScore, activePlayer, scores;

const init = function(){
    playing = true;
    currentScore = 0;
    activePlayer = 0;
    scores = [0,0];
    
    userScore0El.textContent = 0;
    userScore1El.textContent = 0;
    currentScore0El.textContent = 0;
    currentScore1El.textContent = 0;
    
    userDice.classList.add('hidden');
    player0El.classList.remove('bg-black');
    player0El.classList.add('active-player');
    player1El.classList.remove('bg-black', 'active-player')
}
init();

// Player switch function
const switchPlayer = function(){
    currentScore = 0;
    document.getElementById(`current-score-${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('active-player');
    player1El.classList.toggle('active-player');
}

// Game win function
const gameWin = function(){
    playing = false;
    userDice.classList.add('hidden');
    document.getElementById(`player-${activePlayer}`).classList.remove('active-player');
    document.getElementById(`player-${activePlayer}`).classList.add('bg-black');
}


diceRollBtn.addEventListener('click', function(e){
   if(playing){
    userDice.classList.remove('hidden');
    // Genarate random dice
    const dice = Math.floor(Math.random() * 6) + 1;
    userDice.src = `./assets/dice-${dice}.png`; 

    if(dice !== 1){
        // Add dice to current score
        currentScore += dice;
        document.getElementById(`current-score-${activePlayer}`).textContent = currentScore;
    }else{
       switchPlayer();
    }
   }
})

holdBtn.addEventListener('click', function(){
   if(playing){
     // add current score to the total score
     scores[activePlayer] += currentScore;
     document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];
     
     // if score 100 acitive user will win
     if(scores[activePlayer] >= 10){
        gameWin();
     }else{
        switchPlayer();
     }
 
     // switch player
   }
})

newGameBtn.addEventListener('click',init)