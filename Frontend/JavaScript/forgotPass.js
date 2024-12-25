document.addEventListener('DOMContentLoaded', function () {

    const form = document.querySelector('.login');

    const sendOtp = form.querySelector('.login__submit');


    sendOtp.addEventListener('click', function (event) {
        event.preventDefault();

        const username = document.querySelector('.login__input[type="text"]').value;

        if (!username.trim()) {
            var x = document.getElementById("error");
            x.className = "show";
            x.innerText = "Enter User Name";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
            return;
        }
        
        const data = {
            User_Name: username
        };
        
        console.log(username);
        fetch(`https://codemover-backend-73adc6530796.herokuapp.com/otp/generate/${data.User_Name}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
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
            console.log("Response in forgotPass:")
            console.log(response);
            return response.json();
        })
        .then(data => {
            console.log(data);

            const username = data.userName;

            var x = document.getElementById("error");
            x.className = "show";
            x.innerText = "Redirecting to OTP page...";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1000);

            sessionStorage.setItem('User_Name', username);
            setTimeout(function(){
                window.location.href = 'otp.html';
            },200)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

});
