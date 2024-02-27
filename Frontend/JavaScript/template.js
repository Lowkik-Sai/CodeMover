async function code(tC=null,sC=null,langName,code,authorName=null,questionLink=null){

    if (tC==null) tC="Not defined";
    if (sC==null) sC="Not defined";
    if (authorName==null) authorName="Not defined";
    if (questionLink==null) questionLink="Not defined";
    if(langName=="Python"){
        commentStarting = "\"\"\"";
        commentEnding   = "\"\"\"";
    }else if(langName=="Cpp"){
        commentStarting = "\/\*";
        commentEnding   = "\*\/";
    }
    template=`
    ${commentStarting}
    Time complexity : ${tC}
    Space complexity : ${sC}
    ${commentEnding}


    ${code}


    ${commentStarting}
    Author : ${authorName}
    Question Link : ${questionLink}
    ${commentEnding}

    `

    console.log(template);

    try {
        const response = await fetch(`http://localhost:8080/commitCode/${owner}/${repo}/${dataStructure}/${title}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: req
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        console.log('Data sent to backend:', responseData);
        return responseData;
    } catch (error) {
        console.error('Error sending data to backend:', error);
    }
}

export { code };