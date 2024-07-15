// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "\n";
 
   for (let i = 0; i < word.length; i++) {
       for (const pointValue in oldPointStructure) {
  
        if (oldPointStructure[pointValue].includes(word[i].toLowerCase())) {
         letterPoints += `Points for '${word[i]}': ${pointValue}\n`
        }
      }
    }
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   //console.log("Let's play some scrabble! Enter a word:");
   //console.log(`${oldScrabbleScorer(userWord)}`)                              // Came with starter code (modified by K) to demo Task 1 how scoring function works.

   console.log("Let's play some scrabble!\n");
   let userWord = input.question("Enter the word to score: ")
   
   return userWord;
};




// Task 4: 2. Locate the newPointStructure object in the starter code and set it equal to transform(oldPointStructure).
let newPointStructure = transform(oldPointStructure);



// simpleScorer: Define a function that takes a word as a parameter and returns a numerical score. 
// Each letter within the word is worth 1 point.

let simpleScorer = function(strSimpleWord){
   let numSimpleScore = 0;
   strSimpleWord = strSimpleWord.toUpperCase();

   for(let i=0; i<strSimpleWord.length; i++){

      if(strSimpleWord[i] === " "){
         // BONUS MISSION (2): Add no points (Do nothing) if space/blank tile is found
      }
      else{
         numSimpleScore += 1;
      }
   }

   return numSimpleScore;
};


// vowelBonusScorer: Define a function that takes a word as a parameter and returns a score. 
// Each vowel within the word is worth 3 points, and each consonant is worth 1 point.

let vowelBonusScorer = function(strVowelWord){
   let numVowelScore = 0;
   strVowelWord = strVowelWord.toUpperCase()

   for(let j=0; j < strVowelWord.length; j++){
      if(strVowelWord[j] === 'A' || strVowelWord[j] === 'E' || strVowelWord[j] === 'I' || strVowelWord[j] === 'O' || strVowelWord[j] === 'U'){
         numVowelScore += 3;

      }
      else if(strVowelWord[j] === " "){
         // BONUS MISSION (2): Add no points (Do nothing) if space/blank tile is found. 
      }
      else{
         numVowelScore += 1;   
      }
   } // end for
  
   return numVowelScore;
};


// Task 1. Uses the oldScrabbleScorer() function to determine the score for a given word.
/* Task 2. 3.
      Once you’ve defined newPointStructure, use it to finish writing the scrabbleScorer() function and then replace 
      the oldScrabbleScorer() function in scoringAlgorithms with this new function.
   Tip: oldScrabbleScorer() uses oldPointStructure and returns a score for each letter in a word. 
      You’ll want to write scrabbleScorer() to use newPointStructure and return a cumulative score for the whole word entered.
*/
let scrabbleScorer = function(strScrabbleWord){
   let numNewScrabbleScorer = 0;   
   strScrabbleWord = strScrabbleWord.toLowerCase()

   for (let i = 0; i < strScrabbleWord.length; i++) { 
      for(items in newPointStructure){
      
         if (items.includes(strScrabbleWord[i])) {
            numNewScrabbleScorer += Number(newPointStructure[items])   
            break;
         }
      }
   }  
   return numNewScrabbleScorer;
};

// 2. Examine the table for the information to store in name and description. The scorerFunction for each object should be the 
// name of one of the three scoring algorithms already defined.

let simpleObject = {
   'name' : 'Simple Score',
   'description' : 'Each letter is worth 1 point.', 
   'scorerFunction' : simpleScorer
   //'scorerFunction' : function(strWord1){return simpleScorer(strWord1)}
};
let vowelObject = {
   'name' : 'Bonus Vowels Score',
   'description' : 'Vowels are 3 pts, consonants are 1 pt.', 
   'scorerFunction' : vowelBonusScorer
   //'scorerFunction' : function (strWord2){return vowelBonusScorer(strWord2)}
};
let scrabbleObject = {
   'name' : 'Scrabble Score',
   'description' : 'The traditional scoring algorithm.', 
   'scorerFunction' : scrabbleScorer                                          
   //'scorerFunction' : function(strWord3){return oldScrabbleScorer(strWord3)}                // oldScrabbleScorer()
};

// 1. Finish writing the scoringAlgorithms array. It should be populated with three objects, 
//    one for each of the three scoring options. Each object should contain three keys: name, description, and scorerFunction.

const scoringAlgorithms = [simpleObject, vowelObject, scrabbleObject];


/* Task 2: 3. Finish writing scorerPrompt() so that the user can select which scoring algorithm to use when the program scores 
      their word. Use the selected algorithm to determine the score for the word:
      If the user enters 0, have the program output a score using the simple scorer.
      If the user enters 1, use the vowel bonus scoring function.
      If the user enters 2, use the Scrabble scoring option.
      scorerPrompt() should return the object the user has selected.
*/

function scorerPrompt() {
   let numUserChoice = Number(input.question(`Which scoring algorithm would you like to use?
   0 - Simple: One point per character
   1 - Vowel Bonus: Vowels are worth 3 points
   2 - Scrabble: Uses scrabble point system
Enter 0, 1, or 2: `));

      // BONUS MISSION (1): Validating user input.
      while(!(numUserChoice === 0 || numUserChoice === 1 || numUserChoice === 2)){
         numUserChoice = Number(input.question(`\nInvalid input. Pick a number between 0, 1, or 2 to select a scoring algorithm. `));
      }

      let scoringObject = [];
      if(numUserChoice === 0){
         scoringObject = scoringAlgorithms[0];
      }
      else if(numUserChoice === 1){
         scoringObject = scoringAlgorithms[1];
      }
      else if(numUserChoice === 2){
         //scoringAlgorithms[2].scorerFunction = scrabbleScorer;        // Changing scoring() dynamically. But fails npm test. So hardcoded scoring() into scrabble object.
         newPointStructure[' '] = 0;                                    // BONUS MISSION (2): checking for spaces & assigning 0 to it.
         scoringObject = scoringAlgorithms[2];
      }

   return scoringObject;
}

/*  Task 4: 1.
Write the rest of the transform() function. It will need to take an object as a parameter - specifically the oldPointStructure object. 
Calling transform(oldPointStructure) will return an object with lowercase letters as keys. The value for each key will be the points 
assigned to that letter.

Task 4: 3. Once you’ve defined newPointStructure, use it to finish writing the scrabbleScorer() function and then 
replace the oldScrabbleScorer() function in scoringAlgorithms with this new function.
*/

function transform(objOldPointStructure) {
  
   let objNewPointStructure = {};
   let i = 0;

   for(item in objOldPointStructure){
      let strLetters = objOldPointStructure[item];
   
      for (i=0; i < strLetters.length; i++){
         strLetters[i] = strLetters[i].toLowerCase();
         objNewPointStructure[strLetters[i]] = Number(item);
      }
   }
   
   return objNewPointStructure;
};


function runProgram() {
   let firstWord = initialPrompt();
   let objToBeScored = scorerPrompt()
   console.log(`\nScore for '${firstWord.toUpperCase()}' is ${objToBeScored.scorerFunction(firstWord)}`)

   let userChoice = input.question("\nWould you like to score another word? Enter 'Y' to continue: ").toUpperCase();
   while(userChoice === "Y"){                                                      // Carrie's BONUS MISSION
      firstWord = initialPrompt();
   
      objToBeScored = scorerPrompt()
      console.log(`\nScore for '${firstWord.toUpperCase()}' is ${objToBeScored.scorerFunction(firstWord)}`)

      userChoice = input.question("\nWould you like to score another word? Enter 'Y' to continue: ").toUpperCase();
   }
   console.log("Hope you enjoyed playing! Bye Bye! ")
}



// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
