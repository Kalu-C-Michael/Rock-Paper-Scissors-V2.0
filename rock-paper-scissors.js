let score = JSON.parse(localStorage.getItem('score'));

if (score === null) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
    consecutiveWins: 0 // store streak inside score object
  };
};

// If old score in localStorage doesn't have streak yet, add it
if (score.consecutiveWins === undefined) {
  score.consecutiveWins = 0;
}

function updateScoreElements() {
  document.querySelector('.play-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
};

updateScoreElements();

// Code for setting the autoplay button //
let isAutoPlaying = false;
let intervalId;
                      
function autoPlay() {
 if (!isAutoPlaying) {
    intervalId = setInterval(function() {
      const playerMove = pickComputerMove();   
      playGame(playerMove);
    }, 1000);
   isAutoPlaying = true;// to stop autoplay function when clicked again 

    // When the game is auto playing, change
    // the text in the button to 'Stop Playing'.
    document.querySelector('.js-auto-play-button')
      .innerHTML = 'Stop Playing';
    
 }
 else {
  clearInterval(intervalId);
  isAutoPlaying = false;

  // When the game is not playing, change
  // the text back to 'Auto Play'.
  document.querySelector('.js-auto-play-button')
    .innerHTML = 'Auto Play';  
 }
}
// Solution for exercise 12s.
document.querySelector('.js-auto-play-button')
  .addEventListener('click', () => {
    autoPlay();
  });


// eventListeners for the rock, paper, scissors buttons // 
document.querySelector('.js-rock-button')
 .addEventListener('click', () => {
   playGame('rock');
 });

document.querySelector('.js-paper-button')
 .addEventListener('click', () => {
   playGame('paper');
 });
 
document.querySelector('.js-scissors-button')
 .addEventListener('click', () => {
   playGame('scissors');
 }); 


document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  }
    // Solution for 12u.
  else if (event.key === 'a') {
    autoPlay();
  
  // Solution for 12w.
  } else if (event.key === 'Backspace') {
    // Solution for 12w.
    // resetScore();

    // Solution for 12x.
    showResetConfirmation();
  }
});


 
function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';
  
  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.😂';
    } else if (computerMove === 'paper') {
      result = 'You win.😒';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }
  }

  else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.😒';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.😂';
    }
  }
  
  else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.😂';
    } else if (computerMove === 'scissors') {
      result = 'You win.😒';
    }
  }

  if (result === 'You win.😒') {
    score.wins += 1;
    score.consecutiveWins += 1; // increase streak

    if (score.consecutiveWins > 2) {
      alert("You're winning too much, stop it 👊.");
      score.consecutiveWins = 0; // reset after alert
    }
  }
  else if (result === 'You lose.😂') {
    score.losses += 1;
    score.consecutiveWins = 0; // reset streak
  }
  else if (result === 'Tie.') {
    score.ties += 1;
    score.consecutiveWins = 0; // reset streak
  }
  
  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElements();

  document.querySelector('.play-result').innerHTML = result;

  document.querySelector('.play-moves').innerHTML = `You chose
   <img src="./hand icons/${playerMove}-gloved.png" class="hand-icon"> 
    ,  I chose <img src="./hand icons/${computerMove}-gloved.png" class="hand-icon">`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove ='';
  
   if (randomNumber >= 0 && randomNumber < 1 / 3) {
      computerMove = 'rock';
    } 
    else if (randomNumber >= 1 / 3 && randomNumber  < 2 / 3) {
      computerMove = 'paper';
    } 
    else if (randomNumber >= 2 / 3 && randomNumber < 1) {
      computerMove = 'scissors';
    }

  return computerMove; 
}

// Solution for 12v.
function resetScore() {
  // reset the in-memory values
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  score.consecutiveWins = 0; // also reset the streak

  // remove the saved score (or overwrite it with the cleared score)
  // localStorage.removeItem('score');
  // it's neater to overwrite so the app always finds a score object
  localStorage.setItem('score', JSON.stringify(score));

  // update the UI using the correct function name
  updateScoreElements();
}


// Solution for 12v.
document.querySelector('.js-reset-score-button')
  .addEventListener('click', () => {
    // Solution for 12v.
    // resetScore();

    // Solution for 12x.
    showResetConfirmation();
  });

// Solution for 12x.
function showResetConfirmation() {
  document.querySelector('.js-reset-confirmation')
    .innerHTML = `
      Are you sure you want to reset the score?
      <button class="js-reset-confirm-yes reset-confirm-button">
        Yes
      </button>
      <button class="js-reset-confirm-no reset-confirm-button">
        No
      </button>
    `;
  
  document.querySelector('.js-reset-confirm-yes')
    .addEventListener('click', () => {
      resetScore();
      hideResetConfirmation();
    });
  
  document.querySelector('.js-reset-confirm-no')
    .addEventListener('click', () => {
      hideResetConfirmation();
    });
}

function hideResetConfirmation() {
  document.querySelector('.js-reset-confirmation')
    .innerHTML = '';
}
