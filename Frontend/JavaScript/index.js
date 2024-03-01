"use strict";

import { Questions } from "./Questionnaire.js";
import { code } from "./template.js";

//Testing from frontend to backend
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

//Comparing strings using local compare function
function isEquals(a, b) {
    return typeof a === 'string' && typeof b === 'string'
        ? a.localeCompare(b, undefined, { sensitivity: 'base' }) === 0
        : a === b;
}

document.addEventListener("DOMContentLoaded", async function() {
    let countOfQns = 1;
    const globalQuestions = await Questions();

    let answersReceived = {};
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
        if(!userMessage){
            answersReceived[globalQuestions[countOfQns - 1]]="Not Defined";
            return
        }   
        // Append user message
        cardbodyEl.appendChild(messageEl(userMessage, "user"));
        
        // Scroll to the bottom of the chat body after user message
        cardbodyEl.scrollTop = cardbodyEl.scrollHeight;

        //Terminate the process and Restart the command
        if(isEquals(userMessage,"terminate") || isEquals(userMessage,"restart")){
            countOfQns=0;
            countOfAns=0;
            setTimeout(() => {
                messageEl("Terminated Process", "chat-bot");
                const robotMessage = messageEl("Restarted!", "chat-bot");
                cardbodyEl.append(robotMessage);
                // Scroll to the bottom of the chat body after robot message
                cardbodyEl.scrollTop = cardbodyEl.scrollHeight;
            }, 300);

            setTimeout(() => {
                const robotMessage = messageEl("From Beginning", "chat-bot");
                cardbodyEl.append(robotMessage);
                functionName(robotMessage);
                // Scroll to the bottom of the chat body after robot message
                cardbodyEl.scrollTop = cardbodyEl.scrollHeight;
            }, 1000);
            
            return;
        }
        
        countOfAns += 1;              
        answersReceived[globalQuestions[countOfQns - 1]]=userMessage;              
        inputEl.value = ""; 
        if (countOfAns == globalQuestions.length) {              
            console.log("Questions Finished")              
            sendDataToBackend(answersReceived) //Simply for checking for connect frontend to backend!!  
            console.log("last q " + globalQuestions[countOfQns - 1]);
            if(isEquals(answersReceived[globalQuestions[countOfQns - 1]],"confirm")){
                code(answersReceived);              
            }           
            countOfAns = 0;              
            answersReceived = {};              
        }
       



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

    const User_Div = document.querySelector('.User-Name');
    User_Div.textContent = username;

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
