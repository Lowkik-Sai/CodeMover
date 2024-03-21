async function getRepos() {
    try {
        const response = await fetch('https://codemover-backend-73adc6530796.herokuapp.com/getrepos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        console.log('Repos List :', responseData);
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
    "What's the Data Structure Utilized by the Solution?",
    "Enter the Question Name",
    "In which Programming Language was the Solution Crafted?",
    "What's the Time Complexity of the Solution?",
    "What's the Space Complexity of the Solution?",
    "What's the Problem Difficulty Level?",
    "Please Provide the Code for the Solution",
    "Question Link [Optional]",
    "Any Additional Notes to be Stored?",
    `Repos List :\n${await userRepos}`,
    "Enter Repo Name:",
    "Please Enter 'confirm' if you're Ready to Proceed with the Commit"
];

export { Questions };
