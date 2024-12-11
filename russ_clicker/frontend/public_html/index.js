const requestObj = new XMLHttpRequest();
const loginText = document.getElementById("loginTxt");
const registerText = document.getElementById("registerTxt");
const loginEmailText = document.getElementById("loginEmailTxt");
const registerEmailText = document.getElementById("registerEmailTxt");
const errorHeader = document.getElementById("errorHeader");


async function handleLogin(usernameExists) {
    let username = loginText.value;

    if (usernameExists == "truetrue") {
        window.location.href = `./game.html?username=${username}`; // this changes the url using the window object
    } else {
        errorHeader.textContent = "Username Not Found Or Incorrect Email, Please Try Again.";
    }

}

function help() {
    window.location.href = "./help.html"; // this changes the url using the window object
}

async function handleRegistration(usernameExists) {
    let username = registerText.value;
    let email = registerEmailText.value;

    if (usernameExists == "truetrue" || usernameExists == "truefalse") {
        errorHeader.textContent = "Username Already Exists, Please Try Another.";
    } else {
        let myUrl = `/addUser/${username}/${email}`;

        requestObj.open("GET", myUrl);
        requestObj.send();

        // this is the same logic as given to us in the slides
        requestObj.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE) {
                if (requestObj.status === 200) {
                    errorHeader.textContent = "Successfully Registered. Please Login.";
                } else {
                    // something went wrong
                    console.log(requestObj.responseText);
                }

            }
        };

    }

}

function checkUsername() {
    let username = loginText.value;
    let email = loginEmailText.value;
    let myUrl = `/checkUsername/${username}/${email}`;

    requestObj.open("GET", myUrl);
    requestObj.send();

    // this is the same logic as given to us in the slides
    requestObj.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (requestObj.status === 200) {
                handleLogin(this.responseText);
            } else {
                // something went wrong
                console.log(requestObj.responseText);
            }

        }
    };
}

function checkUsernameRegistration() {
    let username = registerText.value;
    let email = registerEmailText.value;
    let myUrl = `/checkUsername/${username}/${email}`;

    requestObj.open("GET", myUrl);
    requestObj.send();

    // this is the same logic as given to us in the slides
    requestObj.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (requestObj.status === 200) {
                handleRegistration(this.responseText);
            } else {
                // something went wrong
                console.log(requestObj.responseText);
            }

        }
    };
}
