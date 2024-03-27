
#Code-Mover


Code-Mover: This web application streamlines the process for Computer Science and Engineering (CSE) students to manage their Data Structures and Algorithms (DSA) code on GitHub. 
By integrating with GitHub, the platform automates the uploading of code while allowing users to add additional information about each code snippet, such as its complexity analysis, 
and usage scenarios. This enhances organization and accessibility for students maintaining their DSA codes, facilitating easier collaboration and knowledge sharing 
within the community. The application aims to simplify the workflow for CSE students, saving time and effort in managing their coding projects effectively.


## Tech Stack

**Client:** HTML, CSS, Javascript

**Server:** Node, Express

**Database:** AWS-DynamoDB


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## API Documentation

[Documentation](https://linktodocumentation)


## Deployment

Code-Mover has been deployed using Heroku [PaaS] platform with two servers for frontend and backend respectively.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`AWS_ACCESS_KEY_ID`

`AWS_SECRET_ACCESS_KEY`

`AWS_REGION`

`saltRounds`

`CodeMover_Mailer`

`clientId`

`clientSecret`

`refreshToken`

`MailGun_API`



## Authors

- [Naganathan M R](https://github.com/Naganathan05)
- [Lowkik Sai P](https://github.com/Lowkik-Sai)


## FAQ

#### How to generate Github Access Token ?

* **Log in to GitHub:** Go to the GitHub website and log in to your GitHub account.

* **Access Personal Access Tokens settings:** Once logged in, click on your profile picture in the top-right corner of the page, and then click on "Settings".

* **Navigate to Developer settings:** In the Settings page, scroll down to the left sidebar and click on "Developer settings".

* **Generate a new token:** In the Developer settings page, click on "Personal access tokens".

* **Generate new token:** Click on the "Generate new token" button.

* **Provide necessary information:** You'll be asked to provide a name for your token and select the scopes (permissions) you want to grant it. Make sure to only grant the necessary permissions based on what your application requires.

* **Generate token:** After selecting the scopes, click on the "Generate token" button.

* **Copy the token:** Once the token is generated, make sure to copy it immediately. This token will not be shown again, so you need to save it in a secure location.

* **Use the token:** You can now use this token as an authentication mechanism in your application to access GitHub resources on behalf of the user.

#### How to Navigate between questions in the chat bot ?

* **Help Page:** You can refer to the help page for utilising the extra commands which facilitate easy navigation between questions in the chat bot.

