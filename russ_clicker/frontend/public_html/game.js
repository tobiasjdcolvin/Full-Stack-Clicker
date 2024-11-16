const requestObj = new XMLHttpRequest();
const russImg = document.getElementById("russImg");
const plusImg = document.getElementById("plusImg");
const playerScoreEl = document.getElementById("playerScore");
let username = "";

function initializePage() {
    getScoreInit(); // this function then calls getUsernameInit when done
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
            } else {
                // something went wrong
                console.log(requestObj.responseText);
            }

        }
    };

}


function getScoreInit() {
    // gets score initially when page loads up
    let myNewUrl = "/getScore";

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

    getUsernameInit();

}


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