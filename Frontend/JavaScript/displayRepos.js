
function getRepos() {
    fetch('http://localhost:8080/getrepos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "getRepos": data }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(responseData => {
        console.log('Data sent to backend:', responseData);
        return responseData;
        // Handle response from backend if needed
    })
    .catch(error => {
        console.error('Error sending data to backend:', error);
    });
}

export { getRepos };