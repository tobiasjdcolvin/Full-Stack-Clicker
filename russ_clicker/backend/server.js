const express = require('express');
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const mongoURL = "mongodb://127.0.0.1/russ_clicker_db";
const app = express();
const port = 8080;

const UpgradesSchema = new mongoose.Schema({
    offline: Number,
    ten: Number,
    hundred: Number,
});

const UnlocksSchema = new mongoose.Schema({
    bronze: Number,
    silver: Number,
    gold: Number,
    equiped: String,
})

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    score: Number,
    multiplier: Number,
    upgrades: { type: mongoose.Schema.Types.ObjectId, ref: "UpgradesObj" },
    unlocks: { type: mongoose.Schema.Types.ObjectId, ref: "UnlocksObj" },
});
const UserObj = mongoose.model("UserObj", UserSchema);
const UpgradesObj = mongoose.model("UpgradesObj", UpgradesSchema);
const UnlocksObj = mongoose.model("UnlocksObj", UnlocksSchema);


// connect to database and initialize stuff
async function main() {
    await mongoose.connect(mongoURL);

    // These will be the initial users stored in database,
    // all other users will need to be registered. This is so
    // we developers can test that everything is up and running
    let usersExist = await UserObj.exists({ username: "pointcollector" });

    if (!usersExist) {


        let pointcollectorUpgrades = new UpgradesObj({
            offline: 0,
            ten: 0,
            hundred: 0,
        });
        await pointcollectorUpgrades.save();

        let pointcollectorUnlocks = new UnlocksObj({
            bronze: 0,
            silver: 0,
            gold: 0,
            equiped: "none",
        })
        await pointcollectorUnlocks.save();

        let pointcollectorUser = new UserObj({
            username: "pointcollector",
            email: "pointcollector@gmail.com",
            score: 999999,
            multiplier: 1,
            upgrades: pointcollectorUpgrades._id,
            unlocks: pointcollectorUnlocks._id,
        });
        await pointcollectorUser.save();
    }


}
main();


// auto-increments scores for those who have the upgrade
setInterval(async () => {
    // check which users have the auto upgrade, with value of 1 (done this way so
    // we can reuse the code for more upgrades that are more complex)
    // for those who do, increment their score

    let users = await UserObj.find({})
    for (let user of users) {
        await user.populate("upgrades");
        if (user.upgrades.offline == 1) {
            user.score += 1;
            await user.save();
        }
    }


}, 1000);



// API Endpoints below:

// checks if username is exists in database
app.get("/checkUsername/:username/:email", async (req, res) => {

    let usernameExists = await UserObj.exists({ username: req.params.username });

    if (usernameExists) {
        let currUser = await UserObj.findOne({ username: req.params.username });
        let userEmail = currUser.email;
        if (req.params.email == userEmail) {
            usernameExists = "truetrue";
        } else {
            usernameExists = "truefalse";
        }

    } else {
        usernameExists = "false";
    }

    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.send(usernameExists);
})

// adds a user to the database
app.get("/addUser/:username/:email", async (req, res) => {
    let username = req.params.username;
    let email = req.params.email;

    let newUserUnlocks = new UnlocksObj({
        bronze: 0,
        silver: 0,
        gold: 0,
        equiped: "none",
    })
    await newUserUnlocks.save();

    let newUserUpgrades = new UpgradesObj({
        offline: 0,
        ten: 0,
        hundred: 0,
    });
    await newUserUpgrades.save();

    let newUser = new UserObj({
        email: `${email}`,
        username: `${username}`,
        score: 0,
        multiplier: 1,
        upgrades: newUserUpgrades._id,
        unlocks: newUserUnlocks._id,
    });
    await newUser.save();

    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.send("");
})


app.get("/getMultiplier/:username", async (req, res) => {
    let username = req.params.username;
    let currUser = await UserObj.findOne({ username: username });
    let myResponse = "";
    let currMultiplier = currUser.multiplier;

    if (currMultiplier == 10) {
        myResponse = "images/plusten.png";
    } else if (currMultiplier == 100) {
        myResponse = "images/plushundred.png";
    } else {
        myResponse = "images/plusone.png";
    }


    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.send(myResponse);

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

// purchases offline point generator for player
app.get("/purchaseOffline/:username/:threshold", async (req, res) => {
    let username = req.params.username;
    let pointThreshold = req.params.threshold;
    let currUser = await UserObj.findOne({ username: username });
    await currUser.populate("upgrades");

    if (currUser.upgrades.offline != 1) {
        currUser.score -= pointThreshold;
        await currUser.save();
        currUser.upgrades.offline = 1;
        await currUser.upgrades.save();
        await currUser.save();
    }

    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.send("");

})


app.get("/purchaseTenPoints/:username/:threshold", async (req, res) => {
    let username = req.params.username;
    let pointThreshold = req.params.threshold;
    let currUser = await UserObj.findOne({ username: username });
    await currUser.populate("upgrades");

    if (currUser.upgrades.hundred != 1) {
        if (currUser.upgrades.ten != 1) {
            currUser.score -= pointThreshold;
            currUser.multiplier = 10;
            await currUser.save();
            currUser.upgrades.ten = 1;
            await currUser.upgrades.save();
            await currUser.save();
        }
    }

    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.send("");

})


app.get("/purchaseHundredPoints/:username/:threshold", async (req, res) => {
    let username = req.params.username;
    let pointThreshold = req.params.threshold;
    let currUser = await UserObj.findOne({ username: username });
    await currUser.populate("upgrades");

    if (currUser.upgrades.hundred != 1) {
        currUser.score -= pointThreshold;
        currUser.multiplier = 100;
        await currUser.save();
        currUser.upgrades.hundred = 1;
        await currUser.upgrades.save();
        await currUser.save();
    } else {
        currUser.multiplier = 100;
        await currUser.save();
    }

    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.send("");

})


app.get("/equipBronze/:username/:threshold", async (req, res) => {
    let username = req.params.username;
    let threshold = req.params.threshold;
    let currUser = await UserObj.findOne({ username: username });
    await currUser.populate("unlocks");
    let myResponse = "";
    let currPoints = currUser.score;

    if ((currPoints >= threshold) || (currUser.unlocks.bronze == 1)) {
        myResponse = "true";
        currUser.unlocks.equiped = "bronze";
        currUser.unlocks.bronze = 1;
        await currUser.unlocks.save();
        await currUser.save();
    } else {
        myResponse = "false";
    }

    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.send(myResponse);


})


app.get("/equipSilver/:username/:threshold", async (req, res) => {
    let username = req.params.username;
    let threshold = req.params.threshold;
    let currUser = await UserObj.findOne({ username: username });
    await currUser.populate("unlocks");
    let myResponse = "";
    let currPoints = currUser.score;

    if ((currPoints >= threshold) || (currUser.unlocks.silver == 1)) {
        myResponse = "true";
        currUser.unlocks.equiped = "silver";
        currUser.unlocks.silver = 1;
        await currUser.unlocks.save();
        await currUser.save();
    } else {
        myResponse = "false";
    }

    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.send(myResponse);


})


app.get("/equipGold/:username/:threshold", async (req, res) => {
    let username = req.params.username;
    let threshold = req.params.threshold;
    let currUser = await UserObj.findOne({ username: username });
    await currUser.populate("unlocks");
    let myResponse = "";
    let currPoints = currUser.score;

    if ((currPoints >= threshold) || (currUser.unlocks.gold == 1)) {
        myResponse = "true";
        currUser.unlocks.equiped = "gold";
        currUser.unlocks.gold = 1;
        await currUser.unlocks.save();
        await currUser.save();
    } else {
        myResponse = "false";
    }

    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.send(myResponse);


})

app.get("/getEquiped/:username", async (req, res) => {
    let username = req.params.username;
    let currUser = await UserObj.findOne({ username: username });
    await currUser.populate("unlocks");
    let equiped = currUser.unlocks.equiped;
    let myResponse = "";

    if (equiped == "bronze") {
        myResponse = "images/russBronze.png";
    } else if (equiped == "silver") {
        myResponse = "images/russSilver.png";
    } else if (equiped == "gold") {
        myResponse = "images/russGold.png";
    } else {
        myResponse = "images/russ.png";
    }

    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.send(myResponse);
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

// gets all players from database
app.get("/getPlayers", async (req, res) => {
    // sort players by score from most to least (in reverse order, hence the -1).
    let players = await UserObj.find({}).sort({ 'score': -1 });

    for (let player of players) {
        await player.populate("unlocks");
    }

    // send in json format
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.send(players);
})


// statically serves files within public_html directory
app.use(express.static("../frontend/public_html"));

app.listen(port, () => {
    console.log(`\nServer running at port ${port}`);
});
