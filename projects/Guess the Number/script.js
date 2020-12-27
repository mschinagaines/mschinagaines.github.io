//Declares the variables being used in the game//

let randomNumber = Math.floor(Math.random() * 100) + 1; //assigns the variable randomNumber a numerical value between 1 and 100

// these variables are used to store a reference to the results p elements of our HTML
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

// these variables are used to store references to the form and the submit buttons
const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

let guessCount = 1;
let resetButton;

/*
        - Let (and var) declares variables that can be changed in the future
        - Const declares an immutable variable that cannot be changed once it is delcared
*/

// checks the players number for whether it is correct as well counting the number of guesses the player has completed
function checkGuess() {
    let userGuess = Number(guessField.value);     // creates a variable that is used to store the user's number
    if (guessCount === 1) {         // The player's guess content is equal to 'previous guesses' when guessCount === 1
      guesses.textContent = 'Previous guesses: ';
    }

    guesses.textContent += userGuess + ' ';       // appends the previous if statement and declares the guesses content is equal to the guess + an empty string
   
    if (userGuess === randomNumber) {   //if the player's guess is equal to the randomNumber
      lastResult.textContent = 'Congratulations! You got it right!'; //congradulatory message
      lastResult.style.backgroundColor = 'green';     // green color for correct
      lowOrHi.textContent = '';
      setGameOver();    // run the function setGameOver

    } else if (guessCount === 10) {     // if the player reaches 10 guesses
      lastResult.textContent = '!!!GAME OVER!!!';   // ends game
      setGameOver();    // runs the function setGameOver

    } else {    // if the player has not reached 10 guesses (and its just plain wrong)
      lastResult.textContent = 'Wrong!';    //WRONG message
      lastResult.style.backgroundColor = 'red';   //red color for incorrect

      if(userGuess < randomNumber) {    //if the player's guess is lower than the randomNumber
        lowOrHi.textContent = 'Last guess was too low!';    //message "guess was too low!"
      } 
      else if(userGuess > randomNumber) {     //if the player's guess is higher than the randomNumber
        lowOrHi.textContent = 'Last guess was too high!';   //message "guess was too high!"
      }
    }
   

    //gets the game ready for the next guess (in the case that the randomNumber has not been reached nor has the number of guesses been exceeded)
    guessCount++; //the guess count increases (after the else statement)
    guessField.value = ''; //empties the value previously
    guessField.focus();   //focuses back on the now empty text field
  }

  //event listener that listens for 2 arguments; the string 'click' and the checkGuess function
  guessSubmit.addEventListener('click', checkGuess);

  //a function to end the game 
  function setGameOver() {
    guessField.disabled = true;   //disables the guessFild
    guessSubmit.disabled = true;  //diables the guessSubmit
    resetButton = document.createElement('button'); // creates a reset button
    resetButton.textContent = 'Start new game';   //adds the text onto the button
    document.body.append(resetButton);    //attaches the button just created as a child to the body tag of the HTML document
    resetButton.addEventListener('click', resetGame);   //adds event listener to the button and it listens for the 'click' string and the resetGame function
  }

  //when the game is resetted
  function resetGame() {
    guessCount = 1;   //guessCount is declared as 0 once again
  
    const resetParas = document.querySelectorAll('.resultParas p'); //the variable resetParas is emptied in to make way for the new values of the future game
    for (let i = 0 ; i < resetParas.length ; i++) {
      resetParas[i].textContent = '';
    }
  
    resetButton.parentNode.removeChild(resetButton); //removes the resetButton
  
    guessField.disabled = false;    //enables the guessField
    guessSubmit.disabled = false;   //enables the guessSubmit button
    guessField.value = '';    
    guessField.focus();   //refocuses back on the guessField
  
    lastResult.style.backgroundColor = 'white';   //changes the last result style to white
  
    randomNumber = Math.floor(Math.random() * 100) + 1;   //declares a random value between 1 and 100 to randomNumber again
  }
