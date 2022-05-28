const secretWords = ["pen", "pencil", "phone", "notebook", "rock", "key"];

let randomItems = "";
let clicked = [];
let result = "";
let mistake = 0;
function randomItem () {//Function for output a random word of secretWord array
    randomItems =  secretWords[Math.floor(Math.random() * secretWords.length)];
    document.querySelector(".letters").addEventListener("click", buttonChoose);
    window.addEventListener("keydown", keyHandeler);
        console.log(randomItems);
};
randomItem ();

function keyHandeler (event) {//Function for when the user presses the keyboard
    letterHandeler(event.key);
};

function showPanel () {// Function for show number of letter
    let splited = randomItems.split("");
    let map = splited.map(letter => (clicked.indexOf(letter) >= 0 ? letter :  "_"));
    result = map.join("");
    document.getElementById("clue").innerHTML = `<p>${result}</p>`;
}
showPanel ();

function letterHandeler (letter) {//Function for check that letter exist(Available) in variable or not!
    letter = letter.toLowerCase();
    clicked.indexOf(letter) === -1 ? clicked.push(letter) : null;
    document.getElementById(letter.toUpperCase()).className = "used";
    if (randomItems.indexOf(letter) >= 0) {
        showPanel ();
        checkForWin ();
    } else if (randomItems.indexOf(letter) === -1) {
        mistake++;
        checkForLost ();
        updatePicture ();
    }
}

function buttonChoose (event) {//Function for when clicked on a letter
    letterHandeler(event.target.id);
};

function checkForWin () {
    if (randomItems === result) {
        document.getElementById("game-over").querySelector("span").style.display = "block";
        document.getElementById("image").querySelector("img").src = "pics/winner.png";
    }
};

function checkForLost () {
    if (mistake === 6) {
        document.getElementById("game-over").querySelector("span").style.display = "block";
        document.getElementById("clue").innerHTML = `<p>True answer is: ${randomItems}</p>`;
    }
};

function updatePicture () {
    const pic = document.getElementById("image").querySelector("img");
    pic.src = `pics/hangman${mistake}.png`;
};