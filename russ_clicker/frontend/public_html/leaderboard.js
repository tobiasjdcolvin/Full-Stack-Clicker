const requestObj = new XMLHttpRequest();


async function initPage() {
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

initPage();


async function populateTable(userArray) {
    for (let i = 0; ((i < userArray.length) && (i < 10)); i++) {
        let scoreI = document.getElementById(`${i}Score`);
        let usernameI = document.getElementById(`${i}Username`);

        scoreI.textContent = `${userArray[i]["score"]}`;
        usernameI.textContent = userArray[i]["username"];
    }
    await setTimeout(() => { }, 1000);
    initPage();

}
