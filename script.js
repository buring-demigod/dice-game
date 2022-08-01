'use strict';

// Selecting Elements.
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0Element = document.querySelector('#score--0');
const score1Element = document.querySelector('#score--1');
const currentScoreEl0 = document.getElementById('current--0');
const currentScoreEl1 = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

score0Element.textContent = 0;
score1Element.textContent = 0;
let playStatus = true;
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
diceElement.classList.add('hidden'); //adding hidden class to dice.

const switchplayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

btnRoll.addEventListener('click', function () {
    if (playStatus) {
        // 1.generating a random dice roll.
        const dice = Math.floor(Math.random() * 6 + 1);
        console.log(dice);

        //2.display dice.
        diceElement.classList.remove('hidden');
        diceElement.src = `dice-${dice}.png`;

        //3. check if 1.
        if (dice !== 1) {
            //Add dice to current score.
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else {
            //switch to next player.
            switchplayer();

        }
    }


});

btnHold.addEventListener('click', () => {
    if (playStatus) {
        //add current score to player.
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];


        // check if score adds upto to 100.
        if (scores[activePlayer] >= 100) {

            //finish game
            playStatus = false;
            diceElement.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

        }
        else {
            // go to other player.
            switchplayer();
        }
    }
})


// reset function to set everything back default.
const reset = function (i) {
    document.getElementById(`score--${i}`).textContent = 0;
    document.getElementById(`current--${i}`).textContent = 0;
    document.querySelector(`.player--${i}`).classList.remove('player--winner');
}


btnNew.addEventListener('click', () => {

    for (let i = 0; i < 2; i++) {
        scores[i] = 0;
        reset(i);
    }
    currentScore = 0;
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    activePlayer = 0;
    playStatus = true;
})