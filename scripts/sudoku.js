var numSelected = null;
var tileSelected = null;
var blankAmount = 81;
var hearts = 0;
var errors = 0;

var board = [
    ['-','-','-','-','-','-','-','-','-'],
    ['-','-','-','-','-','-','-','-','-'],
    ['-','-','-','-','-','-','-','-','-'],
    ['-','-','-','-','-','-','-','-','-'],
    ['-','-','-','-','-','-','-','-','-'],
    ['-','-','-','-','-','-','-','-','-'],
    ['-','-','-','-','-','-','-','-','-'],
    ['-','-','-','-','-','-','-','-','-'],
    ['-','-','-','-','-','-','-','-','-']
]

// sets up the amount of numbers present on the board according to difficulty
while (numCounter() < 4) {
    randomizeBoard(board);
}

// creates solution board that will ultimately be used for comparison to starting baord
var solution = board.slice(); 
createSol();

// difficulty is set from cookies
if (getCookie("Easy") == "enabled") {
    blankAmount -= 46;
    hearts = 5;
} else if (getCookie("Medium") == "enabled") {
    blankAmount -= 36;
    hearts = 4;
} else if (getCookie("Hard") == "enabled") {
    blankAmount -= 26;
    hearts = 3;
}

var count = hearts;

//Thank you chatGPT! You helped me figure out to use a different memory location for this array
board = JSON.parse(JSON.stringify(solution));
while (blankCounter() < blankAmount) {
setBoard();
}

// counts the total amount of numbers present on the board for randomizer
function numCounter() {
    let numCount = 0;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] != '-') {
                numCount+=1;
            }
        }
    }
    return numCount;
}

// counts the total amount of blank boxes on the sudoku board
function blankCounter() {
    let blankCount = 0;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] == '-') {
                blankCount+=1;
            }
        }
    }
    return blankCount;
} 

// loads sudoku
window.onload = function() {
    setGame();
}


// using cookies to change board color and difficulty
$(window).on("load", function() {
    if (getCookie("#f5f5f5") == "enabled") {
        $("#board").css("background-color","#f5f5f5");
        $(".tile-start").css("background-color","#f5f5f5");
        $(".number").css("background-color", "#f5f5f5");
    } else if (getCookie("#d3d3d3") == "enabled") {
        $("#board").css("background-color","#d3d3d3");
        $(".tile-start").css("background-color","#d3d3d3");
        $(".number").css("background-color", "#d3d3d3");
    } else if (getCookie("#ffebcd") == "enabled") {
        $("#board").css("background-color","#ffebcd");
        $(".tile-start").css("background-color","#ffebcd");
        $(".number").css("background-color", "#ffebcd");
    } else if (getCookie("#778899") == "enabled") {
        $("#board").css("background-color","#778899");
        $(".tile-start").css("background-color","#778899");
        $(".number").css("background-color", "#778899");
    } else if (getCookie("#c0c0c0") == "enabled") {
        $("#board").css("background-color","#c0c0c0");
        $(".tile-start").css("background-color","#c0c0c0");
        $(".number").css("background-color", "#c0c0c0");
    } else if (getCookie("#f08080") == "enabled") {
        $("#board").css("background-color","#f08080");
        $(".tile-start").css("background-color","#f08080");
        $(".number").css("background-color", "#f08080");
    } else if (getCookie("#fafad2") == "enabled") {
        $("#board").css("background-color","#fafad2");
        $(".tile-start").css("background-color","#fafad2");
        $(".number").css("background-color", "#fafad2");
    } else if (getCookie("#90ee90") == "enabled") {
        $("#board").css("background-color","#90ee90");
        $(".tile-start").css("background-color","#90ee90");
        $(".number").css("background-color", "#90ee90");
    } else if (getCookie("#add8e6") == "enabled") {
        $("#board").css("background-color","#add8e6");
        $(".tile-start").css("background-color","#add8e6");
        $(".number").css("background-color", "#add8e6");
    } else if (getCookie("#deb887") == "enabled") {
        $("#board").css("background-color","#deb887");
        $(".tile-start").css("background-color","#deb887");
        $(".number").css("background-color", "#deb887");
    }
});

// sets up sudoku board and digits
function setGame() { 
    // creates numbers for digits 1-9
    for (let i = 1; i <= 9; i++) {
        // <div id="i" class="number">i<div/>
        let number = document.createElement("div"); // creating div element
        number.id = i; // number id attr
        number.innerText = i; // number innerText attr
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    // creates numbers for board 9x9
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            //<div id="r-c" class="tile"><div/>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] != "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }

    // creates number of lives based on selected difficulty
    for (let j = 1; j <= hearts; j++) {
        //<img id="heart#" src="images/64heart.png" alt="64 heart">
        let heart = document.createElement("img");
        heart.id = "heart" + j.toString();
        heart.src = "images/64heart.png";
        heart.alt = "64 heart";
        document.getElementById("heart").appendChild(heart);
    }
}

// allow users to select a number
function selectNumber() {
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected"); // upon click it adds num-selected class
}

// shows error messages
function showErrorMessage(message) {
        Toastify({
            text: message,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "red",
            className: "error1",
        }).showToast();
}

// allows uers to select a tile and see if it matches with the number selected according to solution board
function selectTile() {
    // an error that notifies the user to select a digit before clicking an empty tile
    if (numSelected == null && this.innerText == "") {
        showErrorMessage("Error: select a number first.");
     }
    if (numSelected) {
        if (this.innerText != "") { //prevents overwritting number
            return;
        }
        // 'r-c'
        let coords = this.id.split("-"); // ['r','c']
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id;
            board[r][c] = numSelected.id.toString(); // updates board with number
            // number becomes hidden when all of its spots are found
            var flatBoard = board.flat(); // flatten array
            // count number of occurances using the reduce method
            var numCount = flatBoard.reduce((acc,curr) => (curr == numSelected.id.toString() ? acc + 1 : acc), 0);
            // if number is found 9 times, its number selector disappears
            if (numCount == 9) {
                document.getElementById(numSelected.id.toString()).remove();
            }
        } else {
            errors+=1;
            document.getElementById("errors").innerText = errors;
            let heartId = "heart" + count.toString();
            let heart = document.getElementById(heartId);
            heart.remove();
            if (errors == hearts) {
                gameOver();
            }
            count-=1;
        }
    }
}

// checks to see if a number exists in a row
function isNumInRow(b, num, row) { // b for board
    for (let i = 0; i < 9; i++) {
        if (b[row][i] == num) {
            return true;
        }
    }
    return false;
}

// checks to see if a number exists in a column
function isNumInCol(b, num, col) { // b for board
    for (let i = 0; i < 9; i++) {
        if (b[i][col] == num) {
            return true;
        }
    }
    return false;
}

// checks to see if a number exists in a 3x3 box
function isNumInBox(b, num, row, col) { // b for board
    let localBoxRow = row - row % 3;
    let localBoxCol = col - col % 3;

    for (let i = localBoxRow; i < localBoxRow + 3; i++) {
        for (let j = localBoxCol; j < localBoxCol + 3; j++) {
            if (b[i][j] == num) {
                return true;
            }
        }
    }
    return false;
}

// checks to see if number has a valid placement
function isValidPlace(b, num, row, col) {
    return !isNumInRow(b, num, row) &&
           !isNumInCol(b, num, col) &&
           !isNumInBox(b, num, row, col);
}

// setting up the board (Board-setting algorithm)
function randomizeBoard(b) {
    // floor these because they default as doubles
    let randomRow = Math.floor(Math.random() * 9);
    let randomCol = Math.floor(Math.random() * 9);
    let randomNum = Math.floor(Math.random() * 9) + 1;

    if (b[randomRow][randomCol] == '-') {
        if (isValidPlace(b, randomNum, randomRow, randomCol)) {
            b[randomRow][randomCol] = randomNum.toString();
        } else {
            b[randomRow][randomCol] = '-';
        }
    }
}

// create solution (Backtracking algorithm)
function createSol() { // sb = sample board
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (solution[i][j] == '-') { // if empty square it will try numbers 1-9
                for (let n = 1; n <= 9; n++) {
                    if (isValidPlace(solution, n, i, j)) {
                        solution[i][j] = n.toString();
                        if (createSol(solution)) {
                            return true;
                        } else {
                            solution[i][j] = '-';
                        }
                    }    
                }
                return false;
            }
        }
    }
    return true;
}

// sets the starting board by clearing out boxes
function setBoard() {
    let randomRow = Math.floor(Math.random() * 9);
    let randomCol = Math.floor(Math.random() * 9);
    board[randomRow][randomCol] = '-';
}

// cookie getter
// if the name is found within all currently set cookies on the site
// then the cookie is retrieved
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

// game over seqeunce
function gameOver() {
    // blanks out solution board
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            board[i][j] = '-';
            solution[i][j] = '-';
        }
    }
    
    // game over screen
    //<div id="game-over-screen"></div>
    var gos = document.createElement("div");
    gos.id = "game-over-screen";
    //<h2 id="game-over-header">Game Over</h2>
    var go = document.createElement("h2");
    go.id = "game-over-header";
    go.innerText = "Game Over!";
    //<a id="try-again" href='sudoku-menu.html'><h2>Try again?</h2></a>
    var ta = document.createElement("a");
    var taHeader = document.createElement("h2");
    ta.id = "try-again";
    ta.href = "index.html";
    taHeader.innerText = "Try again?";
    
    document.getElementById("game-over").appendChild(gos);
    document.getElementById("game-over").appendChild(go);
    document.getElementById("game-over").appendChild(ta);
    document.getElementById("try-again").appendChild(taHeader);
}

// game timer - set interval to update timer every second - days/hours/minutes/seconds
let seconds = 0;
var interval = setInterval(function() {
    seconds++;
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);
    var remainingSeconds = seconds % 60;
    if (seconds < 60) {
        document.getElementById("timer").innerHTML =
        `${seconds}s`;
    } 
    else if (seconds < 3600) {
        document.getElementById("timer").innerHTML = 
        `${minutes.toString()}m ${remainingSeconds.toString().padStart(2,'0')}s`;
    } 
    else if (seconds < 86400) {
        document.getElementById("timer").innerHTML =
        `${hours}hr ${minutes}m`;
    } 
    else {
        document.getElementById("timer").innerHTML =
        `${days}dy`;
    }
    // stops timer when lives run out
    if (errors == hearts) {
        clearInterval(interval);
    }
}, 1000);

// initial check to see if all of a digits places are found
for (var d = 1; d <= 9; d++) {
    // number becomes hidden when all of its spots are found
    var flatBoard = board.flat(); // flatten array
    // count number of occurances using the reduce method
    var numCount = flatBoard.reduce((acc,curr) => (curr == d.toString() ? acc + 1 : acc), 0);
    // if number is found 9 times, its number selector disappears
    if (numCount == 9) {
        document.getElementById(d.toString()).remove();
    }
}
