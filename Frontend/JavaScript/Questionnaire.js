async function getRepos() {
    try {
        const response = await fetch('http://localhost:8080/getrepos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
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

const userRepos = async function() {
    const repos = await getRepos();
    const reposFormatted = repos.map(repo => `${repo}\n`).join('');
    return reposFormatted;
}();

const Questions = async () => [
    "Welcome to Code-Mover",
    "What's the Data Structure Utilized by the Solution?",
    "Enter the Question Name",
    "In which Programming Language was the Solution Crafted?",
    "What's the Time Complexity of the Solution?",
    "What's the Space Complexity of the Solution?",
    "Please Provide the Code for the Solution",
    "Question Link [Optional]",
    "Any Additional Notes to be Stored?",
    "What Difficulty Level does the Question Belong To?",
    `${await userRepos}`,
    "Please Enter 'confirm' if you're Ready to Proceed with the Commit"
];

export { Questions };
