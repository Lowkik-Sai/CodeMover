"use strict";

function sendDataToBackend(data) {
    fetch('http://localhost:8080/api/getAnswers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "answersReceived": data }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(responseData => {
        console.log('Data sent to backend:', responseData);
        // Handle response from backend if needed
    })
    .catch(error => {
        console.error('Error sending data to backend:', error);
    });
}


document.addEventListener("DOMContentLoaded", function() {
    let countOfQns = 0;
    const globalQuestions = [
        "What's the Data Structure Utilized by the Solution?",
        "Enter the Question Name",
        "In which Programming Language was the Solution Crafted?",
        "What's the Time Complexity of the Solution?",
        "What's the Space Complexity of the Solution?",
        "Please Provide the Code for the Solution",
        "Question Link [Optional]",
        "Any Additional Notes to be Stored?",
        "What Difficulty Level does the Question Belong To?",
        "Please Enter 'confirm' if you're Ready to Proceed with the Commit"
    ]

    let answersReceived = [];
    let countOfAns = 0;

    const inputEl = document.querySelector(".input-chat");
    const btnEl = document.querySelector(".fa-regular.fa-paper-plane");
    const cardbodyEl = document.querySelector(".card-body");

    let userMessage;

    async function functionName(robot) {
        robot = robot.querySelector(".robot");
        robot.textContent = globalQuestions[countOfQns];
        countOfQns += 1;
    }

    function manageChat() {
        userMessage = inputEl.value.trim();
        if (!userMessage && !countOfAns) return;
        if (countOfAns) {
            countOfAns += 1;
            answersReceived.push(userMessage);
            inputEl.value = "";
            if (countOfAns == 3) {
                console.log("Questions Finished")
                sendDataToBackend(answersReceived);
                countOfAns = 0;
                answersReceived = [];
            }
        }

        // Append user message
        cardbodyEl.appendChild(messageEl(userMessage, "user"));

        // Scroll to the bottom of the chat body after user message
        cardbodyEl.scrollTop = cardbodyEl.scrollHeight;

        // Simulate robot response
        setTimeout(() => {
            const robotMessage = messageEl("Thinking...", "chat-bot");
            cardbodyEl.append(robotMessage);
            functionName(robotMessage);

            // Scroll to the bottom of the chat body after robot message
            cardbodyEl.scrollTop = cardbodyEl.scrollHeight;
        }, 300);
    }

    const messageEl = (message, className) => {
        inputEl.value = "";
        inputEl.focus();
        const chatEl = document.createElement('div');
        chatEl.classList.add("chat", `${className}`);
        let chatContent = className === "chat-bot" ?
            `<span class="user-icon"><i class='fa fa-robot'></i></span>
        <p class="robot">${message}</p>` :
            `<span class="user-icon"><i class='fa fa-user'></i></span>
        <p>${message}</p>`;
        chatEl.innerHTML = chatContent;
        return chatEl;
    }

    btnEl.addEventListener("click", manageChat);

    inputEl.addEventListener("keydown", (evt) => {
        if (evt.keyCode == 13 && !evt.shiftKey) {
            evt.preventDefault();
            manageChat();
        }
    });

    // Focus at the start of the textarea
    inputEl.setSelectionRange(0, 0);
});
