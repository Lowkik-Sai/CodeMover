"use strict";

import { Questions } from "./Questionnaire.js";
import { code } from "./template.js";


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


document.addEventListener("DOMContentLoaded", async function() {
    let countOfQns = 1;
    const globalQuestions = await Questions();
    console.log("Questions :"+Questions())

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
        if(countOfQns==globalQuestions.length) countOfQns=0
    }

    function manageChat() {
        userMessage = inputEl.value.trim();
        if (!userMessage && !countOfAns) return;
        if (countOfAns) {
            countOfAns += 1;
            answersReceived.push(userMessage);
            inputEl.value = "";
            if (countOfAns == globalQuestions.length) {
                console.log("Questions Finished")
                sendDataToBackend(answersReceived) //Simply for checking for connect frontend to backend!!
                code(answersReceived);
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


    let contribution_fetch_url = 'http://127.0.0.1:8080/getcontribution/';

    const username = sessionStorage.getItem('User_Name');
    console.log('User_Name: ', username);

    contribution_fetch_url = contribution_fetch_url + username;
    console.log(contribution_fetch_url);
    fetch(contribution_fetch_url)
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
