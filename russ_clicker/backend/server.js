const express = require('express');
const app = express();
const port = 50001;

let SCORE = { // TEMPORARY - will retrieve from database in future, using USERNAME
    "username": 0,
    "Tobinski": 9999,
    "Slurricane": 420,
};

let USERNAME = "";

// statically serves files within public_html directory
app.use(express.static("../frontend/public_html"));


// auto-increments scores for those who have the upgrade
setInterval(() => {
    // TODO: when database is up, check which users have upgrade
    // here, lets just say Slurricane has the upgrade
    SCORE["Slurricane"] += 1; // this will be request to database too
}, 1000);




// API Endpoints:

app.get("/setUsername/:username", (req, res) => {
    USERNAME = req.params.username; // will use this with database in future to look up individual player scores

    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.send("");
})


app.get("/getUsername", (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.send(`${USERNAME}`);
})


app.get("/playerClick/:username", (req, res) => {
    let username = req.params.username; // will use this with database in future to look up individual player scores
    SCORE[username] += 1; // will be more complicated with database
    playerScore = SCORE[username]; // retrieve from database after updating val

    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.send(`${playerScore}`);
})

app.get("/getScore/:username", (req, res) => {
    let playerScore = SCORE[req.params.username]; // look up username in database to get associated score

    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.send(`${playerScore}`);
})


app.listen(port, () => {
    console.log(`\nServer running at 127.0.0.1:${port}`);
});