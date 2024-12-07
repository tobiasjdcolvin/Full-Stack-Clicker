const requestObj = new XMLHttpRequest();
let parameters = new URLSearchParams(window.location.search);
let username = parameters.get('username');

function logout() {
    window.location.href = "./index.html" // this changes the url using the window object
}

function goBack() {
    window.location.href = `./game.html?username=${username}`; // this changes the url using the window object
}

async function updatePage() {
    let myNewUrl = "/getPlayers";

    requestObj.open("GET", myNewUrl);
    requestObj.send();


    // this is the same logic as given to us in the slides
    requestObj.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (requestObj.status === 200) {
                // callback
                // parse json into js object, then pass to populateTable()
                let usersObject = JSON.parse(this.response);
                populateTable(usersObject);
            } else {
                // something went wrong
                console.log(requestObj.responseText);
            }

        }
    };
}

updatePage();

async function initCurrUser() {
    let userScore = document.getElementById("youScore");
    let userUsername = document.getElementById("youUsername");
    let userRank = document.getElementById("youRank");

    let myNewUrl = "/getPlayers";

    requestObj.open("GET", myNewUrl);
    requestObj.send();


    // this is the same logic as given to us in the slides
    requestObj.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (requestObj.status === 200) {
                // callback
                // parse json into js object, then pass to populateTable()
                let usersObject = JSON.parse(this.response);

                let i;
                for (i = 0; ((i < usersObject.length) && (usersObject[i]["username"] != username)); i++) {
                }

                if (i >= usersObject.length) {
                    // something went wrong
                    console.log(requestObj.responseText);
                } else {
                    userScore.textContent = `${usersObject[i]["score"]}`;
                    userUsername.textContent = usersObject[i]["username"];
                    userRank.textContent = `#${i + 1}`;
                    updatePage();
                }

            } else {
                // something went wrong
                console.log(requestObj.responseText);
            }

        }
    };
}

initCurrUser();


async function populateTable(userArray) {
    for (let i = 0; ((i < userArray.length) && (i < 10)); i++) {
        let scoreI = document.getElementById(`${i}Score`);
        let usernameI = document.getElementById(`${i}Username`);

        scoreI.textContent = `${userArray[i]["score"]}`;
        usernameI.textContent = userArray[i]["username"];


        if (usernameI.textContent == username) {
            document.getElementById("youScore").textContent = `${userArray[i]["score"]}`;
            document.getElementById("youRank").textContent = `#${i + 1}`;
        }
    }
    await setTimeout(() => { }, 1000);
    updatePage();

}
