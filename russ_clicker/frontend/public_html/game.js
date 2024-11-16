const requestObj = new XMLHttpRequest();
const russImg = document.getElementById("russImg");
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
    russImg.style.scale = 1.05;
    setTimeout(() => { russImg.style.scale = 1; }, 100);
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