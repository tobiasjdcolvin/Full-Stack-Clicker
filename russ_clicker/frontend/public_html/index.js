const requestObj = new XMLHttpRequest();
const loginText = document.getElementById("loginTxt");
const errorHeader = document.getElementById("errorHeader");

let testNamesDatabase = ["username", "Tobinski", "Slurricane"] // TEMPORARY - will be replaced with requests to database 


function handleLogin() {
    let username = loginText.value;

    if (testNamesDatabase.includes(username)) { // TODO: use database for this to check if username exists in database

        // the following will set the username variable in server.js before 
        // re-routing to game.js. Right when game.js is loaded, it accesses the username
        // variable from server.js, so that is why this is important.
        let myUrl = `/setUsername/${username}`;

        requestObj.open("GET", myUrl);
        requestObj.send();

        // this is the same logic as given to us in the slides
        requestObj.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE) {
                if (requestObj.status === 200) {
                    window.location.href = "./game.html"; // this changes the url using the window object;
                } else {
                    // something went wrong
                    console.log(requestObj.responseText);
                }

            }
        };


        window.location.href = "./game.html"; // this changes the url using the window object
    } else {
        errorHeader.textContent = "Username Not Found, Please Try Again.";
    }

}
