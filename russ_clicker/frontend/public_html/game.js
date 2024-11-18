const requestObj = new XMLHttpRequest();
const russImg = document.getElementById("russImg");
const plusImg = document.getElementById("plusImg");
const playerScoreEl = document.getElementById("playerScore");
const titleName = document.getElementById("titleName");
let username = "";

function initializePage() {
    getUsernameInit(); // getUsernameInit() has getScoreInit() as a callback
}

initializePage();

function getUsernameInit() {
    // gets username initially when page loads up
    let myUrl = "/getUsername";

    requestObj.open("GET", myUrl);
    requestObj.send();

    // this is the same logic as given to us in the slides
    requestObj.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (requestObj.status === 200) {
                username = this.responseText;
                titleName.textContent = username;
                // callback
                getScoreInit(username);
            } else {
                // something went wrong
                console.log(requestObj.responseText);
            }

        }
    };

}


// runs after getUsernameInit() finishes
function getScoreInit(username) {
    // gets score initially when game starts up, after username is known
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
    setInterval(() => {
        getScore(username); // just in case user has auto-score updating upgrade

    }, 500);

}



// this sends request to backend to increment score in database
function updateScore() {
    // animation
    russImg.style.scale = 1.05;
    plusImg.style.display = "inline";
    setTimeout(() => {
        russImg.style.scale = 1;
    }, 100);
    setTimeout(() => {
        plusImg.style.display = "none";
    }, 140);


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