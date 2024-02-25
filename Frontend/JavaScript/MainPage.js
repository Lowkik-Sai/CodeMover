"use strict";

document.addEventListener("DOMContentLoaded", function() {
    const inputEl = document.querySelector(".input-chat");
    const btnEl = document.querySelector(".fa-regular.fa-paper-plane");
    const cardbodyEl = document.querySelector(".card-body");

    let userMessage;

    async function functionName(robot) {
        robot = robot.querySelector(".robot");
        //robot.textContent = messages from stack
    }

    function manageChat() {
        userMessage = inputEl.value.trim();
        if (!userMessage) return;
        inputEl.value = "";
    
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

            
        }, 200);
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

    inputEl.addEventListener("input", (e) => {
        e.preventDefault();
        e.target.addEventListener("keydown", (keyboard) => {
            if (keyboard.key === "Enter") {
                manageChat();
            }
        })
    });

    // Focus at the start of the textarea
    inputEl.setSelectionRange(0, 0);

});

