// Local Variables to handle User Response
let currentQuestion = '';
let currentAnswer = '';
let currentExplanation = '';

function getCurrentTimestamp() {
	return new Date();
}

function renderMessageToScreen(args) {
	// local variables
	let displayDate = (args.time || getCurrentTimestamp()).toLocaleString('en-IN', {
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	});
	let messagesContainer = $('.messages');

	// init element
	let message = $(`
	<li class="message ${args.message_side}">
		<div class="avatar"></div>
		<div class="text_wrapper">
			<div class="text">${args.text}</div>
			<div class="timestamp">${displayDate}</div>
		</div>
	</li>
	`);

	// add to parent
	messagesContainer.append(message);

	// animations
	setTimeout(function () {
		message.addClass('appeared');
	}, 0);
	messagesContainer.animate({ scrollTop: messagesContainer.prop('scrollHeight') }, 300);
}

function showUserMessage(message, datetime) {
	renderMessageToScreen({
		text: message,
		time: datetime,
		message_side: 'right',
	});
}

function showBotMessage(message, datetime) {
	renderMessageToScreen({
		text: message,
		time: datetime,
		message_side: 'left',
	});
}

// API Invokation
function generateAPIResponse() {
	return new Promise((resolve, reject) => {
		fetch('/generate')
        .then((response) => {
            if (!response.ok) {
                reject('Network response was not ok');
				return;
            }
			resolve(response.json());
			return
        })
        .catch((error) => {
            reject('There has been a problem with your fetch operation');
			return;
        });
	})
}

async function handleBotResponse() {
	try {
		const apiResponse = await generateAPIResponse();
		currentQuestion = apiResponse?.question || '';
		currentAnswer = apiResponse?.answer || '';
		currentExplanation = apiResponse?.explanation || '';
	}
	catch(error) {
		const errorResponse = "We are currently experiencing some issues with our system. Please try again later, and we apologize for any inconvenience this may cause. If you have any other questions or need assistance, feel free to reach out!";
		currentQuestion = errorResponse;
		currentAnswer = errorResponse;
		currentExplanation = errorResponse;
	}

	showBotMessage(currentQuestion);
}

// Handle Enter Key Operation
$(document).ready(function() {
    $('#msg_input').keydown(function(e) {
        // Check for 'Enter' key
        if (e.key === 'Enter') {
            // Prevent default behaviour of enter key
            e.preventDefault();
			// Trigger send button click event
            $('#send_button').click();
        }
    });
});

// Handle Send Button Operations
$('#send_button').on('click', async function (e) {
	// get and show message and reset input
	const userResponse = $('#msg_input').val();
	showUserMessage(userResponse);
	$('#msg_input').val('');

	if (userResponse == currentAnswer) {
		showBotMessage("Great job! That's the right answer");
	}
	else {
		showBotMessage(`Almost there! The right answer is ${currentAnswer}. Let me explain ${currentExplanation}`);
	}

	showBotMessage("Here's the next question");

	await handleBotResponse();
});

// Initial Message on Page Load
$(window).on('load', async function () {
	showBotMessage(
		"Hi there! I'm MathMate, your go-to for math practice. I'll provide you with math questions to work on. If you get stuck, I'll offer explanations to help you understand where you might have gone wrong. Ready to dive in?"
	);

	await handleBotResponse();
});