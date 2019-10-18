var wordlist=[
	"COMPUTER",
	"TRAILER",
	"SUBARU",
	"SPONGE",
	"HOCKEY",
	"FATHER",
	"MOTHER",
	"CIRCUIT",
	"ROLLERBLADE",
	"ENGINE",
	"SEATBELT",
	"MOUNTAIN",
	"FISHING",
	"CHRISTMAS",
	"DISCIPLE",
	"AUDITORIUM",
	"PROCESSOR",
	"SPEAKER",
];

var lettersMatched=[];
var lettersMissed=[];
var frames=[
	"frame1",  // 0
	"frame2",  // 1
	"frame3",  // 2
	"frame4",  // 3
	"frame5",  // 4
	"frame6",  // 5
	"frame7",  // 6
	"frame8",  // 7
	"frame9",  // 8
	"frame10", // 9
	"frame11", // 10
	//"frame12", // 11
];
var curFrame=0;
var wordIndex=0;
function displayWord(){
	// loop all the letters of the secret word.
	// check each letter for a match in letters matched.
	// if the letter is found record that letter.
	// if not found record a dash.
	// finally displaythe generated string.
	var stringToDisplay="";
	for(var i=0;i<wordlist[wordIndex].length;i+=1){
		var thisLetter=wordlist[wordIndex][i];
		if(lettersMatched.indexOf(thisLetter)!=-1){
			stringToDisplay+=thisLetter;
		}
		else{
			stringToDisplay+="-";
		}
	}
	var output=document.querySelector("#displayedword");
	output.value=stringToDisplay;
	return stringToDisplay;
}

function newLetter(){
	// console.log(this, this.value);

	// this input allows only one letter at a time.
	if(this.value.length != 1){
		this.value="";
		alert("only input one letter at a time");
		return;
	}
	// convert the letter to uppercase.
	this.value=this.value.toUpperCase();

	// is this letter part of the word?
	if(wordlist[wordIndex].indexOf(this.value)!=-1){
		console.log(this.value, "was found in the word.");
	    lettersMatched.push(this.value);
	    var wordStatus=displayWord();
		if(wordStatus==wordlist[wordIndex]){
			setTimeout(function(){ alert("You Win"); resetGame(); }, 100);
		}
	}
	// This letter is unmatched.
	else{
		console.log(this.value, "was NOT found in the word.");
		if(lettersMissed.indexOf(this.value) == -1){
			// Add the letter to the letters missed array.
			lettersMissed.push(this.value);

			// Update the Hangman image.
			var hangmanstatus=document.getElementById("hangmanstatus");
			hangmanstatus.classList="";
			hangmanstatus.classList.add( frames[curFrame] );

			// Is this game over?
			if( curFrame >= frames.length-1 ){
				setTimeout(function(){alert("Game Over"); resetGame(); }, 100);
			}
			else{
				// Increment the current frame value.
				curFrame += 1;
			}


		}

	    // var text=letterinputdiv();
		// if(letterinput==unmatched[unmatchedletters]);
	}

	// clear the letter input.
	this.value="";

	// put the focus back on the input.
	this.focus();
}

function resetGame(){
	wordIndex=Math.floor(Math.random() * ( ( (wordlist.length-1) - 0 ) + 1) + 0);
	console.log(wordIndex, wordlist[wordIndex], "The game has started");
	curFrame=0;
	lettersMatched=[];
	lettersMissed=[];
	displayWord();
	var hangmanstatus=document.getElementById("hangmanstatus");
	hangmanstatus.classList="";
	hangmanstatus.classList.add( "frame0" );
}
window.onload=function(){
	// Math.random() * (max - min) + min;

	var letterinput=document.querySelector("#letterinput");
	letterinput.addEventListener("input", newLetter, false);
	resetGame();
};