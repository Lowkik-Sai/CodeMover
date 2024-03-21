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

        fetch('https://codemover-backend-73adc6530796.herokuapp.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    console.log(errorData.message);
                    var x = document.getElementById("error");
                    x.className = "show";
                    if(username == "" && password == ""){
                        x.innerText = "Invalid Credentials";
                    }
                    else{
                        x.innerText = errorData.message;
                    }

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
            setTimeout(function(){
                window.location.href = 'index.html';
            },200)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

});
