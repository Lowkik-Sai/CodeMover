document.addEventListener("DOMContentLoaded",function(){
    const form = document.querySelector('.login');

    const sendOTP = form.querySelector('.login__submit');


    sendOTP.addEventListener("click",function(event){
        event.preventDefault();
        const value = document.querySelector('.login__input[type="text"]').value;

        if(value.endsWith(".com")){ 
            //Method : Email 

            let data = {
                "eMail" : value
            }
            var x = document.getElementById("error");
            x.className = "show";
            if(data == ""){
                x.innerText = "Invalid Email";
            }
            else{
                x.innerText = errorData.message;
            }
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

        }
            //Method : Username


    })
})