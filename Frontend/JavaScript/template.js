async function code(answersReceived){

    let owner = sessionStorage.getItem('User_Name');
    let repo = answersReceived["Enter Repo Name:"];
    let dataStructure = answersReceived["What's the Data Structure Utilized by the Solution?"];
    let title = answersReceived["Enter the Question Name"];

    let tC=answersReceived["What's the Time Complexity of the Solution?"]
    let sC=answersReceived["What's the Space Complexity of the Solution?"]
    let questionLink=answersReceived["Question Link [Optional]"]
    let langName=answersReceived["In which Programming Language was the Solution Crafted?"]
    let authorName=owner
    
    let commentStarting = "\"\"\"";
    let commentEnding   = "\"\"\"";
    if(langName=="Python" || langName=="python" || langName =="PYTHON"){
        commentStarting = "\"\"\"";
        commentEnding   = "\"\"\"";
        title += ".py";
    }else if(langName=="CPP" || langName=="JAVA" || langName==cpp || langName == c++){
        commentStarting = "\/\*";
        commentEnding   = "\*\/";
        if(langName =="CPP" || langName=="cpp"||langName=="c++"){
            title += ".cpp";
        }else{
            title += ".java";
        }
    }

    let template=`
    ${commentStarting}
    Time complexity : ${tC}
    Space complexity : ${sC}
    ${commentEnding}


${answersReceived["Please Provide the Code for the Solution"]}


    ${commentStarting}
    Author : ${authorName}
    Question Link : ${questionLink}
    ${commentEnding}

    `
    console.log(template);

    try {
        let ownerMail = await fetch(`https://codemover-backend-73adc6530796.herokuapp.com/getemail/${owner}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
<<<<<<< HEAD:JavaScript/template.js
                // 'Access-Control-Allow-Origin': '*'
=======
                'Access-Control-Allow-Origin': '*'
>>>>>>> 41e42269521004c5fa971df95ac1824c12ab7aea:Frontend/JavaScript/template.js
            }
        });
        
        ownerMail = await ownerMail.json();
        console.log("User Email: ", ownerMail);
<<<<<<< HEAD:JavaScript/template.js
        const username = sessionStorage.getItem('User_Name');
        const tokenResponse = await fetch(`https://codemover-backend-73adc6530796.herokuapp.com/getaccesstoken/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const tokenData = await tokenResponse.json();
        console.log("Access Token Fetched: ", tokenData);
        const accessToken = tokenData;
=======
>>>>>>> 41e42269521004c5fa971df95ac1824c12ab7aea:Frontend/JavaScript/template.js

    let req = {
        "commitMessage" : `Problem Difficulty Level : ${answersReceived["What's the Problem Difficulty Level?"]}`,
        "ownerMail" : ownerMail,
<<<<<<< HEAD:JavaScript/template.js
        "content" : `${template}`,
        "Access_Token": accessToken
=======
        "content" : `${template}`
>>>>>>> 41e42269521004c5fa971df95ac1824c12ab7aea:Frontend/JavaScript/template.js
    }
    console.log(`Repo name : ${repo} and Qn name : ${title}`)

        const response = await fetch(`https://codemover-backend-73adc6530796.herokuapp.com/commitCode/${owner}/${repo}/${dataStructure}/${title}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
<<<<<<< HEAD:JavaScript/template.js
                // 'Access-Control-Allow-Origin': '*'
=======
                'Access-Control-Allow-Origin': '*'
>>>>>>> 41e42269521004c5fa971df95ac1824c12ab7aea:Frontend/JavaScript/template.js
            },
            body: JSON.stringify(req)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        console.log('Successfully Committed Message', responseData);
    } catch (error) {
        console.error('Error sending data to backend:', error);
    }
}

export { code };
