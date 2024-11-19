const express = require('express');
const mongoose = require('mongoose');
const mongoURL = "mongodb://127.0.0.1/russ_clicker_db";
const app = express();
const port = 50001;

const UserSchema = new mongoose.Schema({
    username: String,
    score: Number,
    multiplier: Number,
    upgrades: Object,
});
const UserObj = mongoose.model("UserObj", UserSchema);

// connect to database and initialize stuff
async function main() {
    await mongoose.connect(mongoURL);

    // These will be the initial users stored in database,
    // all other users will need to be registered. This is so
    // we developers can test that everything is up and running

    let tobinskiExists = await UserObj.exists({ username: "Tobinski" });
    // if Tobinski exists, that means Slurricane and Dracian also exist, and the
    // opposite is true too
    if (!tobinskiExists) {
        let tobinskiUser = new UserObj({
            username: "Tobinski",
            score: 0,
            multiplier: 0,
            upgrades: {},
        });
        let slurricaneUser = new UserObj({
            username: "Slurricane",
            score: 0,
            multiplier: 0,
            upgrades: {},
        });
        let dracianUser = new UserObj({
            username: "Dracian",
            score: 0,
            multiplier: 0,
            upgrades: {},
        });
        await tobinskiUser.save();
        await slurricaneUser.save();
        await dracianUser.save();
    }


}
main();



/*

// auto-increments scores for those who have the upgrade
setInterval(() => {
    // TODO: when database is up, check which users have upgrade

    // here, lets just say Slurricane has the upgrade
    SCORE["Slurricane"] += 1; // this will be request to database too
}, 1000);

// API Endpoints below:

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

// increments players score in database
app.get("/playerClick/:username", (req, res) => {
    let username = req.params.username; // will use this with database in future to look up individual player scores
    SCORE[username] += 1; // will be more complicated with database
    playerScore = SCORE[username]; // retrieve from database after updating val

    console.log(`Score for user ${username} incremented to ${SCORE[username]}`)
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

*/


app.listen(port, () => {
    console.log(`\nServer running at 127.0.0.1:${port}`);
});
