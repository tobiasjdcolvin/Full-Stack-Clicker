const requestObj = new XMLHttpRequest();
const russImg = document.getElementById("russImg");
const plusImg = document.getElementById("plusImg");
const playerScoreEl = document.getElementById("playerScore");
const username = "TEMPUSER"; // change for login functionality with database

// gets score initially when page loads up, make work with database in future
let myUrl = `/getScore/${username}`;

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


function updateScore() {
    // animation
    russImg.style.scale = 1.05;
    plusImg.style.display = "inline";
    setTimeout(() => {
        russImg.style.scale = 1;
    }, 100);
    setTimeout(() => {
        plusImg.style.display = "none";
    }, 150);


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