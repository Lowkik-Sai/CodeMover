document.addEventListener('DOMContentLoaded', function () {

    const form = document.querySelector('.login');

    const submitButton = form.querySelector('.login__submit');


    submitButton.addEventListener('click', function (event) {
        event.preventDefault();

        const username = document.querySelector('.login__input[type="text"]').value;
        const password = document.querySelector('.login__input[type="password"]').value;

        const data = {
            User_Name: username,
            Password: password
        };

        
        console.log(username);
        console.log(password)

        fetch('http://127.0.0.1:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                // Parse the JSON response to access the message
                return response.json().then(errorData => {
                    console.log(errorData.message);
                    var x = document.getElementById("error");
                    x.className = "show";
                    x.innerText = errorData.message;
                    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                });
            }
            return response.json();
        })
        .then(data => {
            const jwtToken = data;

            const parts = jwtToken.split('.');
            const decodedPayload = JSON.parse(atob(parts[1]));
            const username = decodedPayload.User_Name;

            console.log("User_Name:", username);

            var x = document.getElementById("error");
            x.className = "show";
            x.innerText = "Successfully Logged In";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

            sessionStorage.setItem('JWT_Token', jwtToken);
            sessionStorage.setItem('User_Name', username);

            window.location.href = 'index.html';
        })
        .catch(error => {
            // Handle errors
            console.error('Error:', error);
        });
    });
});
