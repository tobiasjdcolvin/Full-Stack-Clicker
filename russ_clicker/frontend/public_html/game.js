const requestObj = new XMLHttpRequest();
const russImg = document.getElementById("russImg");
const plusImg = document.getElementById("plusImg");
const playerScoreEl = document.getElementById("playerScore");
const titleName = document.getElementById("titleName");
const popup = document.getElementById("popup");
let username = "";

let parameters = new URLSearchParams(window.location.search);
username = parameters.get('username');


function initializePage() {
    getScoreInit(username);
}

initializePage();


function goToLeaderboard() {
    window.location.href = `./leaderboard.html?username=${username}`; // this changes the url using the window object
}


function logout() {
    window.location.href = "./index.html" // this changes the url using the window object
}


function closePopup() {
    popup.style.display = "none";
}

function setPopup(text) {
    popup.innerHTML = text + '<button id="popupButton" onclick="closePopup()">Close</button>';
    popup.style.display = "block";
}


function getScoreInit(username) {
    // Moved title initialization here
    titleName.textContent = username;

    // gets score initially when game starts up
    let myNewUrl = `/getScore/${username}`;

    requestObj.open("GET", myNewUrl);
    requestObj.send();


    // this is the same logic as given to us in the slides
    requestObj.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (requestObj.status === 200) {
                playerScoreEl.textContent = `Score: ${this.responseText}`;
                // callback 
                startAutoCheckingScore();
            } else {
                // something went wrong
                console.log(requestObj.responseText);
            }

        }
    };
}


function equipBronze() {
    let threshold = 1000 // the point threshold to unlock, feel free to change
    let myNewUrl = `/equipBronze/${username}/${threshold}`;

    requestObj.open("GET", myNewUrl);
    requestObj.send();


    // this is the same logic as given to us in the slides
    requestObj.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (requestObj.status === 200) {
                let result = this.responseText;

                if (result == "true") {
                    russImg.src = "images/russBronze.png";
                    setPopup("Equipped");
                } else {
                    setPopup("Not enough points");
                }
            } else {
                // something went wrong
                console.log(requestObj.responseText);
            }

        }
    };
}


function equipSilver() {
    let threshold = 10000 // the point threshold to unlock, feel free to change
    let myNewUrl = `/equipSilver/${username}/${threshold}`;

    requestObj.open("GET", myNewUrl);
    requestObj.send();


    // this is the same logic as given to us in the slides
    requestObj.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (requestObj.status === 200) {
                let result = this.responseText;

                if (result == "true") {
                    russImg.src = "images/russSilver.png";
                    setPopup("Equipped");
                } else {
                    setPopup("Not enough points");
                }
            } else {
                // something went wrong
                console.log(requestObj.responseText);
            }

        }
    };
}

function equipGold() {
    let threshold = 100000 // the point threshold to unlock, feel free to change
    let myNewUrl = `/equipGold/${username}/${threshold}`;

    requestObj.open("GET", myNewUrl);
    requestObj.send();


    // this is the same logic as given to us in the slides
    requestObj.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (requestObj.status === 200) {
                let result = this.responseText;

                if (result == "true") {
                    russImg.src = "images/russGold.png";
                    setPopup("Equipped");
                } else {
                    setPopup("Not enough points");
                }
            } else {
                // something went wrong
                console.log(requestObj.responseText);
            }

        }
    };
}

// gets the users currently equiped character version
// and shows that img
function getEquipedInit(username) {
    let myNewUrl = `/getEquiped/${username}`;

    requestObj.open("GET", myNewUrl);
    requestObj.send();


    // this is the same logic as given to us in the slides
    requestObj.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (requestObj.status === 200) {
                russImg.src = this.responseText;
            } else {
                // something went wrong
                console.log(requestObj.responseText);
            }

        }
    };
}

// just like getScoreInit(), but without the callback
function getScore(username) {
    // gets score of username
    let myNewUrl = `/getScore/${username}`;

    requestObj.open("GET", myNewUrl);
    requestObj.send();


    // this is the same logic as given to us in the slides
    requestObj.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (requestObj.status === 200) {
                playerScoreEl.textContent = `Score: ${this.responseText}`;
            } else {
                // something went wrong
                console.log(requestObj.responseText);
            }

        }
    };
}


// runs right after getScoreInit() finishes
function startAutoCheckingScore() {
    // callback
    getEquipedInit(username);
    setInterval(() => {
        getScore(username); // just in case user has auto-score updating upgrade

    }, 500);

}


// this sends a request to the backend to purchase offline point generation
// for the player if they have the correct amount of points
function purchaseOffline() {
    let offlinePurchaseThreshold = 500; // costs 500 points; change if need be

    // gets score of username
    let getScoreUrl = `/getScore/${username}`;

    requestObj.open("GET", getScoreUrl);
    requestObj.send();


    // this is the same logic as given to us in the slides
    requestObj.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (requestObj.status === 200) {
                let currentScore = Number(this.responseText);

                if (currentScore >= offlinePurchaseThreshold) {
                    purchaseOfflineHelper(offlinePurchaseThreshold);
                } else {
                    setPopup("Not enough points");
                }
            } else {
                // something went wrong
                console.log(requestObj.responseText);
            }

        }
    };
}

// helper function for purchaseOffline(), actually purchases the upgrade 
function purchaseOfflineHelper(purchaseThreshold) {
    myUrl = `/purchaseOffline/${username}/${purchaseThreshold}`;

    requestObj.open("GET", myUrl);
    requestObj.send();

    // this is the same logic as given to us in the slides
    requestObj.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (requestObj.status === 200) {
                setPopup("Purchased");
            } else {
                // something went wrong
                console.log(requestObj.responseText);
            }

        }
    };
}

function purchaseTenPoints() {
    let purchaseThreshold = 5000; // costs 5000 points; change if need be

    // gets score of username
    let getScoreUrl = `/getScore/${username}`;

    requestObj.open("GET", getScoreUrl);
    requestObj.send();


    // this is the same logic as given to us in the slides
    requestObj.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (requestObj.status === 200) {
                let currentScore = Number(this.responseText);

                if (currentScore >= purchaseThreshold) {
                    purchaseTenPointsHelper(purchaseThreshold);
                } else {
                    setPopup("Not enough points");
                }
            } else {
                // something went wrong
                console.log(requestObj.responseText);
            }

        }
    };
}

function purchaseTenPointsHelper(purchaseThreshold) {
    myUrl = `/purchaseTenPoints/${username}/${purchaseThreshold}`;

    requestObj.open("GET", myUrl);
    requestObj.send();

    // this is the same logic as given to us in the slides
    requestObj.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (requestObj.status === 200) {
                setPopup("Purchased");
            } else {
                // something went wrong
                console.log(requestObj.responseText);
            }

        }
    };
}


function purchaseHundredPoints() {
    let purchaseThreshold = 50000; // costs 50000 points; change if need be

    // gets score of username
    let getScoreUrl = `/getScore/${username}`;

    requestObj.open("GET", getScoreUrl);
    requestObj.send();


    // this is the same logic as given to us in the slides
    requestObj.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (requestObj.status === 200) {
                let currentScore = Number(this.responseText);

                if (currentScore >= purchaseThreshold) {
                    purchaseHundredPointsHelper(purchaseThreshold);
                } else {
                    setPopup("Not enough points");
                }
            } else {
                // something went wrong
                console.log(requestObj.responseText);
            }

        }
    };
}

function purchaseHundredPointsHelper(purchaseThreshold) {
    myUrl = `/purchaseHundredPoints/${username}/${purchaseThreshold}`;

    requestObj.open("GET", myUrl);
    requestObj.send();

    // this is the same logic as given to us in the slides
    requestObj.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (requestObj.status === 200) {
                setPopup("Purchased");
            } else {
                // something went wrong
                console.log(requestObj.responseText);
            }

        }
    };
}



// this sends request to backend to increment score in database
async function updateScore() {

    // animation
    russImg.style.scale = 1.05;
    plusImg.style.display = "inline";
    setTimeout(() => {
        russImg.style.scale = 1;
    }, 100);
    setTimeout(() => {
        plusImg.style.display = "none";
    }, 100);


    myUrl = `/playerClick/${username}`;

    requestObj.open("GET", myUrl);
    requestObj.send();

    // this is the same logic as given to us in the slides
    requestObj.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (requestObj.status === 200) {
                playerScoreEl.textContent = `Score: ${this.responseText}`;
            } else {
                // something went wrong
                console.log(requestObj.responseText);
            }

        }
    };


}

function setPlusImg() {
    // set plusImg to the correct multiplier
    let myMultiplierUrl = `/getMultiplier/${username}`;

    requestObj.open("GET", myMultiplierUrl);
    requestObj.send();

    // this is the same logic as given to us in the slides
    requestObj.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (requestObj.status === 200) {
                let plusImgPath = this.responseText;
                plusImg.src = plusImgPath;
                updateScore();
            } else {
                // something went wrong
                console.log(requestObj.responseText);
            }

        }
    };
}