// elements that should be displayed and hidden for home screen
function home() {
    hideElements();
    document.getElementById('mainDisplayTable').style.display = "table";
    document.getElementById('gameArea').style.display = "block";

    // Show main table when details page is closed
    document.getElementById('mainDisplayTable').style.visibility = "visible";
    displayRandomGame();
    addLikedGamesToGameDiv();
    updateBackButton();
}

function discoveryButton(){
    home();
    localStorage.setItem('history', null);
    addHistory("home", "");
    updateBackButton();
}

// update back button
function updateBackButton(){
    var len = getHistory().length;

    var backButton = document.getElementById("backButton");
    if(len <= 1){
        backButton.style = "opacity: 0.4";
    }
    else{
        backButton.style = "opacity: 1";
    }
}

// display liked games in gameDiv
function updateHeart() {
    var heartImg = document.getElementById('heartPathTopbar');
    if (getLikedGames().length > 0) {
        // heartImg.src = "https://cdn-icons-png.flaticon.com/128/833/833472.png";
        heartImg.style = "fill: red;";
    }
    else {
        // heartImg.src = "https://img.icons8.com/neon/512/experimental-hearts-neon.png";
        heartImg.style = "fill: #282828; stroke: red; stroke-width: 15px";
    }
}


function sortResults(games, element) {
    var sort = document.getElementById(element);

    if (sort.options[sort.selectedIndex].value === "sortLowestPrice") {
        games.sort(function (a, b) {
            return a.price - b.price;
        });
    } else if (sort.options[sort.selectedIndex].value === "sortHighestPrice") {
        games.sort(function (a, b) {
            return b.price - a.price;
        });
    } else {
        games.sort(function (a, b) {
            if(a.name.toLowerCase() < b.name.toLowerCase()){
                return -1;
            }
            if(a.name.toLowerCase() > b.name.toLowerCase()){
                return 1;
            }
            return 0;
        });
    }
    return games;
}