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
            multiplier: 1,
            upgrades: {},
        });
        let slurricaneUser = new UserObj({
            username: "Slurricane",
            score: 0,
            multiplier: 1,
            upgrades: { auto: 1 },
        });
        let dracianUser = new UserObj({
            username: "Dracian",
            score: 0,
            multiplier: 1,
            upgrades: {},
        });
        await tobinskiUser.save();
        await slurricaneUser.save();
        await dracianUser.save();
    }


}
main();


// auto-increments scores for those who have the upgrade
setInterval(async () => {
    // TODO: check which users have the auto upgrade

    // here, lets just say Slurricane has the upgrade
    // this is just for testing, only update those who have
    // the upgrade eventually
    let slurricaneCurrUser = await UserObj.findOne({ username: "Slurricane" });
    slurricaneCurrUser.score += 1;
    await slurricaneCurrUser.save();
}, 1000);


// API Endpoints below:

// checks if username is exists in database
app.get("/checkUsername/:username", async (req, res) => {

    let usernameExists = await UserObj.exists({ username: req.params.username });

    if (usernameExists) {
        usernameExists = "true";
    }

    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.send(usernameExists);
})

// increments players score in database
app.get("/playerClick/:username", async (req, res) => {
    let username = req.params.username;
    let currUser = await UserObj.findOne({ username: username });

    currUser.score += currUser.multiplier;
    await currUser.save();
    let playerScore = currUser.score;

    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.send(`${playerScore}`);
})

// gets players score from database
app.get("/getScore/:username", async (req, res) => {
    let username = req.params.username;
    let currUser = await UserObj.findOne({ username: username });
    let playerScore = currUser.score;

    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.send(`${playerScore}`);
})


// statically serves files within public_html directory
app.use(express.static("../frontend/public_html"));

app.listen(port, () => {
    console.log(`\nServer running at 127.0.0.1:${port}`);
});
