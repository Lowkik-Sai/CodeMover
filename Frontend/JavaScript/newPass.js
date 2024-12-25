document.addEventListener('DOMContentLoaded', function () {

    const form = document.querySelector('.login');

    const sendOtp = form.querySelector('.login__submit');

    const usernameInput = document.querySelector('.login__input[name="username"]');
    const storedUsername = sessionStorage.getItem('User_Name');
    if (usernameInput) {
        if (storedUsername) {
            usernameInput.setAttribute('readonly', ''); // or 'readonly="readonly"'
            usernameInput.value = storedUsername;
        }
    }

    
    
    sendOtp.addEventListener('click', function (event) {
        event.preventDefault();
        
        const password = document.querySelector('.login__input[name="password"]').value;
        const confirmPassword = document.querySelector('.login__input[name="confirmPassword"]').value;
        if (!password.trim()) {
            var x = document.getElementById("error");
            x.className = "show";
            x.innerText = "Enter New Password";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
            return;
        }
        if (!confirmPassword.trim()) {
            var x = document.getElementById("error");
            x.className = "show";
            x.innerText = "Enter Confirm Password";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
            return;
        }

        if(password!==confirmPassword){
            var x = document.getElementById("error");
            x.className = "show";
            x.innerText = "Password and Confirm Password are not matched!";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
            return;
        }
        
        const data = {
            Password: password
        };

        fetch(`https://codemover-backend-73adc6530796.herokuapp.com/updateprofile/password/${storedUsername}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    console.log(errorData.responseBody);
                    var x = document.getElementById("error");
                    x.className = "show";
                    x.innerText = errorData.responseBody;
                    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                });
            }
            console.log("Response in New Password:")
            console.log(response);
            return response.json();
        })
        .then(data => {
            console.log(data);

            var x = document.getElementById("error");
            x.className = "show";
            x.innerText = "Successfully Changed Password";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1000);
            setTimeout(function(){
                window.location.href = 'Login.html';
            },200)
        })
        .catch(error => {
            var x = document.getElementById("error");
            x.className = "show";
            x.innerText = "Something went wrong!";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
            console.error('Error:', error);
        });
    });

});
