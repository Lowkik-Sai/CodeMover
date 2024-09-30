//

async function getRepos(accessToken) {
    try {
        const Url = `https://codemover-backend-73adc6530796.herokuapp.com/getrepos?Access_Token=${accessToken}`;
        const response = await fetch(Url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
                // 'Access-Control-Allow-Origin' removed, not needed in request headers
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data from API');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data from API:', error);
    }
}


const userRepos = async function() {
    const username = sessionStorage.getItem('User_Name');
    console.log("Questionare User_Name: ", username);

    // Fetch the access token from the backend using the username
    const tokenResponse = await fetch(`https://codemover-backend-73adc6530796.herokuapp.com/getaccesstoken/${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const tokenData = await tokenResponse.json();
    console.log("Fetched Response in Quetionare: ", tokenData);
    const accessToken = tokenData;
    const repos = await getRepos(accessToken);
    const fetchedRepos = repos.Repos;
    const reposFormatted = fetchedRepos.map(repo => `${repo}\n`).join('');
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
