document.addEventListener('DOMContentLoaded', function () {

    const form = document.querySelector('.login');

    const submitButton = form.querySelector('.login__submit');


    submitButton.addEventListener('click', function (event) {
        console.log("Register Button Clicked");
        event.preventDefault();

        const username = document.getElementById("User_Name").value;
        const Email = document.getElementById("Email").value;
        const Access_Token = document.getElementById("Access_Token").value;
        const password = document.getElementById("Password").value;
        const cpassword = document.getElementById("CPassword").value;

        if(!(password === cpassword)){
            var x = document.getElementById("error");
            x.className = "show";
            x.innerText = "Password and Confirm Password Mismatching";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
            return
        }

        const data = {
            User_Name: username,
            Email_ID: Email,
            Access_Token: Access_Token,
            Password: password
        };
        
        console.log(username);
        console.log(password)

        fetch('http://127.0.0.1:8080/register', {
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
                    x.innerText = errorData.message;
                    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                });
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            window.location.href = 'Login.html';
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

});
