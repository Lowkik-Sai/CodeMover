document.addEventListener('DOMContentLoaded', function () {

    const form = document.querySelector('.login');

    const sendOtp = form.querySelector('.login__submit');

    const usernameInput = document.querySelector('.login__input[type="text"]');
    const storedUsername = sessionStorage.getItem('User_Name');
    if (usernameInput) {
        if (storedUsername) {
            usernameInput.setAttribute('readonly', ''); // or 'readonly="readonly"'
            usernameInput.value = storedUsername;
        }
    }


    sendOtp.addEventListener('click', function (event) {
        event.preventDefault();

        const OTP = document.querySelector('.login__input[type="password"]').value;
        if (!OTP.trim()) {
            var x = document.getElementById("error");
            x.className = "show";
            x.innerText = "Enter OTP";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
            return;
        }
        
        const data = {
            otp: OTP
        };

        fetch(`https://codemover-backend-73adc6530796.herokuapp.com/otp/verify/${storedUsername}`, {
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
            console.log("Response in OTP:")
            console.log(response);
            return response.json();
        })
        .then(data => {
            console.log(data);

            var x = document.getElementById("error");
            x.className = "show";
            x.innerText = "Change Password...";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1000);
            setTimeout(function(){
                window.location.href = 'newPass.html';
            },200)
        })
        .catch(error => {
            var x = document.getElementById("error");
            x.className = "show";
            x.innerText = "Invalid OTP";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
            console.error('Error:', error);
        });
    });

});
