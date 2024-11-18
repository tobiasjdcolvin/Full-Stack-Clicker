const express = require('express');
const app = express();
const port = 50001;
let USERNAME = "";




// WITHIN THE LINES WILL BE REPLACED BY DATABASE
// ------------------------------------------------------------------------------------
let SCORE = { // TEMPORARY - will retrieve from database in future, using USERNAME
    "username": 0,
    "Tobinski": 0,
    "Slurricane": 0,
};
let testNamesDatabase = ["username", "Tobinski", "Slurricane"] // TEMPORARY - will be replaced with requests to database 
// ------------------------------------------------------------------------------------




// statically serves files within public_html directory
app.use(express.static("../frontend/public_html"));

// auto-increments scores for those who have the upgrade
setInterval(() => {
    // TODO: when database is up, check which users have upgrade

    // here, lets just say Slurricane has the upgrade
    SCORE["Slurricane"] += 1; // this will be request to database too
}, 1000);


// API Endpoints below:

// sets the USERNAME variable 
app.get("/setUsername/:username", (req, res) => {
    USERNAME = req.params.username;

    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.send("");
})

// checks if username is exists in database
app.get("/checkUsername/:username", (req, res) => {
    let usernameExists = "false";

    if (testNamesDatabase.includes(req.params.username)) {
        usernameExists = "true";
    }

    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.send(usernameExists);
})

// gets the USERNAME variable
app.get("/getUsername", (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.send(`${USERNAME}`);
})

// increments players score in database
app.get("/playerClick/:username", (req, res) => {
    let username = req.params.username; // will use this with database in future to look up individual player scores
    SCORE[username] += 1; // will be more complicated with database
    playerScore = SCORE[username]; // retrieve from database after updating val

    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.send(`${playerScore}`);
})

// gets players score from database
app.get("/getScore/:username", (req, res) => {
    let playerScore = SCORE[req.params.username]; // look up username in database to get associated score

    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.send(`${playerScore}`);
})


app.listen(port, () => {
    console.log(`\nServer running at 127.0.0.1:${port}`);
});