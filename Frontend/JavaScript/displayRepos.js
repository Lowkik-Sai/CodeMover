export async function getRepos() {
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
        console.log('Repos List :', responseData);
        return responseData;
    } catch (error) {
        console.error('Error sending data to backend:', error);
    }
}
