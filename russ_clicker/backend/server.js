const express = require('express');
const app = express();
const port = 50001;

let SCORE = 0 // TEMPORARY - will retrieve from database in future

// statically serves files within public_html directory
app.use(express.static("../frontend/public_html"));


app.get("/playerClick/:username", (req, res) => {
    let username = req.params.username; // will use this with database in future to look up individual player scores
    let playerScore = SCORE; // look up username in database to get associated score
    SCORE += 1; // will be more complicated with database
    playerScore = SCORE; // retrieve from database after updating val

    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.send(`${playerScore}`);
})

app.get("/getScore/:username", (req, res) => {
    let username = req.params.username; // will use this with database in future to look up individual player scores
    let playerScore = SCORE; // look up username in database to get associated score

    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.send(`${playerScore}`);
})


app.listen(port, () => {
    console.log(`\nServer running at 127.0.0.1:${port}`);
});