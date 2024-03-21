"use strict";

import { Questions } from "./Questionnaire.js";
import { code } from "./template.js";

//Testing from frontend to backend
function sendDataToBackend(data) {
    fetch('https://codemover-backend-73adc6530796.herokuapp.com/api/getAnswers', {
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

    const username = sessionStorage.getItem('User_Name');
    if(username == null){
        window.location.href = 'Login.html';
        return
    }

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
            if(isEquals(answersReceived[globalQuestions[countOfQns - 1]],"confirm")){
                code(answersReceived);              
            }           
            countOfAns = 0;              
            answersReceived = {};              
        }
        
        
        
        //Skip back to previous question
        if(isEquals(userMessage,"previous")){
            if(countOfQns<2){
                countOfQns=0;
                countOfAns=0;
                setTimeout(() => {
                    const robotMessage = messageEl("No More Previous Questions!", "chat-bot");
                    cardbodyEl.append(robotMessage);
                    // Scroll to the bottom of the chat body after robot message
                    cardbodyEl.scrollTop = cardbodyEl.scrollHeight;
                }, 300);
            }else{
            countOfQns-=2;
            countOfAns-=2;
            }
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

    inputEl.setSelectionRange(0, 0);


    let contribution_fetch_url = 'https://codemover-backend-73adc6530796.herokuapp.com/getcontribution/';

    console.log('User_Name: ', username);

    const User_Div = document.querySelector('.User-Name');
    const Settings_Div = document.querySelector('.settings_username');
    User_Div.textContent = username;
    Settings_Div.textContent = username;

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
        console.log(data);
        const divElement = document.querySelector('.circle');
        divElement.textContent = data;
    })
    .catch(error => {
        console.error('Error fetching data from API:', error);
    });

    let Emailfetchurl = 'https://codemover-backend-73adc6530796.herokuapp.com/getemail/';
    Emailfetchurl = Emailfetchurl + username;
    console.log("Email URL: ", Emailfetchurl);
    fetch(Emailfetchurl)
    .then(response => {
        if(!response.ok){
            throw new Error('Failed to Fetch Email from API');
        }
        return response.json();
    })
    .then(data => {
        console.log("EmailId: ", data);
        const Emaildiv = document.getElementById('Email');
        Emaildiv.value = data;
    })

    let AccessTokenfetchurl = 'https://codemover-backend-73adc6530796.herokuapp.com/getaccesstoken/';
    AccessTokenfetchurl += username;
    console.log("Access Token URL: ", AccessTokenfetchurl);
    fetch(AccessTokenfetchurl)
    .then(response => {
        if(!response.ok){
            throw new Error('Failed to Fetch Email from API');
        }
        return response.json();
    })
    .then(data => {
        console.log("Access Token: ", data);
        const AccessTokendiv = document.getElementById('AccessToken');
        AccessTokendiv.value = data;
    })
});

const saveButton = document.getElementById('saveButton');

saveButton.addEventListener('click', async function(){
    const Emaildiv = document.getElementById('Email');
    const AccessTokendiv = document.getElementById('AccessToken');

    let newEmail = Emaildiv.value;
    let newAccessToken = AccessTokendiv.value;

    let UpdateProfileurl = 'https://codemover-backend-73adc6530796.herokuapp.com/updateprofile/';

    UpdateProfileurl += sessionStorage.getItem('User_Name');

    const requestBody = JSON.stringify({
        Email: newEmail,
        Access_Token: newAccessToken
    });

    try {
        const response = await fetch(UpdateProfileurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: requestBody
        });

        if (!response.ok) {
            throw new Error('Failed to update profile');
        }

        console.log('Profile updated successfully');
    } catch (error) {
        console.error('Error updating profile:', error);
    }
});
