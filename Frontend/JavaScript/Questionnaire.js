import { getRepos } from "./displayRepos";

const Questions = [
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
    `${getRepos()}`,
    "Please Enter 'confirm' if you're Ready to Proceed with the Commit"
]

export { Questions };