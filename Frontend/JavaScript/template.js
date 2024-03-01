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
    if(langName=="PYTHON"){
        commentStarting = "\"\"\"";
        commentEnding   = "\"\"\"";
    }else if(langName=="CPP" || langName=="JAVA" || langName=="JAVASCRIPT"){
        commentStarting = "\/\*";
        commentEnding   = "\*\/";
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
        let ownerMail = await fetch(`http://127.0.0.1:8080/getemail/${owner}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        console.log("User Email: ", ownerMail);
        ownerMail = await ownerMail.json();

    let req = {
        "commitMessage" : `${answersReceived["What's the Problem Difficulty Level?"]}`,
        "ownerMail" : ownerMail,
        "content" : `${template}`
    }
    console.log(`Repo name : ${repo} and Qn name : ${title}`)

        const response = await fetch(`http://localhost:8080/commitCode/${owner}/${repo}/${dataStructure}/${title}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
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