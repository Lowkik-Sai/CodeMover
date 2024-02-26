"use strict";

import { Questions } from "./Questionnaire.js";

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
    const globalQuestions = Questions;

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

    fetch('http://127.0.0.1:8080/getcontribution/Naganathan05')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch data from API');
        }
        return response.json();
    })
    .then(data => {
        // Assign the fetched data to the div element
        console.log(data);
        const divElement = document.querySelector('.circle');
        divElement.textContent = data;
    })
    .catch(error => {
        console.error('Error fetching data from API:', error);
    });
});
