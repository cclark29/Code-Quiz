
//IMPORTANT!
$(document).ready(function(){

// GLOBAL VARIABLES
// ================

	//Define all global variables and objects
	var currentQuestion; 
	var correctAnswer; 
	var incorrectAnswer; 
	var unanswered; 
	var seconds; 
	var time; 
	var answered; 
	var userSelect;
	var messages = {
		correct: "Correct",
		incorrect: "Wrong Answer",
		endTime: "Times Up",
		finished: "So, how'd you do?"
	};

	//All questions inside an array of objects
	var triviaQuestions = [
		{	question: "What is a Factor Rate?",
			answerList: [	"Amount Funded",
						"Interest",
						"Multiplier",
						"Amount paid back",
						"Daily Payment"],
			answer: 2,
			answerText: "Mulitplier"
		},

		{	question: "Our core product offered is considered which of the following?",
			answerList: [	"Advance",
						"Loan",
						"Lease",
						"LOC",
						"Asset Based"],
			answer: 0,
			answerText: "Advance."
		},

		{	question: "A business with 8 a more NSF's a month is considered what type of credit paper?",
			answerList: [	"A",
						"B",
						"C",
						"D",
						"None"],
			answer: 3,
			answerText: "D"
		},

		{	question: "What is a timly time frame to respond to an inquiry from a merhant or sales partner?",
			answerList: [	"2 Hours",
						"24 Hours",
						"1 day",
						"1 Week",
						"Any Time"],
			answer: 0,
			answerText: "2 Hours"
		},

		{	question: "What is the most important aspect to making sure  a merchant qualifies for an advance?",
			answerList: [	"Daily Ledger",
						"Number of Deposits",
						"Gross Deposits",
						"Time in Business",
						"None"],
			answer: 2,
			answerText: "Gross Deposits"
		},

		{	question: "Should an offer be checked before sending out to the client?",
			answerList: [	"Depends",
						"No",
						"Always",
						"When I have time",
						"Doesn't matter"],
			answer: 2,
			answerText: "Always",
		},

		
	];


// FUNCTIONS
// =========

	//This hides the game area on page load
	$("#gameCol").hide();
	
	//This captures user click on start button to create a new game
	$("#startBtn").on("click", function(){
		$(this).hide();
		newGame();
	});

	//This captures the user's click on the reset button to create a new game
	$("#startOverBtn").on("click", function(){
		$(this).hide();
		newGame();
	});

	//This function sets up the page for a new game emptying all areas and showing game area
	function newGame(){
		$("#gameCol").show();
		$("#finalMessage").empty();
		$("#correctAnswers").empty();
		$("#incorrectAnswers").empty();
		$("#unanswered").empty();
		currentQuestion = 0;
		correctAnswer = 0;
		incorrectAnswer = 0;
		unanswered = 0;
		newQuestion();
	}

	//This function displays the next question
	function newQuestion(){
		$("#message").empty();
		$("#correctedAnswer").empty();
		answered = true;
		
		//This function displays the new question
		$("#currentQuestion").html("Question " + (currentQuestion+1) + " of " + triviaQuestions.length);
		$(".question").html(triviaQuestions[currentQuestion].question);

		//This function displays the new questions's answer options in multiple choice type
		for(var i = 0; i <= 5; i++){

			var choices = $("<div>");
			choices.text(triviaQuestions[currentQuestion].answerList[i]);
			choices.attr({"data-index": i });
			choices.addClass("thisChoice");
			$(".answerList").append(choices);
		}

		//This sets the timer
		countdown();

		//When user clicks on an answer this will pause the time and display the correct answer to the question 
		$(".thisChoice").on("click",function(){
				userSelect = $(this).data("index");
				clearInterval(time);
				answerPage();
			});
		}

	//This function is for the timer countdown
	function countdown(){
		seconds = 15;
		$("#timeLeft").html("00:" + seconds);
		answered = true;
		//Sets a delay of one second before the timer starts
		time = setInterval(showCountdown, 1000);
	}

	//This function displays the countdown
	function showCountdown(){
		seconds--;

		if(seconds < 10) {
			$("#timeLeft").html("00:0" + seconds);	
		} else {
			$("#timeLeft").html("00:" + seconds);	
		}
		
		if(seconds < 1){
			clearInterval(time);
			answered = false;
			answerPage();
		}
	}

	//This function takes the user to the answer page after the user selects an answer or timer runs out
	function answerPage(){
		$("#currentQuestion").empty();
		$(".thisChoice").empty(); //Clears question page
		$(".question").empty();
		

		var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
		var rightAnswerIndex = triviaQuestions[currentQuestion].answer;

	

	
		//This checks to see if user choice is correct, incorrect, or unanswered
		if((userSelect == rightAnswerIndex) && (answered === true)){
			correctAnswer++;
			$('#message').html(messages.correct);
		} else if((userSelect != rightAnswerIndex) && (answered === true)){
			incorrectAnswer++;
			$('#message').html(messages.incorrect);
			$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		} else{
			unanswered++;
			$('#message').html(messages.endTime);
			$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
			answered = true;
		}
		
		if(currentQuestion == (triviaQuestions.length-1)){
			setTimeout(scoreboard, 6000);
		} else{
			currentQuestion++;
			setTimeout(newQuestion, 6000);
		}	
	}

	//This fucntion displays all the game stats
	function scoreboard(){
		$('#timeLeft').empty();
		$('#message').empty();
		$('#correctedAnswer').empty();


		$('#finalMessage').html(messages.finished);
		$('#correctAnswers').html("Correct Answers: " + correctAnswer);
		$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
		$('#unanswered').html("Unanswered: " + unanswered);
		$('#startOverBtn').addClass('reset');
		$('#startOverBtn').show();
		$('#startOverBtn').html("PLAY AGAIN");
	}

// MAIN PROCESS
//=============

}); //IMPORTANT!